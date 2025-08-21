'use client';

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { SortOption, SortOrder } from '@/lib/blogClient';

interface SortDropdownProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

type SortValue = `${SortOption}-${SortOrder}`;

export default function SortDropdown({ 
  sortBy, 
  sortOrder, 
  onSortChange 
}: SortDropdownProps) {
  const currentValue: SortValue = `${sortBy}-${sortOrder}`;

  const handleSortChange = (event: SelectChangeEvent<SortValue>) => {
    const value = event.target.value as SortValue;
    const [newSortBy, newSortOrder] = value.split('-') as [SortOption, SortOrder];
    onSortChange(newSortBy, newSortOrder);
  };

  const sortOptions: { value: SortValue; label: string }[] = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
  ];

  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        value={currentValue}
        label="Sort By"
        onChange={handleSortChange}
        data-testid="sort-dropdown"
        sx={{
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} data-testid="sort-option" data-value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}