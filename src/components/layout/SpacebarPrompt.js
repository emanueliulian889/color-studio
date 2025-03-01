import React from 'react';
import { Box, Typography } from '@mui/material';

const SpacebarPrompt = () => {
  return (
    <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.1)', py: 1 }}>
      <Typography sx={{ textAlign: 'center', color: '#757575', fontStyle: 'italic' }}>
        Press the spacebar to generate color palettes!
      </Typography>
    </Box>
  );
};

export default SpacebarPrompt;