'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';

/**
 * BaseCard - Grundläggande kortkomponent för konsekvent styling
 */
interface BaseCardProps {
  children: React.ReactNode;
  elevation?: number;
  onClick?: () => void;
  className?: string;
  sx?: any;
}

export function BaseCard({
  children,
  elevation = 1,
  onClick,
  className,
  sx = {}
}: BaseCardProps) {
  return (
    <Card
      elevation={elevation}
      onClick={onClick}
      className={className}
      sx={{
        borderRadius: 2,
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        ...(onClick && {
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4
          }
        }),
        ...sx
      }}
    >
      {children}
    </Card>
  );
}

/**
 * DocumentCard - Ersätter ThemeCard för dokument
 */
interface DocumentCardProps {
  title: string;
  type: 'pdf' | 'manual' | 'guide' | 'datasheet' | 'other';
  date: string;
  description?: string;
  tags?: string[];
  onClick?: () => void;
  elevation?: number;
}

export function DocumentCard({
  title,
  type,
  date,
  description,
  tags = [],
  onClick,
  elevation = 1
}: DocumentCardProps) {
  // Bestäm vilken ikon som ska användas baserat på dokumenttyp
  const getTypeIcon = () => {
    switch (type) {
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
  
  // Bestäm färg baserat på typ
  const getTypeColor = () => {
    switch (type) {
      case 'pdf':
        return 'error.main';
      case 'manual':
        return 'info.main';
      case 'guide':
        return 'success.main';
      case 'datasheet':
        return 'warning.main';
      default:
        return 'primary.main';
    }
  };
  
  return (
    <BaseCard onClick={onClick} elevation={elevation}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getTypeColor() }}>
            {getTypeIcon()}
          </Avatar>
        }
        action={
          <Typography variant="caption" color="text.secondary" sx={{ pt: 1 }}>
            {date}
          </Typography>
        }
        title={title}
        titleTypographyProps={{ variant: 'subtitle1', noWrap: true, fontWeight: 'medium' }}
        sx={{ pb: description ? 0 : 1 }}
      />
      
      {description && (
        <CardContent sx={{ py: 1 }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {description}
          </Typography>
        </CardContent>
      )}
      
      {tags.length > 0 && (
        <CardContent sx={{ pt: 0, pb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.slice(0, 3).map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  // Hantering för taggar kan läggas till här
                }}
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {tags.length > 3 && (
              <Chip
                label={`+${tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </CardContent>
      )}
    </BaseCard>
  );
}

/**
 * CategoryCard - Ersätter CategoryCard 
 */
interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  href: string;
  onClick?: () => void;
  elevation?: number;
}

export function CategoryCard({
  title,
  icon,
  count,
  href,
  onClick,
  elevation = 1
}: CategoryCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };
  
  return (
    <BaseCard onClick={handleClick} elevation={elevation}>
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            mb: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          {icon}
        </Box>
        
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 0.5,
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {count} dokument
        </Typography>
      </CardContent>
    </BaseCard>
  );
}

/**
 * StatsCard - Kort för statistik och mätvärden
 */
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  onClick?: () => void;
  elevation?: number;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  onClick,
  elevation = 1
}: StatsCardProps) {
  // Skapa färg baserat på trend
  const getTrendColor = () => {
    if (!trend) return 'text.secondary';
    
    switch (trend.direction) {
      case 'up':
        return 'success.main';
      case 'down':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };
  
  return (
    <BaseCard onClick={onClick} elevation={elevation}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: 'primary.main' }}>
              {icon}
            </Box>
          )}
        </Box>
        
        <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>
          {value}
        </Typography>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box 
              component="span" 
              sx={{ 
                color: getTrendColor(),
                display: 'flex',
                alignItems: 'center',
                mr: 1
              }}
            >
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
              {trend.value}%
            </Box>
            {description && (
              <Typography variant="caption" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
        )}
        
        {!trend && description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </BaseCard>
  );
}

/**
 * GuideCard - Kort för guider och instruktioner
 */
interface GuideCardProps {
  title: string;
  items: Array<{
    title: string;
    views: number;
    time: string;
  }>;
  icon?: React.ReactNode;
  onItemClick?: (index: number) => void;
  onViewAllClick?: () => void;
  elevation?: number;
}

export function GuideCard({
  title,
  items,
  icon,
  onItemClick,
  onViewAllClick,
  elevation = 1
}: GuideCardProps) {
  return (
    <BaseCard elevation={elevation}>
      <CardHeader
        avatar={
          icon ? (
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {icon}
            </Avatar>
          ) : undefined
        }
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
      />
      
      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={1.5}>
          {items.map((item, index) => (
            <Box 
              key={index}
              onClick={() => onItemClick && onItemClick(index)}
              sx={{
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                cursor: onItemClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                '&:hover': onItemClick ? {
                  borderColor: 'primary.main',
                  transform: 'translateX(4px)',
                  boxShadow: 1
                } : {}
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </Box>
                <Typography variant="subtitle2" noWrap sx={{ flex: 1 }}>
                  {item.title}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', pl: 5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                  {item.views} visningar
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.time} läsning
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
      
      {onViewAllClick && (
        <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={onViewAllClick}
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Visa alla
          </Button>
        </CardActions>
      )}
    </BaseCard>
  );
}

/**
 * ActivityCard - Kort för aktiviteter och uppdateringar
 */
interface ActivityCardProps {
  title: string;
  activities: Array<{
    title: string;
    description: string;
    type: string;
    user: string;
    time: string;
  }>;
  onActivityClick?: (index: number) => void;
  elevation?: number;
}

export function ActivityCard({
  title,
  activities,
  onActivityClick,
  elevation = 1
}: ActivityCardProps) {
  // Funktion för att välja ikon baserat på aktivitetstyp
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <ArticleIcon />;
      case 'guide':
        return <MenuBookIcon />;
      default:
        return <DescriptionIcon />;
    }
  };
  
  return (
    <BaseCard elevation={elevation}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
      />
      
      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={2}>
          {activities.map((activity, index) => (
            <Box 
              key={index}
              onClick={() => onActivityClick && onActivityClick(index)}
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1,
                cursor: onActivityClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                '&:hover': onActivityClick ? {
                  transform: 'translateX(4px)',
                  boxShadow: 1
                } : {}
              }}
            >
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Box 
                  sx={{ 
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="subtitle2" noWrap sx={{ maxWidth: '80%' }}>
                      {activity.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    {activity.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="caption" color="primary">
                      Uppdaterad av {activity.user}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </BaseCard>
  );
}

export default {
  BaseCard,
  DocumentCard,
  CategoryCard,
  StatsCard,
  GuideCard,
  ActivityCard
};