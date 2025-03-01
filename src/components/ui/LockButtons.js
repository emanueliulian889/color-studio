import React from 'react';
import { Box, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { hexToRgb, calculateLuminance, calculateContrastRatio, getTextColor } from '../../utils/colorUtils';

const LockButtons = ({ colors, lockedColors, toggleLock }) => {
  return (
    <Box sx={{ position: 'absolute', top: '10px', width: '100%', display: 'flex', justifyContent: 'space-around', zIndex: 10 }}>
      {colors.map((color, index) => {
        const colorHex = color.hex || color;
        const textColor = getTextColor(colorHex);
        // Check if contrast is sufficient
        const rgb = hexToRgb(colorHex);
        const bgLuminance = calculateLuminance(rgb);
        const iconColor = textColor === '#ffffff' 
          ? (calculateContrastRatio(bgLuminance, 1.0) >= 3 ? '#ffffff' : '#000000')
          : (calculateContrastRatio(bgLuminance, 0.0) >= 3 ? '#000000' : '#ffffff');
        
        return (
          <IconButton 
            key={index} 
            color="inherit" 
            onClick={(e) => {
              e.stopPropagation();
              toggleLock(index);
            }}
            sx={{ 
              color: iconColor,
              backgroundColor: 'rgba(255,255,255,0.15)'
            }}
          >
            {lockedColors[index] ? <LockIcon /> : <LockOpenIcon />}
          </IconButton>
        );
      })}
    </Box>
  );
};

export default LockButtons;