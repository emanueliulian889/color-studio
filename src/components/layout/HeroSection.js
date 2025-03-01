import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SearchInput from '../ui/SearchInput';
import CategoryChips from '../ui/CategoryChips';
import { categories } from '../../constants/categories';

const HeroSection = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, generateNewColors }) => {
  return (
    <Box 
      sx={{ 
        py: 5
      }}
      className="hero-background"
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'black' }}
        >
          Discover Beautiful Color Palettes
        </Typography>
        <Typography 
          variant="h6" 
          component="h2" 
          align="center" 
          color="black" 
          paragraph
          sx={{ mb: 4 }}
        >
          Find the perfect colors for your next project
        </Typography>
        
        <SearchInput 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          generateNewColors={generateNewColors}
        />
        
        <CategoryChips 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
        />
      </Container>
    </Box>
  );
};

export default HeroSection;