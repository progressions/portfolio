---
title: "Building a CLI for Fizzy and Integrating It with Claude Code"
date: "2026-01-11T16:00:00"
excerpt: "How a clean API, a thin CLI wrapper, and Claude skills created a seamless development workflow where project management happens as a side effect of coding."
tags: ["cli", "javascript", "ai", "productivity"]
---

# Building a CLI for Fizzy and Integrating It with Claude Code

*How a clean API, a CLI wrapper, and Claude skills created a seamless development workflow.*

---

## Background

[Fizzy](https://fizzy.pm) is a kanban board tool from Basecamp. When it launched, DHH [added a basic API](https://github.com/basecamp/fizzy/pull/1766) and Jason Fried [announced on X](https://x.com/jasonfried/status/1998812494455062936) that it opened up integration opportunities. The team exposed a straightforward REST API with [clear documentation](https://github.com/basecamp/fizzy/blob/main/docs/API.md). The endpoints followed predictable patterns: `/boards`, `/cards`, `/comments`. Authentication was a bearer token. No OAuth dance, no complex scopes—just request an API key from your profile and start making requests.

This simplicity made it an ideal candidate for a CLI wrapper.

---

## Building the CLI

I had Claude build the initial CLI in a single session in December 2025. The structure is minimal:

```
fizzy-cli/
├── bin/
│   └── fizzy.js          # Entry point
├── src/
│   ├── commands/
│   │   ├── boards.js     # Board operations
│   │   ├── cards.js      # Card operations
│   │   ├── config.js     # Configuration
│   │   └── identity.js   # User identity
│   └── lib/
│       ├── api.js        # API client
│       ├── config.js     # Config storage
│       └── output.js     # Formatting
└── package.json
```

The API client wraps fetch with authentication headers:

```javascript
async request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  // ... error handling and parsing
}
```

Commands map directly to API endpoints. `fizzy cards list` calls `/cards`. `fizzy boards show 123` calls `/boards/123`. The CLI adds convenience features like search, column moves, and tag toggling, but the core is a thin wrapper over HTTP.

---

## The Integration Point: Claude Skills

Claude Code supports user-defined skills—markdown files that describe when and how to use specific tools. I created three skills that integrate Fizzy into my development workflow.

### The `/fizzy` Skill

The base skill teaches Claude how to interact with the Fizzy CLI:

```markdown
---
name: fizzy
description: Create, update, and manage Fizzy kanban cards using the fizzy-cli tool
---

## When to Use

Trigger this skill when the user says things like:
- "make a new card for..."
- "create a fizzy card..."
- "list my fizzy cards"
- "find the card about..."
```

The skill documents the available commands:

```bash
fizzy cards search "query"     # Find cards
fizzy cards create <board-id> "title" --description "content"
fizzy cards move <number> "In Progress"
fizzy cards close <number>
fizzy cards comment <number> "Comment text"
```

Now when I tell Claude "make a card for adding notifications," it knows to search for existing cards, create one if needed, and report the card number.

### The `/build-feature` Skill

This skill chains Fizzy operations with git worktree creation. When I say "let's build the notifications feature," Claude:

1. Searches Fizzy for a matching card
2. Moves the card to "In Progress"
3. Creates a git worktree with isolated dependencies
4. Leaves a comment on the card noting the worktree location

```bash
# The skill documents this workflow:
fizzy cards search "notifications"
# Found card #42: "Add notification system"

fizzy cards move 42 "In Progress"

./scripts/create-workspace.sh notifications

fizzy cards comment 42 "Started work in worktree: ~/tech/chi-war-workspaces/chi-war-notifications
Branch: feature/notifications"
```

The comment creates a link between the card and the code. Anyone checking the card knows exactly where the work is happening.

### The `/complete-card` Skill

This skill handles the end of the feature lifecycle:

1. Merges the pull request(s)
2. Deploys to production
3. Adds a comment with PR links
4. Closes the Fizzy card
5. Removes the worktree

```bash
gh pr merge 118 --squash --delete-branch --repo progressions/shot-server-elixir

fly deploy

fizzy cards comment 42 "Merged PRs:
- shot-elixir: https://github.com/progressions/shot-server-elixir/pull/118"

fizzy cards comment 42 "Deployed to production on 2026-01-11 14:30"

fizzy cards close 42

./scripts/remove-workspace.sh notifications
```

The card becomes a complete record: original request, where it was worked on, which PRs implemented it, when it deployed.

---

## Why This Works

### Reduced Context Switching

I don't open Fizzy in a browser. I don't navigate to GitHub to check PR status. I tell Claude what I'm doing and it updates all the systems. The card moves from "To Do" to "In Progress" to "Done" as a side effect of development commands.

### Automatic Documentation

Every card accumulates context:
- Worktree location comments
- PR links
- Deployment timestamps

When I revisit a completed card months later, the history is there.

### Consistent Process

The skills encode my workflow. Every feature follows the same pattern: card → worktree → development → PR → deploy → close. I don't need to remember the steps or the commands. I say "let's build X" and "complete the card" and the process executes.

---

## The Technical Details

### Configuration

The CLI stores its config in `~/.config/fizzy-cli/config.json`:

```json
{
  "token": "your-api-token",
  "accountSlug": "your-account-slug"
}
```

Environment variables override config file values, so CI systems can use `FIZZY_API_TOKEN` without writing config files.

### The API Surface

Fizzy's API follows REST conventions:

- **Boards**: `GET/POST/PUT/DELETE /{account}/boards`
- **Cards**: `GET/POST/PUT/DELETE /{account}/cards`
- **Comments**: `GET/POST/DELETE /{account}/cards/{id}/comments`
- **Tags**: `POST /{account}/cards/{id}/taggings` (toggles)
- **Columns**: `POST /{account}/cards/{id}/triage`
- **Status**: `POST/DELETE /{account}/cards/{id}/closure`

The CLI maps these to subcommands. `fizzy cards close 42` posts to `/cards/42/closure`. `fizzy cards move 42 "Done"` posts to `/cards/42/triage` with the column ID.

### Skill Invocation

Claude Code skills are markdown files in `~/.claude/skills/`. The frontmatter specifies the name and description:

```markdown
---
name: build-feature
description: Start building a feature by finding its Fizzy card, creating a git worktree, and setting up the development environment.
---
```

When I type `/build-feature` or say "let's build the notifications feature," Claude loads the skill and follows its instructions.

---

## Observations

### API Design Matters

Fizzy's API is simple enough that wrapping it took hours, not days. No pagination tokens to manage. No rate limiting to work around. No webhook subscriptions to configure. Request, response, done.

### Skills Are Composable

The Fizzy skill is a building block. `/build-feature` and `/complete-card` use it as part of larger workflows. Each skill can be invoked independently or as part of a chain.

### The CLI Is the Interface

I could have written the skills to call the API directly using curl. But the CLI adds search, formatting, and convenience commands that make the skills more readable. `fizzy cards search "notifications"` is clearer than a curl command with jq piped through grep.

---

## Conclusion

The combination of a clean API, a thin CLI wrapper, and Claude skills created a workflow where project management happens as a side effect of development. Cards track themselves. Worktrees document themselves. The process is encoded in markdown files that Claude executes.

The implementation required:
- A CLI built in one session (~200 lines of JavaScript)
- Three skill files (~500 lines of markdown total)
- Integration through bash commands

The result: I say "let's build X" and an hour later I say "complete the card" and everything is updated, deployed, and documented.
