'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaunchIcon from '@mui/icons-material/Launch';
import FolderIcon from '@mui/icons-material/Folder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';

/**
 * MuiDataTable - Ersätter anpassade tabeller med MUI Table
 */
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string | React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  loading?: boolean;
  pagination?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: any) => void;
  hoverable?: boolean;
  size?: 'small' | 'medium';
  dense?: boolean;
  maxHeight?: number | string;
}

export function DataTable({
  columns,
  rows,
  loading = false,
  pagination = false,
  emptyMessage = 'Inga data hittades',
  onRowClick,
  hoverable = true,
  size = 'medium',
  dense = false,
  maxHeight,
}: DataTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Visa laddningsskelet
  if (loading) {
    return (
      <Paper elevation={0} variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight }}>
          <Table stickyHeader size={size}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      <Skeleton animation="wave" height={24} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  // Om det inte finns några rader
  if (rows.length === 0) {
    return (
      <Alert severity="info" sx={{ width: '100%' }}>
        {emptyMessage}
      </Alert>
    );
  }

  // Bestäm vilka rader som ska visas med paginering
  const displayedRows = pagination
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows;

  return (
    <Paper elevation={0} variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader size={size} padding={dense ? 'none' : 'normal'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                hover={hoverable}
                tabIndex={-1}
                key={row.id || index}
                onClick={() => onRowClick && onRowClick(row)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rader per sida:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} av ${count}`}
        />
      )}
    </Paper>
  );
}

/**
 * SearchResultItem - Ersätter SearchResults för enhetlig styling
 */
interface SearchResultItemProps {
  title: string;
  type: 'pdf' | 'manual' | 'guide' | 'datasheet' | 'other';
  date: string | Date;
  description?: string;
  tags?: string[];
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
}

export function SearchResultItem({
  title,
  type,
  date,
  description,
  tags = [],
  onClick,
  onTagClick,
}: SearchResultItemProps) {
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

  // Formatera datum
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'flex-start',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick
          ? {
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
              boxShadow: 1,
            }
          : {},
      }}
      onClick={onClick}
    >
      <Avatar
        sx={{
          bgcolor: getTypeColor(),
          mr: 2,
        }}
      >
        {getTypeIcon()}
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight="medium" component="h3">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {typeof date === 'string' ? date : formatDate(date)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: description ? 1 : 0 }}>
          <Chip
            size="small"
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            color={
              type === 'pdf'
                ? 'error'
                : type === 'manual'
                ? 'info'
                : type === 'guide'
                ? 'success'
                : 'default'
            }
            variant="outlined"
            sx={{ mr: 1 }}
          />
        </Box>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: tags.length > 0 ? 2 : 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>
        )}

        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.slice(0, 3).map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
                onClick={(e) => {
                  if (onTagClick) {
                    e.stopPropagation();
                    onTagClick(tag);
                  }
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
        )}
      </Box>
    </Paper>
  );
}

/**
 * SearchResults - Container för sökresultat
 */
interface SearchResultsProps {
  results: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  onResultClick?: (result: any) => void;
  onTagClick?: (tag: string) => void;
  renderItem?: (item: any) => React.ReactNode;
}

export function SearchResults({
  results,
  isLoading = false,
  emptyMessage = 'Inga resultat hittades',
  onResultClick,
  onTagClick,
  renderItem,
}: SearchResultsProps) {
  // Visa laddningsindikator
  if (isLoading) {
    return (
      <Box sx={{ width: '100%', py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Skeleton variant="circular" width={64} height={64} sx={{ mb: 2 }} />
          <Skeleton width={200} height={32} sx={{ mb: 1 }} />
          <Skeleton width={300} height={20} />
        </Box>
        <Stack spacing={2} sx={{ mt: 4 }}>
          {Array.from(new Array(3)).map((_, index) => (
            <Paper key={index} elevation={0} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
                  <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
                  <Skeleton width="40%" height={24} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    );
  }

  // Om det inte finns några resultat
  if (results.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          width: '100%',
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'action.selected',
            width: 64,
            height: 64,
            mb: 2,
          }}
        >
          <SearchIcon fontSize="large" color="disabled" />
        </Avatar>
        <Typography variant="h6" component="h2" gutterBottom>
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prova att söka med andra sökord eller taggar
        </Typography>
      </Box>
    );
  }

  // Med anpassad rendering
  if (renderItem) {
    return <>{results.map((item, index) => renderItem(item))}</>;
  }

  // Standard rendering
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {results.map((result, index) => (
        <SearchResultItem
          key={result.id || index}
          title={result.title}
          type={result.type || 'other'}
          date={result.updatedAt || result.date}
          description={result.description}
          tags={result.tags || []}
          onClick={() => onResultClick && onResultClick(result)}
          onTagClick={onTagClick}
        />
      ))}
    </Stack>
  );
}

/**
 * StatusDisplay - Visar statusindikatorer
 */
interface StatusDisplayProps {
  status: 'online' | 'offline' | 'syncing' | 'error' | 'warning' | 'success' | 'neutral';
  label?: string;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function StatusDisplay({
  status,
  label,
  showText = true,
  size = 'medium',
}: StatusDisplayProps) {
  // Bestäm färg baserat på status
  const getStatusColor = () => {
    switch (status) {
      case 'online':
      case 'success':
        return 'success';
      case 'offline':
      case 'error':
        return 'error';
      case 'syncing':
        return 'primary';
      case 'warning':
        return 'warning';
      case 'neutral':
      default:
        return 'default';
    }
  };

  // Bestäm standardtext om ingen label angavs
  const getStatusText = () => {
    if (label) return label;
    
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'syncing': return 'Synkroniserar';
      case 'error': return 'Fel';
      case 'warning': return 'Varning';
      case 'success': return 'Framgång';
      case 'neutral': return 'Neutral';
      default: return '';
    }
  };

  // Bestäm storlek på indikatorn
  const getSize = () => {
    switch (size) {
      case 'small': return { size: 8, px: 1, py: 0.5 };
      case 'large': return { size: 14, px: 1.5, py: 0.75 };
      default: return { size: 10, px: 1, py: 0.5 };
    }
  };

  const { size: dotSize, px, py } = getSize();
  const color = getStatusColor();
  
  // Bara en prick utan text
  if (!showText) {
    return (
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          bgcolor: `${color}.main`,
          boxShadow: status === 'syncing' ? theme => `0 0 0 2px ${theme.palette.background.paper}` : 'none',
          animation: status === 'syncing' ? 'pulse 1.5s infinite' : 'none',
          '@keyframes pulse': {
            '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)' },
            '70%': { boxShadow: '0 0 0 6px rgba(25, 118, 210, 0)' },
            '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' },
          },
        }}
      />
    );
  }

  // Med text
  return (
    <Chip
      size={size === 'large' ? 'medium' : 'small'}
      label={getStatusText()}
      color={color}
      sx={{
        px,
        py,
        '& .MuiChip-avatar': {
          width: dotSize,
          height: dotSize,
          bgcolor: `${color}.main`,
        },
      }}
      avatar={
        <Box
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            bgcolor: `${color}.main`,
            animation: status === 'syncing' ? 'pulse 1.5s infinite' : 'none',
          }}
        />
      }
    />
  );
}

/**
 * DocumentListItem - Enkel listitem för dokument
 */
interface DocumentListItemProps {
  title: string;
  type: string;
  date: string;
  onClick?: () => void;
}

export function DocumentListItem({ title, type, date, onClick }: DocumentListItemProps) {
  // Icon based on type
  const getTypeIcon = () => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'manual':
        return <MenuBookIcon color="info" />;
      case 'guide':
        return <DescriptionIcon color="success" />;
      default:
        return <ArticleIcon color="primary" />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        px: 2,
        borderRadius: 1,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        mb: 1,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick ? {
          borderColor: 'primary.main',
          transform: 'translateX(4px)',
        } : {},
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 2 }}>{getTypeIcon()}</Box>
        <Typography variant="body2" noWrap sx={{ maxWidth: 250 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {date}
      </Typography>
    </Box>
  );
}

export default {
  DataTable,
  SearchResultItem,
  SearchResults,
  StatusDisplay,
  DocumentListItem
};