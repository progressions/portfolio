---
title: "Chi War Development Update: January 2026"
date: "2026-01-11T14:00:00"
excerpt: "A summary of 55+ pull requests merged in January 2026, covering notifications, CLI combat management, Notion integration, and real-time updates."
tags: ["chi-war", "elixir", "phoenix", "react", "typescript"]
---

# Chi War Development Update: January 2026

*A summary of 55+ pull requests merged across the Chi War project in the first weeks of January 2026.*

---

## Overview

Chi War is a web application and CLI for managing Feng Shui 2 tabletop RPG campaigns. The system consists of three components: a Phoenix/Elixir backend (shot-elixir), a Next.js frontend (shot-client-next), and a TypeScript command-line interface (chi-war-cli).

This post covers the major features implemented between January 7-11, 2026. The project remains in alpha, with no active player base yet.

---

## Notifications System

I added a complete notifications system for user-facing alerts. The implementation spans both backend and frontend.

### Backend Implementation

The notification schema stores the essential fields:

```elixir
schema "notifications" do
  field :type, :string
  field :title, :string
  field :message, :string
  field :payload, :map, default: %{}
  field :read_at, :utc_datetime
  field :dismissed_at, :utc_datetime

  belongs_to :user, ShotElixir.Accounts.User
  timestamps(type: :utc_datetime)
end
```

The `payload` field holds structured metadata—campaign context, originating user, and any other relevant data. Two nullable timestamps (`read_at` and `dismissed_at`) track notification state without requiring separate status columns.

The REST API exposes standard CRUD endpoints plus two special operations:

- `GET /api/v2/notifications/unread_count` — Returns a count for badge display
- `POST /api/v2/notifications/dismiss_all` — Bulk dismissal

A security constraint: the update endpoint only allows modifying `read_at` and `dismissed_at`. Users cannot alter notification content after creation.

### Real-Time Delivery

When a notification is created, Phoenix PubSub broadcasts to the user's channel:

```elixir
Phoenix.PubSub.broadcast!(
  ShotElixir.PubSub,
  "user:#{target_user.id}",
  {:notification_created, notification}
)
```

The frontend subscribes to this channel via WebSocket. Notifications appear instantly without polling.

### Frontend Component

The `NotificationBell` component displays a badge with unread count. Clicking opens a dropdown showing recent notifications with time-ago formatting ("5m ago", "2h ago").

The component subscribes to real-time updates:

```typescript
useEffect(() => {
  const unsubscribe = subscribeToNotifications(notification => {
    setUnreadCount(prev => prev + 1)
    if (isMenuOpenRef.current) {
      setNotifications(prev => [notification, ...prev])
    }
  })
  return unsubscribe
}, [subscribeToNotifications])
```

A 60-second polling fallback ensures reliability if the WebSocket connection drops.

### Initial Use Case

The first automated notification: AI credit exhaustion. When a user's configured AI provider runs out of credits, the system creates a persistent, dismissable notification instead of showing an ephemeral banner that disappears on page navigation.

---

## CLI Encounter Management

The command-line interface now supports full combat management. Running an entire Feng Shui 2 fight from the terminal is possible.

### Available Commands

```bash
# Set the active encounter
chiwar encounter set <fight-id>

# Combat actions
chiwar encounter attack jack -t "Thunder Cop"
chiwar encounter wound "Big Boss" 8
chiwar encounter heal jack 5
chiwar encounter mooks "Mook Squad" -3
chiwar encounter spend jack 3

# Dice rolling
chiwar encounter roll "Martial Arts check"
chiwar encounter initiative

# Session management
chiwar encounter start
chiwar encounter end
```

### Fuzzy Name Matching

Typing full character names repeatedly is tedious. The CLI implements a four-tier fuzzy matching system:

```typescript
function findCombatant(query: string, combatants: Combatant[]): Combatant | Combatant[] | null {
  const q = query.toLowerCase().trim();

  // 1. Exact match
  const exact = combatants.find(c => c.name.toLowerCase() === q);
  if (exact) return exact;

  // 2. Starts-with match
  const startsWith = combatants.filter(c => c.name.toLowerCase().startsWith(q));
  if (startsWith.length === 1) return startsWith[0];
  if (startsWith.length > 1) return startsWith;

  // 3. Contains match
  const contains = combatants.filter(c => c.name.toLowerCase().includes(q));
  if (contains.length === 1) return contains[0];
  if (contains.length > 1) return contains;

  // 4. Word-starts-with match
  const wordMatch = combatants.filter(c =>
    c.name.toLowerCase().split(/\s+/).some(word => word.startsWith(q))
  );
  if (wordMatch.length === 1) return wordMatch[0];
  if (wordMatch.length > 1) return wordMatch;

  return null;
}
```

Typing `jack` matches "Jack Burton". Typing `egg` matches "Egg Shen" via word-starts-with. If multiple characters match, the CLI lists all options and asks for clarification.

### Combat Calculations

Attack resolution follows Feng Shui 2 rules:

```typescript
export function calculateAttack(
  attacker: Combatant,
  target: Combatant,
  swerve: SwerveResult
): AttackResult {
  const effectiveAttack = attackValue - (attacker.impairments || 0);
  const attackRoll = swerve.total + effectiveAttack;
  const hit = attackRoll >= defense;
  const outcome = hit ? attackRoll - defense : 0;
  const smackdown = hit ? outcome + damage : 0;

  if (targetIsMook) {
    mooksDropped = Math.min(smackdown, maxMooks);
  } else {
    woundsDealt = Math.max(0, smackdown - toughness);
  }
}
```

Dice rolling happens server-side. The API handles exploding dice (6s reroll and add) and returns the swerve result. This keeps the random number generation consistent and auditable.

---

## Notion Integration

Two-way synchronization between Chi War and Notion is now functional.

### Import from Notion

Characters can be created directly from Notion pages:

```bash
chiwar notion search "Thunder King"
# Returns matching Notion pages

chiwar character create --from-notion <page-id>
# Extracts action values, description, and metadata
```

The system parses Notion properties and maps them to Chi War character fields. Missing fields get sensible defaults rather than null values—a bug fix that prevented frontend crashes.

### Sync Operations

Existing characters linked to Notion pages support bidirectional sync:

- **Push to Notion**: Updates the linked Notion page with current Chi War data
- **Pull from Notion**: Imports changes made in Notion back to Chi War

Each sync operation is logged with timestamps. A "Prune Old Logs" function removes entries older than 30 days.

### Auto-Unlink Deleted Pages

A subtle but important fix: when a linked Notion page is deleted or archived, Chi War now automatically unlinks it. Previously, the system would repeatedly fail to sync, generating errors indefinitely. Now it detects Notion's "archived" response and clears the `notion_page_id` from the character.

---

## Developer Experience: Workspace Optimization

Creating development workspaces got faster.

### The Problem

Setting up a new git worktree for feature development took 3-4 minutes. Most of that time was Elixir compilation—building the Phoenix application from scratch.

### The Solution

The `create-workspace.sh` script now copies the pre-built `_build` directory:

```bash
echo ">>> Copying pre-built Elixir artifacts..."
if [ -d "$MAIN_DIR/shot-elixir/_build" ]; then
    cp -R "$MAIN_DIR/shot-elixir/_build" shot-elixir/_build
    echo "    Copied _build from main repo (skips compilation)"
else
    echo "    No _build found in main repo, will compile from scratch"
fi
```

A 4.2-second copy operation replaces 118 seconds of compilation.

### Results

- **Before**: 190-203 seconds to authenticated development environment
- **After**: 75-110 seconds
- **Improvement**: 40-60% faster

Multiple workspaces can run simultaneously on different port offsets. Port 4012/3011 for one feature, 4022/3021 for another. Each workspace is isolated with its own branches in all three repositories.

---

## Role-Based Interface

The frontend now presents different views based on user role.

### Player vs Gamemaster

Players see a simplified dashboard focused on their characters. Gamemasters see the full interface: fights, parties, sites, NPCs, and campaign management tools.

The navigation menu is split into separate GM and Player components. This reduces visual noise for players who don't need campaign administration options.

### Dashboard WebSocket Refresh

Dashboard modules now subscribe to WebSocket channels. When character data changes—through the CLI, another browser tab, or another user—the dashboard updates automatically. No more stale data requiring manual page reloads.

---

## Real-Time Updates Throughout

WebSocket subscriptions were added to several areas:

- **Media Library**: Image uploads, deletions, and attachments trigger live updates
- **Dashboard**: Character changes reflect immediately
- **Notifications**: Instant delivery without polling

The pattern is consistent across all real-time features: Phoenix PubSub broadcasts events, frontend components subscribe via channels, and UI updates without user intervention.

---

## Profile Page Reorganization

The profile page was overloaded. It now splits into three focused pages:

- **Profile** (`/profile`): Identity, hero image, campaign memberships
- **Settings** (`/settings`): Password, passkeys, CLI sessions
- **Integrations** (`/integrations`): AI providers, Discord linking

Each page serves a distinct purpose. Finding specific settings is easier.

---

## Other Notable Changes

- **CLI browser authentication**: Device authorization flow instead of copy-pasting tokens
- **CLI session tracking**: See which CLI clients are connected to your account
- **Branded email templates**: Dark header/footer, amber accents, matching the app aesthetic
- **Campaign-aware AI images**: Different campaigns can have different AI settings
- **Provider-agnostic AI credits**: Credit exhaustion warnings work with any configured AI provider
- **JSON endpoints**: All entity types support `.json` URL suffix for debugging
- **Number field debounce**: 600ms delay prevents lost keystrokes in rapid input

---

## Summary

The focus areas for this development sprint:

1. **Notifications**: Persistent, dismissable user alerts with real-time delivery
2. **CLI combat**: Full encounter management from the terminal
3. **Notion sync**: Bidirectional character synchronization
4. **Developer tooling**: Faster workspace creation
5. **Role-based UI**: Tailored interfaces for players and gamemasters
6. **Real-time updates**: WebSocket subscriptions throughout the application

The project continues to be in alpha. These features prepare the foundation for eventual player testing.
