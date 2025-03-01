import React from 'react';
import { Stack, Chip, Box } from '@mui/material';

const CategoryChips = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1}}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            onClick={() => setSelectedCategory(category.id)}
            sx={{
              backgroundColor: selectedCategory === category.id ? '#1976d2' : 'rgba(255, 255, 255, 0.8)',
              color: selectedCategory === category.id ? 'white' : '#757575',
              border: selectedCategory === category.id ? 'none' : '1px solid rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: selectedCategory === category.id ? '#1565c0' : 'rgba(255, 255, 255, 0.95)'
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryChips;