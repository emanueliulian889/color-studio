import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import GridViewIcon from '@mui/icons-material/GridView';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const ColorControls = ({ 
  colors, 
  favorites, 
  showGrid, 
  setShowGrid, 
  expanded, 
  setExpanded,
  copyToClipboard 
}) => {
  return (
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
        zIndex: 10
      }}
    >
      <Tooltip title="Copy All Colors">
        <IconButton 
          color="inherit" 
          onClick={() => {
            const hexValues = colors.map(c => c.hex || c).join(', ');
            copyToClipboard(hexValues);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Color Information">
        <IconButton color="inherit">
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={showGrid ? "Hide Grid" : "Show Grid"}>
        <IconButton color="inherit" onClick={() => setShowGrid(!showGrid)}>
          <GridViewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Favorite Palette">
        <IconButton color="inherit">
          {favorites.every(Boolean) ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title={expanded ? "Contract View" : "Expand View"}>
        <IconButton color="inherit" onClick={() => setExpanded(!expanded)}>
          {expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ColorControls;