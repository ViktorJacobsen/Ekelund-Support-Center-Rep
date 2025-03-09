'use client';

import { useMUI } from '@/lib/mui-config';

// Original komponenter
import OriginalMeterForm from './meter-form';
import OriginalCameraScanner from './camera-scanner';

// MUI komponenter
import MuiMeterForm from './mui-meter-form';
import MuiCameraScanner from './mui-camera-scanner';

// Exportera rätt komponenter baserat på MUI-konfigurationen
export const MeterForm = useMUI ? MuiMeterForm : OriginalMeterForm;
export const CameraScanner = useMUI ? MuiCameraScanner : OriginalCameraScanner;

// För direkt import
export default {
  MeterForm,
  CameraScanner
};