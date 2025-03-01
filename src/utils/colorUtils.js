// Function to generate a random hex color
export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// Function to convert hex to RGB
export const hexToRgb = (hexColor) => {
  const hex = typeof hexColor === 'string' ? hexColor : hexColor.hex;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Function to convert RGB to hex
export const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Calculate relative luminance for WCAG contrast ratio
export const calculateLuminance = (rgb) => {
  // Convert RGB values to the range [0, 1]
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  // Apply gamma correction
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  // Calculate luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// Calculate contrast ratio between two luminance values
export const calculateContrastRatio = (lum1, lum2) => {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Determine optimal text color (black or white) based on background
export const getTextColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#ffffff'; // Default white
  
  const luminance = calculateLuminance(rgb);
  
  // Luminance of white (1.0) and black (0.0)
  const whiteContrast = calculateContrastRatio(luminance, 1.0);
  const blackContrast = calculateContrastRatio(luminance, 0.0);
  
  // Return the color with better contrast (minimum 4.5:1 for WCAG AA)
  return whiteContrast >= blackContrast ? '#ffffff' : '#000000';
};

// Function to generate color shades
export const generateShades = (color, count = 9) => {
  const rgb = hexToRgb(color);
  if (!rgb) return [];
  
  const shades = [];
  
  // Generate darker shades
  for (let i = 0; i < Math.floor(count / 2); i++) {
    const factor = 1 - ((i + 1) * (0.7 / Math.floor(count / 2)));
    shades.unshift(rgbToHex(
      Math.round(rgb.r * factor),
      Math.round(rgb.g * factor),
      Math.round(rgb.b * factor)
    ));
  }
  
  // Add the original color
  shades.push(color);
  
  // Generate lighter shades
  for (let i = 0; i < Math.floor(count / 2); i++) {
    const factor = 1 + ((i + 1) * (1 / Math.floor(count / 2)));
    shades.push(rgbToHex(
      Math.min(255, Math.round(rgb.r * factor)),
      Math.min(255, Math.round(rgb.g * factor)),
      Math.min(255, Math.round(rgb.b * factor))
    ));
  }
  
  return shades;
};

// Determine if a color is dark
export const isDarkColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return false;
  
  const luminance = calculateLuminance(rgb);
  return luminance < 0.4; // Less than 0.4 luminance is considered dark
};

// Determine if a color is neutral (low saturation)
export const isNeutralColor = (hexColor) => {
  const hex = typeof hexColor === 'string' ? hexColor : hexColor.hex;
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  
  // Calculate saturation using HSL conversion
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Lightness
  const l = (max + min) / 2;
  
  // Saturation
  let s = 0;
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  }
  
  return s < 0.25; // Low saturation = neutral color
};

// Get color name from color object
export const getColorName = (colorObj, colorLibrary) => {
  if (typeof colorObj === 'string') {
    // If we just have a hex string, try to find it in our library
    const foundColor = colorLibrary.find(color => color.hex.toLowerCase() === colorObj.toLowerCase());
    return foundColor ? foundColor.name : 'Color';
  }
  // If we have a color object with a name property, return it
  return colorObj.name || 'Color';
};