'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import MuiTicketList from '@/components/support/mui-ticket-list';
import MuiTicketForm from '@/components/support/mui-ticket-form';
import { useAuth } from '@/lib/auth/auth-context';
import { SupportTicket } from '@/lib/offline/support-ticket-db';

// Icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function SupportTicketsPage() {
  const theme = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  
  // Omdirigera om användaren inte är inloggad
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Hantera skapande av nytt ärende
  const handleTicketCreated = (ticketId: string) => {
    setShowNewTicketForm(false);
    // Här kan vi ladda om listan eller visa det nya ärendet
  };
  
  // Växla till att visa formulär för nytt ärende
  const toggleNewTicketForm = () => {
    setShowNewTicketForm(!showNewTicketForm);
    setSelectedTicket(null);
  };
  
  // Hantera val av ärende
  const handleSelectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowNewTicketForm(false);
  };
  
  // Visa laddningsindikator om vi kontrollerar autentisering
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // Om användaren inte är autentiserad, visa ingenting (redirect hanteras av useEffect)
  if (!isAuthenticated) {
    return null;
  }
  
  // Visa detaljvy för valt ärende
  if (selectedTicket) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => setSelectedTicket(null)}
          sx={{ mb: 3 }}
        >
          Tillbaka till listan
        </Button>
        
        <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {selectedTicket.title}
            </Typography>
            <Chip 
              label={selectedTicket.status === 'new' ? 'Ny' : 
                     selectedTicket.status === 'open' ? 'Öppen' : 
                     selectedTicket.status === 'inProgress' ? 'Pågår' : 
                     selectedTicket.status === 'resolved' ? 'Löst' : 'Stängd'}
              color={selectedTicket.status === 'new' ? 'info' : 
                     selectedTicket.status === 'open' ? 'secondary' :
                     selectedTicket.status === 'inProgress' ? 'warning' :
                     selectedTicket.status === 'resolved' ? 'success' : 'default'}
            />
          </Box>
          
          <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line', mb: 4 }}>
            {selectedTicket.description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {selectedTicket.tags.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
          
          <Grid container spacing={3} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary" display="block">
                Status
              </Typography>
              <Typography variant="body2">
                {selectedTicket.status === 'new' ? 'Ny' : 
                 selectedTicket.status === 'open' ? 'Öppen' : 
                 selectedTicket.status === 'inProgress' ? 'Pågår' : 
                 selectedTicket.status === 'resolved' ? 'Löst' : 'Stängd'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary" display="block">
                Prioritet
              </Typography>
              <Typography variant="body2">
                {selectedTicket.priority === 'low' ? 'Låg' : 
                 selectedTicket.priority === 'medium' ? 'Medium' : 
                 selectedTicket.priority === 'high' ? 'Hög' : 'Kritisk'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary" display="block">
                Kategori
              </Typography>
              <Typography variant="body2">{selectedTicket.category}</Typography>
            </Grid>
          </Grid>
          
          {/* Här skulle vi kunna visa kommentarer och kommentarsformulär */}
        </Paper>
      </Container>
    );
  }
  
  // Visa sidan för att skapa nytt ärende
  if (showNewTicketForm) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Skapa nytt ärende
          </Typography>
          <Button
            variant="outlined"
            onClick={toggleNewTicketForm}
          >
            Avbryt
          </Button>
        </Box>
        
        <MuiTicketForm 
          onSubmitSuccess={handleTicketCreated}
          onCancel={toggleNewTicketForm}
        />
      </Container>
    );
  }
  
  // Visa standard-sidan med ärendelistor
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Supportärenden
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hantera supportärenden och få hjälp med tekniska problem.
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={toggleNewTicketForm}
        >
          Nytt ärende
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <MuiTicketList 
            onSelectTicket={handleSelectTicket}
            filterUserTickets={user?.role !== 'admin'} // Filtrera på användarens egna ärenden om inte admin
          />
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
            <Typography variant="h6" gutterBottom>
              Mina ärenden
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <MuiTicketList 
                onSelectTicket={handleSelectTicket}
                filterUserTickets={true} // Visa alltid användarens egna ärenden här
                statusFilter={['new', 'open', 'inProgress']} // Visa bara aktiva ärenden
              />
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3 }} elevation={1}>
            <Typography variant="h6" gutterBottom>
              Snabbhjälp
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Skapa ett nytt ärende med knappen ovan"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Beskriv ditt problem så detaljerat som möjligt"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Du får ett svar inom 24 timmar"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}