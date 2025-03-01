import React from 'react';
import { Box, TextField, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ searchQuery, setSearchQuery, generateNewColors }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mb: 2
      }}
    >
      <Paper
        elevation={2}
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center',
          width: '100%',
          maxWidth: 800
        }}
      >
        <InputAdornment position="start" sx={{ pl: 1 }}>
          <SearchIcon color="action" />
        </InputAdornment>
        <TextField
          fullWidth
          placeholder="Search colors by name, hex code, or category..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // Generate new colors after a short delay
            if (e.target.value.trim() !== '') {
              generateNewColors();
            }
          }}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{ ml: 1 }}
        />
      </Paper>
    </Box>
  );
};

export default SearchInput;