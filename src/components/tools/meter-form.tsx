'use client';

import React, { useState } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import CameraScanner from './camera-scanner';
import { ExcelService } from '@/lib/utils/excel-service';

interface MeterReading {
  id: string;
  reading: string;
  timestamp: string;
  location?: string;
  notes?: string;
}

const MeterForm: React.FC = () => {
  const { themeClasses } = useTheme();
  
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
    <div className="p-6">
      <h1 className={`text-2xl ${themeClasses.heading} ${themeClasses.text} mb-6`}>Mätarinsamling</h1>
      
      {/* Formulär för ny avläsning */}
      <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 mb-8 shadow-sm`}>
        <h2 className={`text-lg ${themeClasses.subheading} ${themeClasses.text} mb-4`}>Ny avläsning</h2>
        
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-1`}>
              Mätare-ID <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMeterId}
                onChange={(e) => setCurrentMeterId(e.target.value)}
                className={`flex-1 px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
                placeholder="Ange eller skanna mätare-ID"
              />
              <button
                onClick={() => setShowScanner(true)}
                className={`px-3 py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-1`}>
              Mätarställning <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentReading}
              onChange={(e) => setCurrentReading(e.target.value)}
              className={`w-full px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="Ange avläst värde"
            />
          </div>
          
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-1`}>
              Plats
            </label>
            <input
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className={`w-full px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="Valfritt"
            />
          </div>
          
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-1`}>
              Anteckningar
            </label>
            <input
              type="text"
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              className={`w-full px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="Valfritt"
            />
          </div>
        </div>
        
        <button
          onClick={addReading}
          className={`w-full py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Lägg till avläsning</span>
        </button>
      </div>
      
      {/* Lista över avläsningar */}
      <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg ${themeClasses.subheading} ${themeClasses.text}`}>Avläsningar</h2>
          
          <button
            onClick={exportToCSV}
            disabled={readings.length === 0}
            className={`px-4 py-2 rounded-lg ${
              readings.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : `${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90`
            } transition-opacity duration-200 flex items-center space-x-2`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportera</span>
          </button>
        </div>
        
        {readings.length === 0 ? (
          <div className={`text-center py-8 ${themeClasses.mutedText}`}>
            Inga avläsningar registrerade
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${themeClasses.border}`}>
                  <th className={`pb-2 text-left text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText}`}>Mätare-ID</th>
                  <th className={`pb-2 text-left text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText}`}>Avläsning</th>
                  <th className={`pb-2 text-left text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText}`}>Tid</th>
                  <th className={`pb-2 text-left text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText}`}>Plats</th>
                  <th className={`pb-2 text-left text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText}`}>Åtgärd</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((reading, index) => (
                  <tr key={index} className={`border-b ${themeClasses.border} last:border-0`}>
                    <td className={`py-3 ${themeClasses.text}`}>{reading.id}</td>
                    <td className={`py-3 ${themeClasses.text}`}>{reading.reading}</td>
                    <td className={`py-3 text-sm ${themeClasses.mutedText}`}>
                      {new Date(reading.timestamp).toLocaleString('sv-SE')}
                    </td>
                    <td className={`py-3 text-sm ${themeClasses.mutedText}`}>{reading.location || '-'}</td>
                    <td className="py-3">
                      <button
                        onClick={() => removeReading(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Kamerascanner */}
      {showScanner && (
        <CameraScanner 
          onScanComplete={handleScanComplete} 
          onCancel={() => setShowScanner(false)} 
        />
      )}
    </div>
  );
};

export default MeterForm;