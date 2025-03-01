import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import SpacebarPrompt from '../components/layout/SpacebarPrompt';
import ColorPalette from '../components/ColorPalette';
import useColorManagement from '../hooks/useColorManagement';
import { Box } from '@mui/material';

const Home = () => {
  const {
    colors,
    lockedColors,
    favorites,
    expanded,
    setExpanded,
    showGrid,
    setShowGrid,
    activeShadeIndex,
    toast,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    generateNewColors,
    copyToClipboard,
    toggleLock,
    handleColorClick,
    handleCloseToast,
    getColorName
  } = useColorManagement();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        generateNewColors={generateNewColors}
      />
      
      <SpacebarPrompt />
      
      <ColorPalette 
        colors={colors}
        lockedColors={lockedColors}
        toggleLock={toggleLock}
        favorites={favorites}
        expanded={expanded}
        setExpanded={setExpanded}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        activeShadeIndex={activeShadeIndex}
        handleColorClick={handleColorClick}
        copyToClipboard={copyToClipboard}
        getColorName={getColorName}
        toast={toast}
        handleCloseToast={handleCloseToast}
        setSearchQuery={setSearchQuery}
        generateNewColors={generateNewColors}
      />
    </Box>
  );
};

export default Home;