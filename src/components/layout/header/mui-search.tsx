'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Container,
  Paper,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Styled components för animationer
const AnimatedContainer = styled(Box)(({ theme }) => ({
  transition: 'all 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  }
}));

interface SearchProps {
  placeholder?: string;
  tags?: string[];
  onSearch?: (query: string) => void;
}

export default function MuiSearch({ 
  placeholder = "Sök efter dokumentation, guider eller verktyg...",
  tags = ["Installation", "Felsökning", "Konfiguration", "Manualer"],
  onSearch 
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    if (onSearch) {
      onSearch(tag);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
      <AnimatedContainer>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          fontWeight: 600, 
          transition: 'all 0.5s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}>
          Hitta information du behöver
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: '780px', mx: 'auto' }}>
          Sök i manualer, how-to guider och dokument i Ekelund Support Center
        </Typography>
      </AnimatedContainer>
      
      <form onSubmit={handleSearch}>
        <Box sx={{ 
          position: 'relative', 
          maxWidth: '780px', 
          mx: 'auto',
          transform: 'translateZ(0)',
          transition: 'all 0.5s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 5
          }
        }}>
          <TextField
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                height: 64,
                '& fieldset': {
                  borderWidth: 2,
                }
              },
              '& .MuiInputBase-input': {
                pl: 6
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 1.5 }}>
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </form>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 3 }}>
        {tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            variant="outlined"
            color="primary"
            onClick={() => handleTagClick(tag)}
            sx={{ 
              m: 0.5, 
              px: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 1
              }
            }}
          />
        ))}
      </Box>
    </Container>
  );
}