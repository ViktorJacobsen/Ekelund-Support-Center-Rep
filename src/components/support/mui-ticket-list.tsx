'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Skeleton,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActionArea
} from '@mui/material';
import { useAuth } from '@/lib/auth/auth-context';
import { SupportTicketsDB, SupportTicket, TicketStatus, TicketPriority } from '@/lib/offline/support-ticket-db';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import { styled } from '@mui/material/styles';

interface TicketListProps {
  onSelectTicket?: (ticket: SupportTicket) => void;
  filterUserTickets?: boolean;
  statusFilter?: TicketStatus[];
}

// Styled components för att skapa konsekvent styling
const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
}));

const MuiTicketList: React.FC<TicketListProps> = ({ 
  onSelectTicket,
  filterUserTickets = false,
  statusFilter
}) => {
  const { user } = useAuth();
  
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | ''>('');
  const [selectedPriority, setSelectedPriority] = useState<TicketPriority | ''>('');
  
  // Ladda ärenden
  useEffect(() => {
    loadTickets();
  }, [filterUserTickets, statusFilter, selectedStatus, selectedPriority, searchTerm, user]);
  
  // Hämta ärenden från databasen
  const loadTickets = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Bygg upp filter baserat på props och state
      const filter: any = {};
      
      // Applicera statusfilter från props eller state
      if (statusFilter) {
        filter.status = statusFilter;
      } else if (selectedStatus) {
        filter.status = selectedStatus;
      }
      
      // Prioritetsfilter
      if (selectedPriority) {
        filter.priority = selectedPriority;
      }
      
      // Filtrera på användarens egna ärenden om det är aktiverat
      if (filterUserTickets) {
        filter.createdBy = user.id;
      }
      
      // Sökfilter
      if (searchTerm.trim()) {
        filter.search = searchTerm.trim();
      }
      
      // Hämta ärenden med filter
      const ticketData = await SupportTicketsDB.getTickets(filter);
      setTickets(ticketData);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generera statustext och styling
  const getStatusInfo = (status: TicketStatus) => {
    const statusMap: Record<TicketStatus, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
      new: { 
        label: 'Ny', 
        color: 'info'
      },
      open: { 
        label: 'Öppen', 
        color: 'secondary'
      },
      inProgress: { 
        label: 'Pågår', 
        color: 'warning'
      },
      resolved: { 
        label: 'Löst', 
        color: 'success'
      },
      closed: { 
        label: 'Stängd', 
        color: 'default'
      }
    };
    
    return statusMap[status];
  };
  
  // Generera prioritetstext och styling
  const getPriorityInfo = (priority: TicketPriority) => {
    const priorityMap: Record<TicketPriority, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
      low: { 
        label: 'Låg', 
        color: 'default'
      },
      medium: { 
        label: 'Medium', 
        color: 'info'
      },
      high: { 
        label: 'Hög', 
        color: 'warning'
      },
      critical: { 
        label: 'Kritisk', 
        color: 'error'
      }
    };
    
    return priorityMap[priority];
  };
  
  // Formatera datum
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Visa laddningsskelett om vi laddar
  if (isLoading) {
    return (
      <Paper sx={{ p: 3, width: '100%' }} elevation={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="rectangular" width={160} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} key={i}>
              <Skeleton variant="rectangular" height={120} width="100%" />
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 3, width: '100%' }} elevation={1}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
        <Typography variant="h6" component="h2">
          {filterUserTickets ? 'Mina ärenden' : 'Supportärenden'}
          {tickets.length > 0 && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({tickets.length})
            </Typography>
          )}
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            placeholder="Sök ärenden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: { xs: '100%', sm: 220 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value as TicketStatus | '')}
              >
                <MenuItem value="">Alla statusar</MenuItem>
                <MenuItem value="new">Nya</MenuItem>
                <MenuItem value="open">Öppna</MenuItem>
                <MenuItem value="inProgress">Pågående</MenuItem>
                <MenuItem value="resolved">Lösta</MenuItem>
                <MenuItem value="closed">Stängda</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="priority-select-label">Prioritet</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={selectedPriority}
                label="Prioritet"
                onChange={(e) => setSelectedPriority(e.target.value as TicketPriority | '')}
              >
                <MenuItem value="">Alla prioriteter</MenuItem>
                <MenuItem value="low">Låg</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">Hög</MenuItem>
                <MenuItem value="critical">Kritisk</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      
      {/* Lista över ärenden */}
      {tickets.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <FolderIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Inga ärenden hittades
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filterUserTickets
              ? 'Du har inga aktiva supportärenden. Skapa ett nytt för att få hjälp.'
              : 'Inga ärenden matchar de valda filtren. Försök med andra sökkriterier.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {tickets.map((ticket) => {
            const statusInfo = getStatusInfo(ticket.status);
            const priorityInfo = getPriorityInfo(ticket.priority);
            
            return (
              <Grid item xs={12} key={ticket.id}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': onSelectTicket ? {
                      boxShadow: 3,
                      borderColor: 'primary.main'
                    } : {}
                  }}
                >
                  <CardActionArea 
                    onClick={() => onSelectTicket && onSelectTicket(ticket)}
                    disabled={!onSelectTicket}
                    sx={{ p: 2 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                        {ticket.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <StatusChip
                          size="small"
                          label={statusInfo.label}
                          color={statusInfo.color}
                        />
                        <StatusChip
                          size="small"
                          label={priorityInfo.label}
                          color={priorityInfo.color}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {ticket.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {ticket.tags.slice(0, 3).map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                        {ticket.tags.length > 3 && (
                          <Chip
                            label={`+${ticket.tags.length - 3}`}
                            size="small"
                            color="default"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          icon={<FolderIcon fontSize="small" />}
                          label={ticket.category}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                        <Chip
                          icon={<AccessTimeIcon fontSize="small" />}
                          label={formatDate(ticket.createdAt)}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );
};

export default MuiTicketList;