import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const EmptyState = ({ setSearchQuery, generateNewColors }) => {
  return (
    <Box 
      sx={{
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        p: 4
      }}
    >
      <Typography variant="h5" color="textSecondary" gutterBottom>
        No colors found matching your search
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        Try adjusting your search query or selecting a different category.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Chip
          label="Clear Search"
          color="primary"
          onClick={() => {
            setSearchQuery('');
            generateNewColors();
          }}
        />
      </Box>
    </Box>
  );
};

export default EmptyState;