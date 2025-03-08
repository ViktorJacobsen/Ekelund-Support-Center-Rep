'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { meterScanner } from '@/lib/utils/meter-scanner';

interface CameraScannerProps {
  onScanComplete: (result: string) => void;
  onCancel: () => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ 
  onScanComplete, 
  onCancel 
}) => {
  const { themeClasses } = useTheme();
  
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
  
  // Rendera baserat på tillstånd
  if (errorMessage && !hasCameraPermission) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4`}>
        <div className={`${themeClasses.cardBg} rounded-xl p-6 max-w-md w-full shadow-xl`}>
          <div className="text-center mb-6">
            <div className={`${themeClasses.secondary} h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className={`h-8 w-8 ${themeClasses.mutedText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Kameratillstånd krävs</h2>
            <p className={`${themeClasses.bodyText} ${themeClasses.mutedText} mb-6`}>{errorMessage}</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className={`flex-1 py-2 rounded-lg ${themeClasses.secondary} ${themeClasses.secondaryText} hover:opacity-90 transition-opacity duration-200`}
            >
              Avbryt
            </button>
            <button
              onClick={requestCameraPermission}
              className={`flex-1 py-2 rounded-lg ${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90 transition-opacity duration-200`}
            >
              Tillåt kamera
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Visa resultatskärmen om vi har skannat
  if (scanResult && imageSrc) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4`}>
        <div className={`${themeClasses.cardBg} rounded-xl p-6 max-w-md w-full shadow-xl`}>
          <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-4`}>Skanningsresultat</h2>
          
          <div className="mb-4">
            <img 
              src={imageSrc} 
              alt="Skannad bild" 
              className="w-full h-auto mb-4 rounded-lg"
            />
            
            <div className={`p-4 ${themeClasses.bg} border ${themeClasses.border} rounded-lg`}>
              <div className={`text-sm ${themeClasses.mutedText} mb-1`}>Avläst mätare-ID:</div>
              <div className={`text-2xl ${themeClasses.heading} ${themeClasses.primaryText} tracking-wider`}>
                {scanResult}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={resumeCamera}
              className={`flex-1 py-2 rounded-lg ${themeClasses.secondary} ${themeClasses.secondaryText} hover:opacity-90 transition-opacity duration-200`}
            >
              Skanna igen
            </button>
            <button
              onClick={acceptResult}
              className={`flex-1 py-2 rounded-lg ${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90 transition-opacity duration-200`}
            >
              Acceptera
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Visa kameravy
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4`}>
      <div className={`${themeClasses.cardBg} rounded-xl p-6 max-w-md w-full shadow-xl`}>
        <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-4`}>Skanna mätare-ID</h2>
        
        <div className="relative rounded-lg overflow-hidden bg-black mb-4 aspect-video">
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
            onCanPlay={() => setIsCameraActive(true)}
          />
          
          {/* Guidelines för att hjälpa användaren rikta kameran */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-white/50 rounded w-3/4 h-1/3 flex items-center justify-center">
              <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                Placera mätare-ID i rutan
              </div>
            </div>
          </div>
          
          {/* Loading overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyserar...</span>
              </div>
            </div>
          )}
          
          {/* Hidden canvas for image capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        {errorMessage && (
          <div className="mb-4 px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-2 rounded-lg ${themeClasses.secondary} ${themeClasses.secondaryText} hover:opacity-90 transition-opacity duration-200`}
          >
            Avbryt
          </button>
          <button
            onClick={captureImage}
            disabled={!isCameraActive || isScanning}
            className={`flex-1 py-2 rounded-lg ${
              !isCameraActive || isScanning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : `${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90`
            } transition-opacity duration-200 flex items-center justify-center space-x-2`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Ta bild</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraScanner;