# Add Blog Feature to Portfolio Site

## Description
Add a blog section to the portfolio website that displays static blog entries sorted by date. This will be a file-based blog system rather than a database-driven CRM.

## Requirements

### Core Functionality
- Create `/blog` route that lists all blog entries
- Create individual blog post pages at `/blog/[slug]`
- Display blog posts sorted by date (newest first)
- Support for markdown content with proper formatting
- Responsive design consistent with existing Material UI dark theme

### File Structure
- Blog posts stored as markdown files in `/src/content/blog/` directory
- Each blog post should have frontmatter with:
  - `title`: Post title
  - `date`: Publication date (YYYY-MM-DD format)
  - `slug`: URL slug for the post
  - `excerpt`: Brief description for listing page
  - Optional: `tags`, `author`, `featured`

### Pages to Create
1. **Blog Index Page** (`/src/app/blog/page.tsx`)
   - Lists all blog posts with title, date, and excerpt
   - Sort by date (newest first)
   - Clean, card-based layout using Material UI components
   
2. **Individual Blog Post Page** (`/src/app/blog/[slug]/page.tsx`)
   - Display full blog post content
   - Show metadata (title, date)
   - Navigation back to blog index
   - Proper markdown rendering with syntax highlighting

### Technical Implementation
- Use Next.js App Router dynamic routes
- Parse markdown files at build time using `gray-matter` and markdown parser
- Generate static pages for each blog post
- Maintain consistent styling with existing site theme
- Add blog navigation to main site navigation

### Navigation Updates
- Add "Blog" link to main navigation
- Ensure consistent styling with existing navigation items

## Acceptance Criteria
- [ ] Blog index page displays all posts sorted by date
- [ ] Individual blog post pages render markdown content properly
- [ ] Navigation includes blog link
- [ ] All styling consistent with existing Material UI dark theme
- [ ] Responsive design works on mobile and desktop
- [ ] Build process generates static pages successfully
- [ ] Example blog post created to demonstrate functionality

## Technical Notes
- This is a static site approach - no database required
- Content managed through markdown files in the repository
- Builds should remain fast and efficient
- SEO-friendly with proper meta tags for each post