'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Import camera scanner component (we'll update this later)
import CameraScanner from './camera-scanner';
import { ExcelService } from '@/lib/utils/excel-service';

interface MeterReading {
  id: string;
  reading: string;
  timestamp: string;
  location?: string;
  notes?: string;
}

const MuiMeterForm: React.FC = () => {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [currentMeterId, setCurrentMeterId] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentNotes, setCurrentNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Hantera skanningsresultat
  const handleScanComplete = (result: string) => {
    setCurrentMeterId(result);
    setShowScanner(false);
  };
  
  // Lägg till ny mätaravläsning
  const addReading = () => {
    setError(null);
    
    // Validera inmatning
    if (!currentMeterId.trim()) {
      setError('Mätare-ID måste anges');
      return;
    }
    
    if (!currentReading.trim()) {
      setError('Mätarställning måste anges');
      return;
    }
    
    // Validera att mätarställningen är ett nummer
    if (isNaN(Number(currentReading))) {
      setError('Mätarställning måste vara ett nummer');
      return;
    }
    
    // Skapa ny avläsning
    const newReading: MeterReading = {
      id: currentMeterId,
      reading: currentReading,
      timestamp: new Date().toISOString(),
      location: currentLocation || undefined,
      notes: currentNotes || undefined
    };
    
    // Lägg till i listan
    setReadings([...readings, newReading]);
    
    // Återställ formuläret
    setCurrentMeterId('');
    setCurrentReading('');
    setCurrentLocation('');
    setCurrentNotes('');
  };
  
  // Ta bort en avläsning
  const removeReading = (index: number) => {
    const updatedReadings = [...readings];
    updatedReadings.splice(index, 1);
    setReadings(updatedReadings);
  };
  
  // Exportera avläsningar till CSV
  const exportToCSV = async () => {
    if (readings.length === 0) {
      setError('Inga avläsningar att exportera');
      return;
    }
    
    try {
      // Formatera data för CSV
      const formattedReadings = readings.map(reading => ({
        'Mätare-ID': reading.id,
        'Avläsning': reading.reading,
        'Tid': new Date(reading.timestamp).toLocaleString('sv-SE'),
        'Plats': reading.location || '',
        'Anteckningar': reading.notes || ''
      }));
      
      // Använd ExcelService för att exportera till CSV
      const date = new Date().toISOString().slice(0, 10);
      await ExcelService.jsonToCsv(formattedReadings, `mataravlasningar_${date}.csv`);
    } catch (error) {
      console.error('Export error:', error);
      setError('Kunde inte exportera avläsningar');
    }
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mätarinsamling
      </Typography>
      
      {/* Form for new reading */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
        <Typography variant="h6" component="h2" gutterBottom>
          Ny avläsning
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                label="Mätare-ID"
                value={currentMeterId}
                onChange={(e) => setCurrentMeterId(e.target.value)}
                fullWidth
                required
                placeholder="Ange eller skanna mätare-ID"
                variant="outlined"
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                onClick={() => setShowScanner(true)}
                startIcon={<CameraAltIcon />}
              >
                Skanna
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Mätarställning"
              value={currentReading}
              onChange={(e) => setCurrentReading(e.target.value)}
              fullWidth
              required
              type="number"
              placeholder="Ange avläst värde"
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Plats"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              fullWidth
              placeholder="Valfritt"
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Anteckningar"
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              fullWidth
              placeholder="Valfritt"
              variant="outlined"
            />
          </Grid>
        </Grid>
        
        <Button
          variant="contained"
          fullWidth
          onClick={addReading}
          startIcon={<AddIcon />}
          size="large"
        >
          Lägg till avläsning
        </Button>
      </Paper>
      
      {/* Readings list */}
      <Paper sx={{ p: 3 }} elevation={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2">
            Avläsningar
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={exportToCSV}
            disabled={readings.length === 0}
            startIcon={<FileDownloadIcon />}
          >
            Exportera
          </Button>
        </Box>
        
        {readings.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              Inga avläsningar registrerade
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Mätare-ID</TableCell>
                  <TableCell>Avläsning</TableCell>
                  <TableCell>Tid</TableCell>
                  <TableCell>Plats</TableCell>
                  <TableCell align="right">Åtgärd</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {readings.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell>{reading.id}</TableCell>
                    <TableCell>{reading.reading}</TableCell>
                    <TableCell>
                      {new Date(reading.timestamp).toLocaleString('sv-SE')}
                    </TableCell>
                    <TableCell>{reading.location || '-'}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeReading(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      
      {/* Camera scanner */}
      {showScanner && (
        <CameraScanner 
          onScanComplete={handleScanComplete} 
          onCancel={() => setShowScanner(false)} 
        />
      )}
    </Box>
  );
};

export default MuiMeterForm;