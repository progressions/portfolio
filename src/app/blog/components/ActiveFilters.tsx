'use client';

import { Box, Chip, Typography, Button } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { SortOption, SortOrder } from '@/lib/blogClient';

interface ActiveFiltersProps {
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSearchClear: () => void;
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  searchQuery,
  selectedTags,
  sortBy,
  sortOrder,
  onSearchClear,
  onTagRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasSelectedTags = selectedTags.length > 0;
  const hasCustomSort = sortBy !== 'date' || sortOrder !== 'desc';
  const hasActiveFilters = hasSearchQuery || hasSelectedTags || hasCustomSort;

  if (!hasActiveFilters) {
    return null;
  }

  const getSortLabel = (sortBy: SortOption, sortOrder: SortOrder): string => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' ? 'Newest First' : 'Oldest First';
    } else {
      return sortOrder === 'asc' ? 'Title A-Z' : 'Title Z-A';
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 1.5,
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          Active Filters
        </Typography>
        <Button
          size="small"
          onClick={onClearAll}
          startIcon={<Clear />}
          data-testid="clear-filters"
          sx={{ 
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
        >
          Clear All
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {hasSearchQuery && (
          <Chip
            label={`Search: "${searchQuery}"`}
            onDelete={onSearchClear}
            color="primary"
            variant="filled"
            size="small"
            data-testid="active-filter"
            sx={{
              '& .MuiChip-deleteIcon': {
                color: 'primary.contrastText',
                '&:hover': {
                  color: 'primary.contrastText',
                },
              },
            }}
          />
        )}
        
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            label={`Tag: ${tag}`}
            onDelete={() => onTagRemove(tag)}
            color="primary"
            variant="filled"
            size="small"
            data-testid="active-filter"
            sx={{
              '& .MuiChip-deleteIcon': {
                color: 'primary.contrastText',
                '&:hover': {
                  color: 'primary.contrastText',
                },
              },
            }}
          />
        ))}
        
        {hasCustomSort && (
          <Chip
            label={`Sort: ${getSortLabel(sortBy, sortOrder)}`}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>
    </Box>
  );
}