'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { 
  BlogPostMeta, 
  SortOption, 
  SortOrder,
  getAllTagsFromPosts,
  filterPostsByTag,
  searchPosts,
  sortPosts
} from '@/lib/blogClient';
import Link from 'next/link';
import FilterToolbar from './FilterToolbar';
import ActiveFilters from './ActiveFilters';
import ResultsCount from './ResultsCount';

interface BlogClientProps {
  posts: BlogPostMeta[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get available tags from posts
  const availableTags = useMemo(() => getAllTagsFromPosts(posts), [posts]);
  
  // Initialize filter state from URL parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Initialize state from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlTags = searchParams.getAll('tag') || [];
    const urlSortBy = (searchParams.get('sort') as SortOption) || 'date';
    const urlSortOrder = (searchParams.get('order') as SortOrder) || 'desc';

    setSearchQuery(urlSearch);
    setSelectedTags(urlTags);
    setSortBy(urlSortBy);
    setSortOrder(urlSortOrder);
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback((newParams: {
    search?: string;
    tags?: string[];
    sortBy?: SortOption;
    sortOrder?: SortOrder;
  }) => {
    const params = new URLSearchParams();
    
    if (newParams.search && newParams.search.trim()) {
      params.set('search', newParams.search.trim());
    }
    
    if (newParams.tags && newParams.tags.length > 0) {
      newParams.tags.forEach(tag => params.append('tag', tag));
    }
    
    if (newParams.sortBy && newParams.sortBy !== 'date') {
      params.set('sort', newParams.sortBy);
    }
    
    if (newParams.sortOrder && newParams.sortOrder !== 'desc') {
      params.set('order', newParams.sortOrder);
    }

    const queryString = params.toString();
    const newUrl = `/blog${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
  }, [router]);

  // Filter and sort posts based on current state
  const filteredPosts = useMemo(() => {
    let filteredPosts = [...posts];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filteredPosts = searchPosts(filteredPosts, searchQuery);
    }
    
    // Apply tag filters
    selectedTags.forEach(tag => {
      filteredPosts = filterPostsByTag(filteredPosts, tag);
    });
    
    // Apply sorting
    filteredPosts = sortPosts(filteredPosts, sortBy, sortOrder);
    
    return filteredPosts;
  }, [posts, searchQuery, selectedTags, sortBy, sortOrder]);

  // Filter handlers
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    updateURL({ search: query, tags: selectedTags, sortBy, sortOrder });
  }, [selectedTags, sortBy, sortOrder, updateURL]);

  const handleTagToggle = useCallback((tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    updateURL({ search: searchQuery, tags: newTags, sortBy, sortOrder });
  }, [searchQuery, selectedTags, sortBy, sortOrder, updateURL]);

  const handleSortChange = useCallback((newSortBy: SortOption, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    updateURL({ search: searchQuery, tags: selectedTags, sortBy: newSortBy, sortOrder: newSortOrder });
  }, [searchQuery, selectedTags, updateURL]);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    updateURL({ search: '', tags: selectedTags, sortBy, sortOrder });
  }, [selectedTags, sortBy, sortOrder, updateURL]);

  const handleTagRemove = useCallback((tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    updateURL({ search: searchQuery, tags: newTags, sortBy, sortOrder });
  }, [searchQuery, selectedTags, sortBy, sortOrder, updateURL]);

  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortBy('date');
    setSortOrder('desc');
    router.push('/blog', { scroll: false });
  }, [router]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0 || sortBy !== 'date' || sortOrder !== 'desc';

  return (
    <>
      {/* Filter Toolbar */}
      <FilterToolbar
        searchQuery={searchQuery}
        selectedTags={selectedTags}
        sortBy={sortBy}
        sortOrder={sortOrder}
        availableTags={availableTags}
        onSearchChange={handleSearchChange}
        onTagToggle={handleTagToggle}
        onSortChange={handleSortChange}
      />

      {/* Active Filters */}
      <ActiveFilters
        searchQuery={searchQuery}
        selectedTags={selectedTags}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchClear={handleSearchClear}
        onTagRemove={handleTagRemove}
        onClearAll={handleClearAll}
      />

      {/* Results Count */}
      <ResultsCount
        filteredCount={filteredPosts.length}
        totalCount={posts.length}
        hasActiveFilters={hasActiveFilters}
      />
      
      {/* Posts List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {filteredPosts.length === 0 ? (
          <Box data-testid="empty-state" sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search terms or clearing filters to see more posts.
            </Typography>
          </Box>
        ) : (
          filteredPosts.map((post) => (
            <Card 
              key={post.slug}
              data-testid="blog-post"
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
            <CardContent sx={{ p: 3 }}>
              <Link 
                href={`/blog/${post.slug}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {post.title}
                </Typography>
              </Link>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                gutterBottom
                sx={{ mb: 2 }}
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.primary" 
                paragraph
                sx={{ mb: 2 }}
              >
                {post.excerpt}
              </Typography>
              
              {post.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags.map((tag) => (
                    <Chip 
                      key={tag}
                      data-testid="tag-chip"
                      label={tag} 
                      size="small" 
                      variant="outlined"
                      clickable
                      onClick={() => handleTagToggle(tag)}
                      sx={{ 
                        borderColor: selectedTags.includes(tag) ? 'primary.main' : 'primary.main',
                        color: selectedTags.includes(tag) ? 'primary.contrastText' : 'primary.main',
                        backgroundColor: selectedTags.includes(tag) ? 'primary.main' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
          ))
        )}
      </Box>
    </>
  );
}