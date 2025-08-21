'use client';

import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Collapse, 
  IconButton, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { FilterList, ExpandMore, ExpandLess } from '@mui/icons-material';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import SortDropdown from './SortDropdown';
import { TagWithCount, SortOption, SortOrder } from '@/lib/blogClient';

interface FilterToolbarProps {
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;
  sortOrder: SortOrder;
  availableTags: TagWithCount[];
  onSearchChange: (query: string) => void;
  onTagToggle: (tag: string) => void;
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

export default function FilterToolbar({
  searchQuery,
  selectedTags,
  sortBy,
  sortOrder,
  availableTags,
  onSearchChange,
  onTagToggle,
  onSortChange,
}: FilterToolbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mb: 4, 
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Mobile filter header */}
      {isMobile && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: 'action.hover',
            cursor: 'pointer',
          }}
          onClick={toggleExpanded}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList color="primary" />
            <Typography variant="subtitle1" color="primary">
              Filters & Search
            </Typography>
            {(searchQuery || selectedTags.length > 0) && (
              <Typography variant="caption" color="text.secondary">
                ({(searchQuery ? 1 : 0) + selectedTags.length} active)
              </Typography>
            )}
          </Box>
          <IconButton size="small">
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      )}

      {/* Filter content */}
      <Collapse in={isExpanded} timeout="auto">
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              alignItems: { xs: 'stretch', md: 'flex-start' },
            }}
          >
            {/* Search Bar */}
            <Box sx={{ flex: { md: '1 1 300px' } }}>
              <Typography 
                variant="subtitle2" 
                color="text.secondary" 
                gutterBottom
                sx={{ mb: 1.5 }}
              >
                Search Posts
              </Typography>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                placeholder="Search by title, content, or tags..."
              />
            </Box>

            {/* Tag Filter */}
            <Box sx={{ flex: { md: '1 1 400px' } }}>
              <TagFilter
                availableTags={availableTags}
                selectedTags={selectedTags}
                onTagToggle={onTagToggle}
              />
            </Box>

            {/* Sort Dropdown */}
            <Box sx={{ flex: { md: '0 0 auto' } }}>
              <Typography 
                variant="subtitle2" 
                color="text.secondary" 
                gutterBottom
                sx={{ mb: 1.5 }}
              >
                Sort Posts
              </Typography>
              <SortDropdown
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}