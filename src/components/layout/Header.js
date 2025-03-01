import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const Header = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar 
            sx={{ 
              mr: 2, 
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              width: 40,
              height: 40
            }}
          >
            <PaletteIcon />
          </Avatar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
            Color Studio
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;