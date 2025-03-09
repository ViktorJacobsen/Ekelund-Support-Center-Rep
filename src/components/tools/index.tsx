'use client';

// Importera MUI komponenter
import MuiMeterForm from './mui-meter-form';
import MuiCameraScanner from './mui-camera-scanner';

// Exportera komponenter
export const MeterForm = MuiMeterForm;
export const CameraScanner = MuiCameraScanner;

// Namnge exportobjektet
const components = {
  MeterForm: MuiMeterForm,
  CameraScanner: MuiCameraScanner
};

export default components;