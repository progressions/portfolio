'use client';

import { Typography, Box } from '@mui/material';

interface ResultsCountProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

export default function ResultsCount({ 
  filteredCount, 
  totalCount, 
  hasActiveFilters 
}: ResultsCountProps) {
  const getResultsText = () => {
    if (filteredCount === 0) {
      return 'No posts found';
    }
    
    if (!hasActiveFilters || filteredCount === totalCount) {
      return `Showing all ${totalCount} post${totalCount !== 1 ? 's' : ''}`;
    }
    
    return `Showing ${filteredCount} of ${totalCount} post${totalCount !== 1 ? 's' : ''}`;
  };

  const getSubtext = () => {
    if (filteredCount === 0 && hasActiveFilters) {
      return 'Try removing some filters or adjusting your search terms';
    }
    return null;
  };

  const subtext = getSubtext();

  return (
    <Box sx={{ mb: 2, textAlign: 'center' }}>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontWeight: 500 }}
        data-testid="results-count"
      >
        {getResultsText()}
      </Typography>
      {subtext && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: '0.75rem', mt: 0.5, opacity: 0.8 }}
        >
          {subtext}
        </Typography>
      )}
    </Box>
  );
}