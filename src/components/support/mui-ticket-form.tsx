'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '@/lib/auth/auth-context';
import { SupportTicketsDB, TicketPriority } from '@/lib/offline/support-ticket-db';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface TicketFormProps {
  onSubmitSuccess?: (ticketId: string) => void;
  onCancel?: () => void;
}

const MuiTicketForm: React.FC<TicketFormProps> = ({ 
  onSubmitSuccess, 
  onCancel 
}) => {
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Kategorier att välja bland
  const categories = [
    'Programvara',
    'Hårdvara',
    'Nätverk',
    'Dokumentation',
    'Felrapport',
    'Förfrågan',
    'Övrigt'
  ];
  
  // Lägg till en tagg
  const addTag = () => {
    const tag = tagInput.trim();
    
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };
  
  // Ta bort en tagg
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Hantera tag input med Enter
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Skicka in ärendet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validera formuläret
    if (!title.trim()) {
      setError('Titel måste anges');
      return;
    }
    
    if (!description.trim()) {
      setError('Beskrivning måste anges');
      return;
    }
    
    if (!category) {
      setError('Kategori måste väljas');
      return;
    }
    
    if (!user) {
      setError('Du måste vara inloggad för att skapa ett ärende');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Skapa ärendet i databasen
      const ticketId = await SupportTicketsDB.createTicket({
        title,
        description,
        status: 'new',
        priority,
        createdBy: user.id,
        category,
        tags,
        attachments: []
      });
      
      // Återställ formuläret
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('medium');
      setTags([]);
      
      // Anropa success-callback
      if (onSubmitSuccess) {
        onSubmitSuccess(ticketId);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Ett fel uppstod när ärendet skulle skapas. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3 }} elevation={1}>
      <Typography variant="h5" component="h2" gutterBottom>
        Skapa nytt supportärende
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Titel */}
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              fullWidth
              required
              placeholder="Kortfattad beskrivning av ditt ärende"
            />
          </Grid>
          
          {/* Beskrivning */}
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Beskrivning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              multiline
              rows={5}
              fullWidth
              required
              placeholder="Beskriv ditt ärende i detalj. Vad har du försökt? Vilka felmeddelanden ser du?"
            />
          </Grid>
          
          {/* Kategori och Prioritet */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">Kategori</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Kategori"
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              >
                <MenuItem value="">Välj kategori</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Prioritet</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                value={priority}
                label="Prioritet"
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                disabled={isSubmitting}
              >
                <MenuItem value="low">Låg</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">Hög</MenuItem>
                <MenuItem value="critical">Kritisk</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Taggar */}
          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Taggar
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={isSubmitting}
                  placeholder="Lägg till tagg och tryck Enter"
                  fullWidth
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={addTag}
                  disabled={isSubmitting || !tagInput.trim()}
                  startIcon={<AddIcon />}
                >
                  Lägg till
                </Button>
              </Box>
            </Box>
            
            {tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    color="primary"
                    onDelete={() => removeTag(tag)}
                    disabled={isSubmitting}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
              </Box>
            )}
          </Grid>
          
          {/* Knappar */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              {onCancel && (
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Avbryt
                </Button>
              )}
              
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
              >
                {isSubmitting ? 'Skickar...' : 'Skicka ärende'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MuiTicketForm;