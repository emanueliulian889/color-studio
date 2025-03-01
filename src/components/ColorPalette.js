import React from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import ColorColumn from './ui/ColorColumn';
import ColorControls from './ui/ColorControls';
import LockButtons from './ui/LockButtons';
import EmptyState from './ui/EmptyState';

const ColorPalette = ({
  colors,
  lockedColors,
  toggleLock,
  favorites,
  expanded,
  setExpanded,
  showGrid,
  setShowGrid,
  activeShadeIndex,
  handleColorClick,
  copyToClipboard,
  getColorName,
  toast,
  handleCloseToast,
  setSearchQuery,
  generateNewColors
}) => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
      {colors.length > 0 ? (
        colors.map((color, index) => (
          <ColorColumn
            key={index}
            color={color}
            index={index}
            handleColorClick={handleColorClick}
            activeShadeIndex={activeShadeIndex}
            copyToClipboard={copyToClipboard}
            showGrid={showGrid}
            getColorName={getColorName}
            colors={colors}
          />
        ))
      ) : (
        <EmptyState 
          setSearchQuery={setSearchQuery} 
          generateNewColors={generateNewColors} 
        />
      )}
      
      {colors.length > 0 && (
        <LockButtons
          colors={colors}
          lockedColors={lockedColors}
          toggleLock={toggleLock}
        />
      )}
      
      {/* Toast notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ColorPalette;