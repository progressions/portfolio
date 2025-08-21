# Dynamic Blog Filtering Implementation Specification

## Overview
Enhance the existing markdown-based blog system with client-side filtering, searching, and sorting capabilities while maintaining static generation benefits.

## Implementation Steps (Atomic Chunks)

### Phase 1: Core Filtering Infrastructure (Blog Utilities)

#### 1. Enhance Blog Utilities (`src/lib/blog.ts`)
- Add `getAllTags(): TagWithCount[]` function
  - Extract all unique tags from all blog posts
  - Count posts per tag for display
  - Return sorted tags (most popular first)
- Add `filterPostsByTag(posts: BlogPostMeta[], tag: string): BlogPostMeta[]`
  - Filter posts array by specific tag
  - Case-insensitive matching
- Add `searchPosts(posts: BlogPostMeta[], query: string): BlogPostMeta[]`
  - Search through title, excerpt, and tags
  - Case-insensitive, partial matching
  - Return ranked results (title matches first)
- Add `sortPosts(posts: BlogPostMeta[], sortBy: SortOption, order: SortOrder): BlogPostMeta[]`
  - Sort by date (newest/oldest) or title (A-Z/Z-A)
  - Maintain existing date sorting as default

#### 2. Create Type Definitions
- Add `TagWithCount` interface: `{ tag: string; count: number }`
- Add `SortOption` type: `'date' | 'title'`
- Add `SortOrder` type: `'asc' | 'desc'`
- Add `FilterState` interface for URL state management

### Phase 2: Filter Components

#### 3. Create SearchBar Component (`src/app/blog/components/SearchBar.tsx`)
- Text input with search icon
- Debounced input (300ms) to avoid excessive filtering
- Clear button when search has text
- Placeholder text: "Search posts..."
- Material UI TextField with appropriate styling

#### 4. Create TagFilter Component (`src/app/blog/components/TagFilter.tsx`)
- Display all available tags as clickable chips
- Show post count for each tag: "React (3)"
- Active tag has different styling (filled vs outlined)
- Support multiple tag selection
- Responsive layout with proper wrapping

#### 5. Create SortDropdown Component (`src/app/blog/components/SortDropdown.tsx`)
- Material UI Select component
- Options: "Newest First", "Oldest First", "Title A-Z", "Title Z-A"
- Default to "Newest First" to match existing behavior
- Consistent styling with other filter components

#### 6. Create ActiveFilters Component (`src/app/blog/components/ActiveFilters.tsx`)
- Show currently applied filters as removable chips
- Display: active search query, selected tags, current sort
- Each filter has an X button to remove individually
- "Clear All Filters" button when multiple filters active

#### 7. Create ResultsCount Component (`src/app/blog/components/ResultsCount.tsx`)
- Display "Showing X of Y posts" or "Showing all X posts"
- Update dynamically as filters change
- Show "No posts found" when filters return empty results

### Phase 3: Enhanced Blog Index Page

#### 8. Create FilterToolbar Component (`src/app/blog/components/FilterToolbar.tsx`)
- Container for SearchBar, TagFilter, and SortDropdown
- Responsive layout: stacked on mobile, horizontal on desktop
- Collapsible on mobile with "Filters" button
- Proper spacing and Material UI theme integration

#### 9. Upgrade Blog Index Page (`src/app/blog/page.tsx`)
- Convert to client component with 'use client'
- Add React state for: searchQuery, selectedTags, sortBy, sortOrder
- Implement URL state synchronization with useSearchParams
- Add filtered posts calculation using new utility functions
- Integrate all filter components into layout
- Maintain existing card-based post display

#### 10. URL State Management
- Use Next.js `useSearchParams` and `useRouter`
- Sync filter state with URL query parameters:
  - `?search=query` - Search query
  - `?tag=Next.js&tag=React` - Multiple selected tags
  - `?sort=title&order=asc` - Sort configuration
- Handle initial page load with existing URL parameters
- Update URL without page refresh when filters change

### Phase 4: User Experience Enhancements

#### 11. Empty States and Messaging
- Show helpful message when no posts match filters
- Suggest removing filters or trying different search terms
- Display "No posts tagged with [tag]" for specific scenarios
- Maintain loading states during filter transitions

#### 12. Mobile Responsiveness
- Collapsible filter toolbar on small screens
- Touch-friendly filter chips and buttons
- Appropriate spacing for mobile interaction
- Test on various mobile screen sizes

#### 13. Performance Optimization
- Memoize filtered results to prevent unnecessary recalculations
- Debounce search input to reduce filtering frequency
- Optimize tag counting and sorting algorithms
- Lazy load or virtualize if many posts in the future

### Phase 5: Polish and Testing

#### 14. Animation and Transitions
- Smooth fade in/out for post cards during filtering
- Loading indicators for search operations
- Subtle hover effects on interactive elements
- Maintain Material UI motion patterns

#### 15. Accessibility Improvements
- Proper ARIA labels for filter controls
- Keyboard navigation for all interactive elements
- Screen reader announcements for filter changes
- High contrast support for filter states

#### 16. Integration Testing
- Test all filter combinations work correctly
- Verify URL sharing and bookmarking
- Test browser back/forward navigation
- Validate mobile touch interactions
- Performance test with many posts

## File Structure to Create
```
src/
├── app/
│   └── blog/
│       ├── components/
│       │   ├── SearchBar.tsx
│       │   ├── TagFilter.tsx
│       │   ├── SortDropdown.tsx
│       │   ├── ActiveFilters.tsx
│       │   ├── ResultsCount.tsx
│       │   └── FilterToolbar.tsx
│       └── page.tsx (enhanced)
└── lib/
    └── blog.ts (enhanced)
```

## Key Interfaces to Add

```typescript
// Enhanced blog utilities
interface TagWithCount {
  tag: string;
  count: number;
}

type SortOption = 'date' | 'title';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;
  sortOrder: SortOrder;
}
```

## URL Parameter Format
- Search: `?search=authentication`
- Tags: `?tag=React&tag=Next.js` (multiple tags)
- Sort: `?sort=title&order=asc`
- Combined: `?search=react&tag=Next.js&sort=date&order=desc`

## Success Criteria
- All filter components work independently and together
- URL state synchronization functions correctly
- Performance remains fast with current number of posts
- Mobile responsive design works on all screen sizes
- Accessibility standards met for all interactive elements
- No TypeScript errors or runtime warnings
- Maintains existing Material UI theme consistency

## Testing Checklist
- [ ] Search functionality works across all post content
- [ ] Tag filtering supports multiple tag selection
- [ ] Sort options work for all criteria
- [ ] Filter combinations work together correctly
- [ ] URL updates reflect current filter state
- [ ] Shared URLs restore correct filter state
- [ ] Browser navigation works with filters
- [ ] Mobile interface is touch-friendly
- [ ] Empty states show appropriate messages
- [ ] Performance is acceptable with all posts
- [ ] Accessibility requirements met