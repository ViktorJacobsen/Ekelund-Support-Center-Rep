'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import Fade from '@mui/material/Fade';

// Icons som används i komponenterna
import InfoIcon from '@mui/icons-material/Info';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * MuiButton - Ersätter ThemeButton
 * 
 * Mappning av varianter:
 * - primary -> contained
 * - secondary -> outlined
 * - outline -> outlined
 * - ghost -> text
 * - link -> text (med underline styling)
 */
export function MuiButton({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  ...props 
}: React.ComponentProps<typeof Button> & { isLoading?: boolean }) {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      startIcon={isLoading ? undefined : startIcon}
      endIcon={isLoading ? undefined : endIcon}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        boxShadow: variant === 'contained' ? 1 : 'none',
        ...props.sx
      }}
    >
      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              mr: 1,
              border: '2px solid',
              borderColor: 'inherit',
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
          {typeof children === 'string' ? 'Laddar...' : children}
        </Box>
      ) : (
        children
      )}
    </Button>
  );
}

/**
 * MuiDocumentCard - Ersätter DocumentCard
 * 
 * En anpassad variant av Card som används för dokumentvisning
 */
interface MuiDocumentCardProps {
  title: string;
  type: string;
  date: string;
  description?: string;
  tags?: string[];
  onClick?: () => void;
  elevation?: number;
}

/**
 * MuiDocumentCard - Ersätter DocumentCard
 */
export function MuiDocumentCard({
  title,
  type,
  date,
  description,
  tags = [],
  onClick,
  elevation = 1
}: MuiDocumentCardProps) {
  // Bestäm vilken ikon som ska användas baserat på dokumenttyp
  const getTypeIcon = () => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'manual':
        return <MenuBookIcon />;
      case 'guide':
        return <DescriptionIcon />;
      default:
        return <ArticleIcon />;
    }
  };
  
  return (
    <Card 
      elevation={elevation}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: 4
        } : {},
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {getTypeIcon()}
          </Avatar>
        }
        action={
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        }
        title={title}
        titleTypographyProps={{ variant: 'h6', noWrap: true }}
        sx={{ pb: 0 }}
      />
      <CardContent>
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {description}
          </Typography>
        )}
        
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {tags.slice(0, 3).map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  // Implementera taghantering här om det behövs
                }}
              />
            ))}
            {tags.length > 3 && (
              <Chip
                label={`+${tags.length - 3}`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * MuiSearchField - Ersätter sökinput
 */
interface MuiSearchFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
}

export function MuiSearchField({
  placeholder = "Sök...",
  value,
  onChange,
  onSearch,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium'
}: MuiSearchFieldProps) {
  // Hantera Enter-tangent
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };
  
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton 
              edge="end" 
              onClick={() => onChange('')}
              size="small"
            >
              <Fade in={true}>
                <div>×</div>
              </Fade>
            </IconButton>
          </InputAdornment>
        ) : null,
        sx: {
          borderRadius: 2,
          '&.MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px',
            },
          }
        }
      }}
    />
  );
}

/**
 * MuiStatusBadge - Ersätter StatusBadge
 */
interface MuiStatusBadgeProps {
  status: 'online' | 'offline' | 'syncing' | 'error' | 'warning' | 'success' | 'neutral';
  text?: string;
  size?: 'small' | 'medium';
  animate?: boolean;
}

export function MuiStatusBadge({
  status,
  text,
  size = 'medium',
  animate = false
}: MuiStatusBadgeProps) {
  // Mappa status till färger och text
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return { color: 'success', label: 'Online' };
      case 'offline':
        return { color: 'error', label: 'Offline' };
      case 'syncing':
        return { color: 'info', label: 'Synkroniserar' };
      case 'error':
        return { color: 'error', label: 'Fel' };
      case 'warning':
        return { color: 'warning', label: 'Varning' };
      case 'success':
        return { color: 'success', label: 'Framgång' };
      case 'neutral':
      default:
        return { color: 'default', label: 'Neutral' };
    }
  };
  
  const config = getStatusConfig();
  const displayText = text || config.label;
  
  // Om det inte ska vara text, skapa en enkel badge
  if (!text) {
    return (
      <Box
        sx={{
          display: 'inline-block',
          width: size === 'small' ? 8 : 12,
          height: size === 'small' ? 8 : 12,
          borderRadius: '50%',
          bgcolor: `${config.color}.main`,
          ...(animate ? {
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.4 },
              '100%': { opacity: 1 }
            }
          } : {})
        }}
      />
    );
  }
  
  // Returnera badge med text
  return (
    <Chip
      label={displayText}
      size={size}
      color={config.color as any}
      sx={{
        borderRadius: '16px',
        ...(animate ? {
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.8 },
            '100%': { opacity: 1 }
          }
        } : {})
      }}
    />
  );
}