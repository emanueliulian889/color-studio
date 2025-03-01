import { useState, useEffect } from 'react';
import { colorLibrary } from '../constants/colorLibrary';
import { isDarkColor, isNeutralColor, getColorName as getColorNameUtil } from '../utils/colorUtils';

const useColorManagement = () => {
  // State for category filter
  const [selectedCategory, setSelectedCategory] = useState('all');
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get filtered colors based on the selected category and search query
  const getFilteredColors = () => {
    let filteredByCategory = colorLibrary;
    
    // First filter by category
    if (selectedCategory !== 'all') {
      filteredByCategory = colorLibrary.filter(color => 
        color.categories && color.categories.includes(selectedCategory)
      );
    }
    
    // Then filter by search query if it exists
    if (searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      return filteredByCategory.filter(color => 
        color.name.toLowerCase().includes(query) || 
        color.hex.toLowerCase().includes(query) ||
        (color.categories && color.categories.some(cat => cat.toLowerCase().includes(query)))
      );
    }
    
    return filteredByCategory;
  };

  // Function to generate a random color from filtered library
  const generateRandomFilteredColor = () => {
    const filteredColors = getFilteredColors();
    if (filteredColors.length === 0) return colorLibrary[0]; // Fallback
    
    const randomIndex = Math.floor(Math.random() * filteredColors.length);
    return filteredColors[randomIndex];
  };
  
  // State for storing our 5 colors - defined after the helper functions
  const [colors, setColors] = useState(Array(5).fill().map(() => generateRandomFilteredColor()));
  // State to track which colors are locked
  const [lockedColors, setLockedColors] = useState(Array(5).fill(false));
  // State for favorites
  const [favorites, setFavorites] = useState(Array(5).fill(false));
  // State for expanded/contracted view
  const [expanded, setExpanded] = useState(false);
  // State for showing grid
  const [showGrid, setShowGrid] = useState(false);
  // State for active shade column
  const [activeShadeIndex, setActiveShadeIndex] = useState(null);
  // State for toast notification
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Function to generate a balanced color palette
  const generateBalancedPalette = () => {
    setActiveShadeIndex(null); // Close shade view
    
    // This will contain our new palette colors
    const newPalette = [...colors];
    
    // Count locked colors by type
    let lockedDarkCount = 0;
    let lockedNeutralCount = 0;
    let lockedAccentCount = 0;
    
    // Identify locked colors by type
    colors.forEach((color, index) => {
      if (lockedColors[index]) {
        const colorHex = color.hex || color;
        if (isDarkColor(colorHex)) lockedDarkCount++;
        else if (isNeutralColor(colorHex)) lockedNeutralCount++;
        else lockedAccentCount++;
      }
    });
    
    // Generate appropriate number of free slots
    const needDark = Math.max(0, 3 - lockedDarkCount);
    const needNeutral = Math.max(0, 1 - lockedNeutralCount);
    const needAccent = Math.max(0, 1 - lockedAccentCount);
    
    // Get filtered colors for the current category
    const filteredColors = getFilteredColors();
    if (filteredColors.length === 0) return; // No colors available
    
    // Separate filtered colors by type
    const darkColors = filteredColors.filter(color => isDarkColor(color.hex));
    const neutralColors = filteredColors.filter(color => isNeutralColor(color.hex));
    const accentColors = filteredColors.filter(
      color => !isDarkColor(color.hex) && !isNeutralColor(color.hex)
    );
    
    // If we don't have enough color variations, use all available colors as fallback
    if (darkColors.length < 3 || neutralColors.length < 1 || accentColors.length < 1) {
      colors.forEach((color, index) => {
        if (!lockedColors[index]) {
          newPalette[index] = generateRandomFilteredColor();
        }
      });
      
      setColors(newPalette);
      return;
    }
    
    // Shuffle color arrays to get random choices
    const shuffleDark = [...darkColors].sort(() => 0.5 - Math.random());
    const shuffleNeutral = [...neutralColors].sort(() => 0.5 - Math.random());
    const shuffleAccent = [...accentColors].sort(() => 0.5 - Math.random());
    
    // Assign colors to available slots
    let darkAssigned = 0;
    let neutralAssigned = 0;
    let accentAssigned = 0;
    
    colors.forEach((color, index) => {
      if (!lockedColors[index]) {
        if (darkAssigned < needDark && shuffleDark.length > 0) {
          newPalette[index] = shuffleDark[darkAssigned];
          darkAssigned++;
        } else if (neutralAssigned < needNeutral && shuffleNeutral.length > 0) {
          newPalette[index] = shuffleNeutral[neutralAssigned];
          neutralAssigned++;
        } else if (accentAssigned < needAccent && shuffleAccent.length > 0) {
          newPalette[index] = shuffleAccent[accentAssigned];
          accentAssigned++;
        } else {
          // If we've already assigned our required colors, just pick randomly
          newPalette[index] = generateRandomFilteredColor();
        }
      }
    });
    
    setColors(newPalette);
  };

  // Function to generate new colors, respecting locked colors
  const generateNewColors = () => {
    generateBalancedPalette();
  };

  // Generate new colors when category changes
  useEffect(() => {
    generateNewColors();
  }, [selectedCategory]);
  
  // Handle spacebar press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        generateNewColors();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [colors, lockedColors, selectedCategory]);

  // Copy hex code to clipboard
  const copyToClipboard = (colorObj) => {
    const hexValue = typeof colorObj === 'string' ? colorObj : colorObj.hex;
    
    navigator.clipboard.writeText(hexValue).then(() => {
      setToast({
        open: true,
        message: `Copied ${hexValue.toUpperCase()} to clipboard!`,
        severity: 'success'
      });
    });
  };

  // Toggle lock state for a specific color
  const toggleLock = (index) => {
    const newLockedColors = [...lockedColors];
    newLockedColors[index] = !newLockedColors[index];
    setLockedColors(newLockedColors);
  };

  // Toggle favorite state for a specific color
  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  // Handle clicking on a color column
  const handleColorClick = (index) => {
    if (activeShadeIndex === index) {
      setActiveShadeIndex(null);
    } else {
      setActiveShadeIndex(index);
    }
  };

  // Handle closing the toast
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({...toast, open: false});
  };

  // Get color name with the colorLibrary injected
  const getColorName = (colorObj) => {
    return getColorNameUtil(colorObj, colorLibrary);
  };

  return {
    colors,
    setColors,
    lockedColors,
    setLockedColors,
    favorites,
    setFavorites,
    expanded,
    setExpanded,
    showGrid,
    setShowGrid,
    activeShadeIndex,
    setActiveShadeIndex,
    toast,
    setToast,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    generateNewColors,
    copyToClipboard,
    toggleLock,
    toggleFavorite,
    handleColorClick,
    handleCloseToast,
    getColorName
  };
};

export default useColorManagement;