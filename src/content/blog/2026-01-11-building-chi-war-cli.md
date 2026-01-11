---
title: "Building the Chi War CLI: A Command-Line Interface for AI-Assisted Tabletop Gaming"
date: "2026-01-11T12:00:00"
excerpt: "A deep dive into building a TypeScript command-line interface for Feng Shui 2 campaign management, designed to enable AI-driven tabletop gaming sessions."
tags: ["chi-war", "typescript", "cli", "ai"]
---

# Building the Chi War CLI: A Command-Line Interface for AI-Assisted Tabletop Gaming

The Chi War CLI is a TypeScript command-line tool I built to interact with my Feng Shui 2 campaign management application. While the web interface works fine for most tasks, I had a specific goal in mind: creating an interface that Claude Code could use to run tabletop RPG sessions programmatically.

## The Vision: AI as Gamemaster and Player

My objective is to run an experiment where Claude acts as both gamemaster and player. The AI would create a campaign, design an adventure, generate a party of characters, and then run those characters through a combat encounter—making decisions for both sides of the table.

The web app isn't ideal for this workflow. Claude needs a text-based interface where it can issue commands, read structured output, and make decisions based on the results. A CLI fits this requirement exactly.

## Technical Stack

The CLI is built with:

- **TypeScript** with ES modules
- **Commander.js** for command parsing
- **Axios** for HTTP requests
- **Inquirer** for interactive prompts
- **tsx** for development execution

Configuration is stored in `~/.chiwar/config.json`, tracking the API URL, authentication token, and current campaign/encounter context.

## Authentication: Browser-Based CLI Login

One of the more interesting implementation challenges was authentication. Rather than asking users to paste JWT tokens, I built a browser-based OAuth flow:

```typescript
export async function loginCommand(): Promise<void> {
  const { code, url } = await startCliAuth();

  info(`Authorization code: ${code}`);
  await open(url);  // Opens browser

  // Poll for approval
  while (attempts < MAX_POLL_ATTEMPTS) {
    const result = await pollCliAuth(code);

    if (result.status === "approved" && result.token) {
      setToken(result.token);
      success(`Logged in as ${result.user.email}`);
      return;
    }

    process.stdout.write(`\rWaiting for approval${dots}   `);
    await sleep(POLL_INTERVAL_MS);
  }
}
```

The CLI requests an authorization code from the API, opens the browser to an approval page, then polls every 2 seconds until the user clicks "Approve" in the browser. The JWT token is then stored locally.

## Command Structure

The CLI organizes commands by resource type:

```
chiwar login                    # Authenticate via browser
chiwar campaign list            # List campaigns
chiwar character list           # List characters in current campaign
chiwar fight create --name "X"  # Create a fight
chiwar encounter status         # Show combat status
chiwar ai create "description"  # Generate character with AI
```

Each command module follows a consistent pattern using Commander.js:

```typescript
export function registerFightCommands(program: Command): void {
  const fight = program
    .command("fight")
    .description("Manage combat encounters");

  fight
    .command("list")
    .option("--active", "Only show active fights")
    .option("--json", "Output as JSON")
    .action(async (options) => {
      try {
        const result = await listFights(options);
        // Display logic
      } catch (err) {
        error(err instanceof Error ? err.message : "Failed");
        process.exit(1);
      }
    });
}
```

## Combat Management

The encounter commands are where the CLI shines for automated gameplay. The `encounter` command provides everything needed to run combat:

```bash
# Set the active encounter
chiwar encounter set <fight-id>

# Show current combat status
chiwar encounter status

# Roll initiative for all combatants
chiwar encounter initiative

# Execute an attack
chiwar encounter attack "Johnny" --target "Thug Boss"

# Spend shots (advance in initiative)
chiwar encounter spend "Johnny" 3

# Drop mooks
chiwar encounter drop "Thugs" 4
```

The attack command handles the complete combat resolution:

1. Fuzzy-matches attacker and target names
2. Rolls or accepts a provided swerve value
3. Calculates attack total vs. defense
4. Computes smackdown and wounds
5. Applies damage to the target
6. Records the event for the combat log

```typescript
const result = calculateAttack(attackerMatch, targetMatch, swerve, targetCount);

if (result.hit) {
  if (result.targetIsMook && result.mooksDropped) {
    const newCount = Math.max(0, (targetMatch.count || 0) - result.mooksDropped);
    updates.push({
      shot_id: targetMatch.shotId,
      character_id: targetMatch.id,
      count: newCount,
      event: { event_type: "attack", description: eventDescription }
    });
  }
}

await applyCombatAction(encounterId, updates);
```

## Fuzzy Name Matching

Since Claude (or any user) might not type character names exactly, I implemented fuzzy matching:

```typescript
function findCombatant(query: string, combatants: Combatant[]): Combatant | Combatant[] | null {
  const q = query.toLowerCase().trim();

  // 1. Exact match
  const exact = combatants.find((c) => c.name.toLowerCase() === q);
  if (exact) return exact;

  // 2. Starts-with match
  const startsWith = combatants.filter((c) => c.name.toLowerCase().startsWith(q));
  if (startsWith.length === 1) return startsWith[0];
  if (startsWith.length > 1) return startsWith;  // Return candidates

  // 3. Contains match
  const contains = combatants.filter((c) => c.name.toLowerCase().includes(q));
  if (contains.length === 1) return contains[0];
  if (contains.length > 1) return contains;

  // 4. Word-starts-with match
  const wordMatch = combatants.filter((c) =>
    c.name.toLowerCase().split(/\s+/).some((word) => word.startsWith(q))
  );

  return wordMatch.length === 1 ? wordMatch[0] : wordMatch.length > 1 ? wordMatch : null;
}
```

When there are multiple matches, the CLI returns all candidates so the user can be more specific.

## AI Integration

The CLI integrates with the AI features of Chi War:

```bash
# Generate a character from description
chiwar ai create "A grizzled Hong Kong detective with martial arts training"

# Generate images for an entity
chiwar ai image character <character-id>

# Extend a character with AI-generated content
chiwar ai extend <character-id>
```

For image generation, the CLI polls the media library until the images appear:

```typescript
async function pollForNewImages(
  initialImageIds: Set<string>,
  expectedCount: number
): Promise<MediaLibraryImage[] | null> {
  const startTime = Date.now();

  while (Date.now() - startTime < POLL_TIMEOUT_MS) {
    await sleep(POLL_INTERVAL_MS);

    const currentImages = await getOrphanAiImages();
    const newImages = currentImages.filter((img) => !initialImageIds.has(img.id));

    if (newImages.length >= expectedCount) {
      return newImages;
    }
  }
  return null;
}
```

Once the images are generated, the first one is automatically attached to the entity.

## Notification System

I recently added the ability for gamemasters to send notifications to players:

```bash
chiwar notification send player@example.com --title "Session Tonight" --message "Game starts at 7pm!"
```

This integrates with the app's real-time WebSocket notification system, so players see the notification badge update instantly.

## The Upcoming Experiment

With the CLI in place, I can now run my planned experiment. The workflow will look something like:

```bash
# Claude creates a campaign
chiwar campaign create --name "The Jade Dragon Conspiracy"

# Claude creates characters
chiwar ai create "A maverick cop who plays by his own rules"
chiwar ai create "A reformed triad member seeking redemption"

# Claude creates enemies
chiwar character create --file villain.json
chiwar character create --file mooks.json

# Claude sets up the fight
chiwar fight create --name "Warehouse Showdown"
chiwar fight add-party <fight-id> <heroes-party-id>
chiwar fight add-character <fight-id> <villain-id>

# Claude runs the encounter
chiwar encounter set <fight-id>
chiwar encounter start
chiwar encounter initiative

# Combat loop
chiwar encounter attack "Johnny Fang" --target "Boss Chen"
chiwar encounter spend "Johnny Fang" 3
# ... etc
```

Claude would read the encounter status after each action, decide what the next character should do based on the tactical situation, and issue the appropriate commands.

## Challenges and Lessons

**State Management**: The CLI maintains minimal state—just config and current context IDs. All actual game state lives in the API. This keeps the CLI simple and stateless.

**Error Handling**: Every API call needs graceful error handling with user-friendly messages. I standardized on a pattern of catching errors and using `error()` helper before `process.exit(1)`.

**Output Formatting**: CLI output needs to be readable by both humans and AI. I added `--json` flags to most commands so Claude can parse structured data when needed.

**Polling vs. WebSockets**: For AI operations that take time, polling the API was simpler than setting up WebSocket connections in the CLI. The 3-second poll interval works well enough for background jobs.

## Current Status

The CLI is functional and I use it regularly for testing and development. The code lives in the chi-war repository and can be installed globally with `npm link`.

The AI-as-gamemaster experiment is next. I expect it will reveal edge cases and missing features that I'll need to address. But that's the point—building tools that work for both human and AI users forces a level of API design discipline that benefits everyone.

---

*Chi War is a campaign management application for Feng Shui 2, currently in alpha. The CLI is one component of a larger system that includes a Phoenix/Elixir backend and Next.js frontend.*
