# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Isaac Priestley, built with Next.js 15, Material UI v6, and TypeScript. Features a dynamic blog system with filtering capabilities and showcases various development projects.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (with Turbopack on port 3003)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run Playwright MCP
npm run mcp:playwright
```

## Architecture

- **Framework**: Next.js 15 with App Router and TypeScript
- **UI Library**: Material UI v6 with dark theme
- **Fonts**: Geist Sans and Geist Mono (Google Fonts)
- **Styling**: Material UI's sx prop and theme system with dark mode
- **Content**: Markdown-based blog posts with gray-matter frontmatter parsing
- **Port**: Development server runs on port 3003 (not standard 3000)

## Project Structure

- `src/app/` - Next.js app directory with route-based pages
  - `layout.tsx` - Root layout with Providers wrapper
  - `providers.tsx` - Material UI ThemeProvider and CssBaseline setup
  - `theme.ts` - Dark theme configuration
  - `blog/` - Blog system with dynamic routing and filtering components
  - Individual project pages: `chi-war/`, `payment-processor/`, `rpg-management-system/`, etc.
- `src/content/blog/` - Markdown blog posts with frontmatter metadata
- `src/lib/` - Utilities split between server-side (`blog.ts`) and client-side (`blogClient.ts`)
- `public/` - Static assets including project screenshots and resume PDF

## Key Architecture Patterns

### Theming System
- Dark theme configured globally in `theme.ts` with Material UI palette
- `providers.tsx` wraps the app with ThemeProvider and CssBaseline
- All components use Material UI's sx prop for consistent theming

### Blog System Architecture
- **Server-side**: `src/lib/blog.ts` handles file system operations, markdown parsing with `marked`, and frontmatter with `gray-matter`
- **Client-side**: `src/lib/blogClient.ts` provides filtering utilities without Node.js dependencies
- **Content**: Markdown files in `src/content/blog/` with frontmatter for title, date, excerpt, and tags
- **Dynamic routing**: `blog/[slug]/page.tsx` for individual posts
- **Filtering**: Real-time search, tag filtering, and sorting functionality

### Component Organization
- Blog filtering components in `src/app/blog/components/`
- Shared components in `src/app/components/`
- Each project has its own page route (e.g., `chi-war/page.tsx`)

## Development Notes

- Development server uses Turbopack for faster builds
- All styling uses Material UI's sx prop system
- Blog posts support tags for categorization and filtering
- TypeScript interfaces are shared between server and client utilities
- Static assets include project screenshots and professional resume