'use client';

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// Utökad ButtonProps med våra egna tillägg
interface BaseButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'gradient';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  tooltip?: string;
}

// Gradient-knappen kräver särskild styling som inte finns i MUI
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'var(--gradient)',
  color: '#ffffff',
  '&:hover': {
    background: 'var(--gradient)',
    filter: 'brightness(110%)',
    boxShadow: theme.shadows[4],
  },
}));

/**
 * PrimaryButton - Ersätter ThemeButton med variant="primary"
 */
export function PrimaryButton({
  children,
  isLoading = false,
  icon,
  iconPosition = 'left',
  tooltip,
  ...props
}: BaseButtonProps) {
  // Konvertera vår variant till MUI variant
  const getMuiVariant = () => {
    switch (props.variant) {
      case 'secondary':
        return 'outlined';
      case 'outline':
        return 'outlined';
      case 'ghost':
      case 'link':
        return 'text';
      case 'gradient':
        return undefined; // Hanteras separat
      default:
        return 'contained';
    }
  };

  // Konvertera vår variant till MUI color
  const getMuiColor = () => {
    switch (props.variant) {
      case 'destructive':
        return 'error';
      default:
        return 'primary';
    }
  };

  // Skapa base button med eller utan loading
  const BaseButtonComponent = isLoading ? LoadingButton : Button;

  // Skapa knappen
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <Box component="span" sx={{ mr: 1, display: 'flex' }}>
          {icon}
        </Box>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Box component="span" sx={{ ml: 1, display: 'flex' }}>
          {icon}
        </Box>
      )}
    </>
  );

  // Om vi använder gradient, använd den speciella komponenten
  if (props.variant === 'gradient') {
    const buttonElement = (
      <GradientButton
        {...props}
        disabled={isLoading || props.disabled}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          ...props.sx
        }}
      >
        {buttonContent}
      </GradientButton>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip}>
          {buttonElement}
        </Tooltip>
      );
    }
    return buttonElement;
  }

  // Vanlig knapp
  const buttonElement = (
    <BaseButtonComponent
      {...props}
      variant={getMuiVariant()}
      color={getMuiColor()}
      loading={isLoading}
      disabled={isLoading || props.disabled}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 500,
        ...(props.variant === 'link' && {
          '&:hover': {
            textDecoration: 'underline',
            background: 'transparent',
          },
        }),
        ...props.sx
      }}
    >
      {buttonContent}
    </BaseButtonComponent>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {buttonElement}
      </Tooltip>
    );
  }
  return buttonElement;
}

/**
 * IconButtonWithTooltip - Ersätter ikonknappen med tooltip
 */
interface IconButtonWithTooltipProps extends IconButtonProps {
  tooltip?: string;
  isLoading?: boolean;
}

export function IconButtonWithTooltip({
  children,
  tooltip,
  isLoading = false,
  ...props
}: IconButtonWithTooltipProps) {
  const buttonElement = (
    <IconButton
      {...props}
      disabled={isLoading || props.disabled}
      sx={{
        borderRadius: '50%',
        ...props.sx
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: 24,
            height: 24,
            border: '2px solid',
            borderColor: 'currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        />
      ) : (
        children
      )}
    </IconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {buttonElement}
      </Tooltip>
    );
  }
  return buttonElement;
}

/**
 * MuiButton - Generell komponent som kan ersätta ThemeButton 
 * med mappning från eget tema till MUI
 */
export function MuiButton(props: BaseButtonProps) {
  return <PrimaryButton {...props} />;
}

export default {
  MuiButton,
  PrimaryButton,
  IconButtonWithTooltip
};