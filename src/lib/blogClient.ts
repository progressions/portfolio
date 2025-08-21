// Client-side blog utilities for filtering (no Node.js dependencies)
export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface TagWithCount {
  tag: string;
  count: number;
}

export type SortOption = 'date' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;
  sortOrder: SortOrder;
}

// Client-side filtering functions
export function getAllTagsFromPosts(posts: BlogPostMeta[]): TagWithCount[] {
  const tagCounts: { [key: string]: number } = {};
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function filterPostsByTag(posts: BlogPostMeta[], tag: string): BlogPostMeta[] {
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function searchPosts(posts: BlogPostMeta[], query: string): BlogPostMeta[] {
  if (!query.trim()) return posts;
  
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => {
    // Search in title (highest priority)
    const titleMatch = post.title.toLowerCase().includes(lowercaseQuery);
    
    // Search in excerpt
    const excerptMatch = post.excerpt.toLowerCase().includes(lowercaseQuery);
    
    // Search in tags
    const tagMatch = post.tags.some(tag => 
      tag.toLowerCase().includes(lowercaseQuery)
    );
    
    return titleMatch || excerptMatch || tagMatch;
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase().includes(lowercaseQuery);
    const bTitle = b.title.toLowerCase().includes(lowercaseQuery);
    
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    
    // If both or neither match title, maintain date order
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function sortPosts(posts: BlogPostMeta[], sortBy: SortOption, order: SortOrder): BlogPostMeta[] {
  const sorted = [...posts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  return order === 'desc' ? sorted.reverse() : sorted;
}