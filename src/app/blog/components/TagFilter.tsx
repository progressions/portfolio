'use client';

import { Box, Chip, Typography } from '@mui/material';
import { TagWithCount } from '@/lib/blogClient';

interface TagFilterProps {
  availableTags: TagWithCount[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function TagFilter({ 
  availableTags, 
  selectedTags, 
  onTagToggle 
}: TagFilterProps) {
  if (availableTags.length === 0) {
    return null;
  }

  return (
    <Box data-testid="tag-filter">
      <Typography 
        variant="subtitle2" 
        color="text.secondary" 
        gutterBottom
        sx={{ mb: 1.5 }}
      >
        Filter by Tag
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1,
        maxHeight: 200,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 4,
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 2,
        },
      }}>
        {availableTags.map(({ tag, count }) => {
          const isSelected = selectedTags.includes(tag);
          
          return (
            <Chip
              key={tag}
              data-testid="tag-filter-chip"
              label={`${tag} (${count})`}
              onClick={() => onTagToggle(tag)}
              variant={isSelected ? 'filled' : 'outlined'}
              color={isSelected ? 'primary' : 'default'}
              size="small"
              clickable
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 2,
                },
                ...(isSelected && {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  borderColor: 'primary.main',
                }),
                ...(!isSelected && {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }),
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}