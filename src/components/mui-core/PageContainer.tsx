'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export function PageContainer({ 
  children, 
  maxWidth = 'lg' 
}: PageContainerProps) {
  return (
    <StyledContainer maxWidth={maxWidth}>
      <Box sx={{ width: '100%' }}>
        {children}
      </Box>
    </StyledContainer>
  );
}