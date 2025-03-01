import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { getTextColor, generateShades } from '../../utils/colorUtils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GridViewIcon from '@mui/icons-material/GridView';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const ColorColumn = ({ 
  color, 
  index, 
  handleColorClick, 
  activeShadeIndex, 
  copyToClipboard, 
  showGrid, 
  getColorName,
  colors
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showShades, setShowShades] = useState(false);
  const colorHex = color.hex || color;
  const textColor = getTextColor(colorHex);
  
  const handleCopyClick = (e) => {
    e.stopPropagation();
    copyToClipboard(colorHex);
  };
  
  const handleCopyAllClick = (e) => {
    e.stopPropagation();
    const allColors = colors?.map(c => c.hex || c).join(', ');
    copyToClipboard(allColors);
  };
  
  const handleShadesClick = (e) => {
    e.stopPropagation();
    setShowShades(!showShades);
  };
  
  return (
    <Box 
      key={index}
      onClick={() => handleColorClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        flex: 1,
        height: '100%',
        backgroundColor: colorHex,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pb: 3,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        ...(showGrid && { border: '1px solid rgba(255,255,255,0.1)' })
      }}
      className="color-column"
    >
      {/* Quick action buttons that appear on hover */}
      {isHovered && !showShades && !activeShadeIndex && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            p: 1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 5
          }}
        >
          <Tooltip title="Copy This Color">
            <IconButton 
              onClick={handleCopyClick}
              sx={{ color: textColor }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Copy All Colors">
            <IconButton 
              onClick={handleCopyAllClick}
              sx={{ color: textColor }}
            >
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Show Color Shades">
            <IconButton 
              onClick={handleShadesClick}
              sx={{ color: textColor }}
            >
              <GridViewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      
      {/* Show color shades if requested */}
      {(activeShadeIndex === index || showShades) && (
        <ColorShades 
          colorHex={colorHex} 
          copyToClipboard={copyToClipboard} 
          onClose={() => setShowShades(false)}
        />
      )}
      
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold', 
          color: textColor,
          textShadow: '0px 0px 3px rgba(128,128,128,0.3)',
          pointerEvents: 'none'
        }}
      >
        {colorHex.toUpperCase()}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: textColor,
          opacity: 0.9,
          pointerEvents: 'none' 
        }}
      >
        {getColorName(color)}
      </Typography>
    </Box>
  );
};

const ColorShades = ({ colorHex, copyToClipboard, onClose }) => {
  return (
    <Box 
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        zIndex: 10
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClose) onClose();
      }}
    >
      {generateShades(colorHex).map((shade, shadeIndex) => (
        <Box 
          key={shadeIndex}
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(shade);
          }}
          sx={{
            flex: 1,
            width: '100%',
            backgroundColor: shade,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            // No hover effects for cleaner look
            transition: 'none'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'bold', 
              color: getTextColor(shade)
              // No text shadow for cleaner look
            }}
          >
            {shade.toUpperCase()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ColorColumn;