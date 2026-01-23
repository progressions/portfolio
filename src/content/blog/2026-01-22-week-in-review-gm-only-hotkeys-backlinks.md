---
title: "Chi War Week in Review: GM-Only Content, Vim-Style Hotkeys, and Backlinks"
date: "2026-01-22T12:00:00"
excerpt: "This week's Chi War features include role-based GM-only content visibility from Notion, vim-inspired two-key keyboard navigation, and a backlinks system for discovering entity relationships."
tags: ["chi-war", "elixir", "phoenix", "react", "typescript"]
---

# Chi War Week in Review: GM-Only Content, Vim-Style Hotkeys, and Backlinks

*January 22, 2026*

This week brought a significant batch of features to Chi War, the Feng Shui 2 campaign management app I've been building. The highlights include role-based content visibility for gamemasters, a vim-inspired keyboard navigation system, and a backlinks feature for discovering entity relationships. Here's the technical breakdown.

## GM-Only Content: Role-Based Visibility from Notion

The most substantial feature this week was adding GM-only content support across all Notion-synced entity types. The idea is simple: content that appears after a "# GM Only" heading in Notion is stored separately and only shown to gamemasters.

### The Problem

When documenting NPCs, locations, and factions in Notion, I often want to include information that players shouldn't see—secret motivations, hidden connections, twist reveals. Previously, I had to maintain separate documents or rely on memory during sessions.

### How It Works

The implementation splits Notion content at the heading level during sync:

```elixir
def split_at_gm_only_heading(blocks) do
  gm_only_index =
    Enum.find_index(blocks, fn block ->
      block["type"] == "heading_1" &&
        is_gm_only_heading?(block)
    end)

  case gm_only_index do
    nil ->
      {blocks, []}
    idx ->
      public_blocks = Enum.take(blocks, idx)
      gm_only_blocks = Enum.drop(blocks, idx + 1)
      {public_blocks, gm_only_blocks}
  end
end

defp is_gm_only_heading?(block) do
  heading_text = extract_heading_text(block)
  normalized = heading_text |> String.downcase() |> String.trim()
  normalized == "gm only"
end
```

The split content is stored in a `rich_description_gm_only` field. The API conditionally includes this field based on an `is_gm` parameter:

```elixir
defp render_character_full(character, is_gm \\ false) do
  base = %{
    id: character.id,
    name: character.name,
    rich_description: character.rich_description,
    # ... other fields ...
  }

  if is_gm do
    Map.put(base, :rich_description_gm_only, character.rich_description_gm_only)
  else
    base
  end
end
```

This pattern applies to characters, sites, parties, factions, junctures, and adventures—every entity type that syncs with Notion.

### Challenges

The main challenge was threading the `is_gm` flag through the entire request lifecycle. Controllers compute the flag based on the current user's role:

```elixir
is_gm = current_user.admin ||
        CampaignMembers.is_gamemaster?(current_user.id, campaign_id)
```

This flag then passes to views, and for WebSocket broadcasts, we include GM-only content when the recipient is a gamemaster. The WebSocket broadcast change required updating all nine entity controllers to pass `is_gm: true` when serializing for broadcasts to GM sessions.

## Vim-Style Keyboard Navigation

I spend a lot of time in vim, and I wanted Chi War to feel efficient without reaching for the mouse. The new hotkey system uses vim-inspired two-key command sequences.

### The Navigation Pattern

- Press `G` followed by a letter to navigate: `G+C` goes to Characters, `G+F` to Fights, `G+V` to Vehicles
- Press `N` followed by a letter to create new entities: `N+C` opens a new character form, `N+F` starts a new fight
- Press `K` to open unified search
- Press `?` to see all available shortcuts

### Implementation

The HotkeysContext manages registration and command mode state:

```typescript
// If in command mode, handle the second key
if (currentCommandMode) {
  const commandKey = `${currentCommandMode}+${key}`
  const registration = hotkeysRef.current.get(commandKey)

  if (registration) {
    event.preventDefault()
    exitCommandMode()
    registration.handler()
    return
  }

  exitCommandMode()
  return
}

// Check for command mode entry (g or n)
if (key === "g" || key === "n") {
  const hasCommandHotkeys = Array.from(hotkeysRef.current.keys()).some(
    k => k.startsWith(`${key}+`)
  )
  if (hasCommandHotkeys) {
    event.preventDefault()
    enterCommandMode(key as "g" | "n")
    return
  }
}
```

A visual indicator appears in the bottom-right corner showing the current command mode ("G - Go to..." or "N - New...") with a 1.5-second timeout if no second key is pressed.

### Challenges

The trickiest bug was with URL-based form drawers. Pressing `N+V` to create a new vehicle would navigate to `/vehicles/new`, but the List component's `useEffect` immediately pushed URL params on mount, overriding the `/new` path and closing the drawer before it opened.

The fix used an `isInitialRender` ref pattern:

```typescript
const isInitialRender = useRef(true)

useEffect(() => {
  if (isInitialRender.current) {
    isInitialRender.current = false
    return
  }
  // Only push URL params after initial render
  router.push(`/vehicles?${params.toString()}`)
}, [filters])
```

This pattern was applied to seven different List components across the app.

## Backlinks: Discovering Entity Relationships

Chi War uses @mentions throughout—character descriptions can reference other characters, sites can mention factions, adventures can link to parties. But the relationships were one-directional. If a character's description mentions a site, you could see that from the character page, but not from the site page.

The backlinks feature inverts this: now every entity shows what other entities mention it.

### The Query

Mentions are stored in a JSONB column with structure like `{"character": ["uuid1", "uuid2"], "site": ["uuid3"]}`. PostgreSQL's JSONB containment operators make querying efficient:

```elixir
defp backlinks_query(schema, entity_type, campaign_id, target_type, target_id) do
  from e in schema,
    where: e.campaign_id == ^campaign_id,
    where:
      fragment(
        "? \\? ?",
        fragment("COALESCE(? -> ?, '[]'::jsonb)", e.mentions, ^target_type),
        ^target_id
      ),
    select: %{
      id: e.id,
      name: e.name,
      entity_type: ^entity_type,
      updated_at: e.updated_at
    }
end
```

The `?` operator checks if a JSONB array contains a value. With a GIN index on the mentions column, this query is fast:

```elixir
@tables ~w(characters sites parties factions junctures adventures)a

Enum.each(@tables, fn table ->
  create_if_not_exists(index(table, [:mentions], using: :gin))
end)
```

The final query unions across all six entity types:

```elixir
query =
  Character
  |> backlinks_query("Character", campaign_id, target_type, target_id)
  |> union_all(^backlinks_query(Site, "Site", campaign_id, target_type, target_id))
  |> union_all(^backlinks_query(Party, "Party", campaign_id, target_type, target_id))
  |> union_all(^backlinks_query(Faction, "Faction", campaign_id, target_type, target_id))
  |> union_all(^backlinks_query(Juncture, "Juncture", campaign_id, target_type, target_id))
  |> union_all(^backlinks_query(Adventure, "Adventure", campaign_id, target_type, target_id))
```

### Frontend Integration

Entity pages now show a "Backlinks" link under the hero image. Clicking it opens a modal listing all entities that mention this one, grouped by type with clickable navigation to each.

## Other Notable Changes

### Real-Time Dashboard Updates

Previously, creating or modifying entities required a full page refresh to see changes on the dashboard. Now, all entity controllers broadcast WebSocket events on CRUD operations:

```elixir
def update(conn, %{"id" => id, "character" => params}) do
  with {:ok, character} <- Characters.update_character(character, params) do
    broadcast_entity_reload(conn, character, "characters")
    render(conn, :show, character: character)
  end
end
```

Dashboard modules subscribe to these events and re-fetch their data without reloading the page.

### Test Suite Performance

Both the Phoenix and Next.js test suites got performance optimizations. The backend went from 5:43 to 2:52 (50% improvement) by configuring fast-fail HTTP timeouts for Notion API calls in tests. The frontend tests got similar treatment with fake timers and reduced `userEvent.type()` calls.

### Notion Sync Reliability

Fixed a batch of Notion sync issues across entity types—property name mismatches, mixed atom/string keys, Unicode handling in @mentions. The sync is now more reliable across all six entity types.

## What's Next

The GM-only content feature opens possibilities for more sophisticated access control. I'm considering per-entity visibility settings beyond the simple GM/player split.

The hotkey system is functional but could use refinement—things like customizable bindings and more discoverable affordances.

The backlinks feature works well for discovering relationships, but it's currently read-only. Future iterations might allow creating links directly from the backlinks panel.

Chi War remains in alpha, with no active player base beyond my own testing campaigns. These features are developed as much for the learning experience as for practical use.
