# Blog Feature Implementation Specification

## Overview
Implement a static file-based blog system for the portfolio website using Next.js App Router, Material UI, and markdown files.

## Implementation Steps (Atomic Chunks)

### 1. Dependencies Setup
- Install required npm packages:
  - `gray-matter` for frontmatter parsing
  - `marked` or `remark` for markdown parsing
  - `@types/marked` for TypeScript support

### 2. Content Directory Structure
- Create `/src/content/blog/` directory
- Create example blog post file with proper frontmatter structure

### 3. Blog Utilities
- Create `/src/lib/blog.ts` with functions:
  - `getAllBlogPosts()` - reads all markdown files
  - `getBlogPost(slug)` - gets single post by slug
  - `sortPostsByDate()` - sorts posts newest first

### 4. Blog Index Page
- Create `/src/app/blog/page.tsx`
- Implement Material UI card layout for post listing
- Display title, date, excerpt for each post
- Sort posts by date (newest first)
- Add proper TypeScript interfaces

### 5. Individual Blog Post Page
- Create `/src/app/blog/[slug]/page.tsx`
- Implement dynamic route handling
- Render markdown content with proper styling
- Add metadata display (title, date)
- Include back navigation to blog index

### 6. Navigation Updates
- Update main navigation to include "Blog" link
- Ensure consistent styling with existing navigation

### 7. Styling Integration
- Apply Material UI dark theme to blog components
- Ensure responsive design
- Style markdown content appropriately
- Add proper typography using theme system

### 8. Example Content
- Create 2-3 example blog posts to demonstrate functionality
- Include varied content (code snippets, images, etc.)

### 9. Build Optimization
- Implement static generation for blog posts
- Add proper SEO meta tags
- Optimize for performance

### 10. Testing & Validation
- Test all routes work correctly
- Verify responsive design
- Check markdown rendering
- Validate build process

## File Structure to Create
```
src/
├── content/
│   └── blog/
│       ├── first-post.md
│       └── second-post.md
├── lib/
│   └── blog.ts
└── app/
    └── blog/
        ├── page.tsx
        └── [slug]/
            └── page.tsx
```

## Frontmatter Structure
```yaml
---
title: "Post Title"
date: "2024-01-15"
slug: "post-title"
excerpt: "Brief description of the post"
tags: ["tag1", "tag2"]
---
```

## Dependencies to Add
- `gray-matter`: Parse frontmatter
- `marked`: Parse markdown to HTML
- `@types/marked`: TypeScript definitions

## Success Criteria
- All atomic steps completed successfully
- Blog routes accessible and functional
- Content renders properly with dark theme
- Navigation updated and working
- Build process succeeds without errors