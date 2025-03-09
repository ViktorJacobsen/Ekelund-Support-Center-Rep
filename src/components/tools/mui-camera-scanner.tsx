'use client';

import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

// Import Icons
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';

// Anpassad scanner-funktionalitet
import { meterScanner } from '@/lib/utils/meter-scanner';

interface CameraScannerProps {
  onScanComplete: (result: string) => void;
  onCancel: () => void;
}

// Stylad video-container för kameraströmmen
const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: 'black',
  aspectRatio: '4/3',
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

// Stylad overlay med scanner riktlinjer
const ScannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  '& .scanner-guide': {
    border: '2px solid rgba(255, 255, 255, 0.6)',
    borderRadius: theme.shape.borderRadius,
    width: '75%',
    height: '33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  '& .guide-text': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem'
  }
}));

// Scanningslager som visas när bilden analyseras
const ScanningOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0, 
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}));

const MuiCameraScanner: React.FC<CameraScannerProps> = ({ 
  onScanComplete, 
  onCancel 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // Initialisera kameran när komponenten laddas
  useEffect(() => {
    startCamera();
    
    // Städa upp när komponenten avmonteras
    return () => {
      stopCamera();
    };
  }, []);
  
  // Starta kameran och begär tillstånd
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Använd bakre kameran om tillgänglig
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
        setIsCameraActive(true);
        setHasCameraPermission(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      if ((error as Error).name === 'NotAllowedError') {
        setErrorMessage('Kameratillstånd nekades. Vänligen ge tillstånd och försök igen.');
        setHasCameraPermission(false);
      } else {
        setErrorMessage('Kunde inte komma åt kameran. Kontrollera att den är ansluten och tillgänglig.');
        setHasCameraPermission(false);
      }
    }
  };
  
  // Stoppa kameran och frigör resurser
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  };
  
  // Ta en bild från kameraströmmen
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      setErrorMessage('Kameran är inte tillgänglig.');
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Ställ in canvas-storlek för att matcha videoströmmen
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Rita videobildrutor på canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Konvertera canvas till dataURL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setImageSrc(imageDataUrl);
      
      // Pausa videoströmmen
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.enabled = false);
      }
      
      // Skanna bilden
      scanImage(imageDataUrl);
    }
  };
  
  // Skanna bilden med Tesseract OCR
  const scanImage = async (imageData: string) => {
    setIsScanning(true);
    setErrorMessage(null);
    
    try {
      // Initialisera OCR om det behövs
      if (!meterScanner) {
        throw new Error('OCR-systemet kunde inte initialiseras.');
      }
      
      // Utför OCR på bilden
      const result = await meterScanner.scanImage(imageData);
      
      // Uppdatera resultatet
      setScanResult(result);
    } catch (error) {
      console.error('Scanning error:', error);
      setErrorMessage((error as Error).message || 'Kunde inte läsa mätaren. Försök igen med bättre belysning.');
    } finally {
      setIsScanning(false);
    }
  };
  
  // Återuppta kameraströmmen
  const resumeCamera = () => {
    setScanResult(null);
    setImageSrc(null);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.enabled = true);
    }
  };
  
  // Acceptera det skannade resultatet
  const acceptResult = () => {
    if (scanResult) {
      onScanComplete(scanResult);
    }
  };
  
  // Be om kameratillstånd igen
  const requestCameraPermission = () => {
    setErrorMessage(null);
    startCamera();
  };

  // Visa dialog för permissions-fel
  if (errorMessage && !hasCameraPermission) {
    return (
      <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Kameratillstånd krävs</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <CameraAltIcon color="disabled" sx={{ fontSize: 64, mb: 2 }} />
            <DialogContentText>{errorMessage}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="inherit">Avbryt</Button>
          <Button onClick={requestCameraPermission} variant="contained">Tillåt kamera</Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Visa resultatskärmen om vi har skannat
  if (scanResult && imageSrc) {
    return (
      <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Skanningsresultat</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <img 
              src={imageSrc} 
              alt="Skannad bild" 
              style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
            />
            
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Avläst mätare-ID:
              </Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'medium', letterSpacing: 1 }}>
                {scanResult}
              </Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<ReplayIcon />} onClick={resumeCamera}>Skanna igen</Button>
          <Button 
            startIcon={<CheckCircleIcon />} 
            variant="contained" 
            onClick={acceptResult} 
            color="primary"
          >
            Acceptera
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Visa kameravy
  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Skanna mätare-ID</DialogTitle>
      <DialogContent>
        <VideoContainer>
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            onCanPlay={() => setIsCameraActive(true)}
          />
          
          {/* Guidelines för att hjälpa användaren rikta kameran */}
          <ScannerOverlay>
            <div className="scanner-guide">
              <div className="guide-text">
                Placera mätare-ID i rutan
              </div>
            </div>
          </ScannerOverlay>
          
          {/* Loading overlay */}
          {isScanning && (
            <ScanningOverlay>
              <CircularProgress color="inherit" size={40} sx={{ mb: 2 }} />
              <Typography>Analyserar...</Typography>
            </ScanningOverlay>
          )}
          
          {/* Hidden canvas for image capture */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </VideoContainer>
        
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CloseIcon />} onClick={onCancel}>Avbryt</Button>
        <Button
          startIcon={<CameraIcon />}
          variant="contained"
          onClick={captureImage}
          disabled={!isCameraActive || isScanning}
        >
          Ta bild
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MuiCameraScanner;