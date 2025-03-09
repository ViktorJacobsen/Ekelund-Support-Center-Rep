import React from 'react';

// Navigationsobjekt som representerar en länk
export interface NavigationItem {
  segment: string;
  title: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

// Avgränsare i navigeringen
export interface NavigationDivider {
  kind: 'divider';  // Använd literal type här
}

// Rubrik i navigeringen
export interface NavigationHeader {
  kind: 'header';   // Använd literal type här
  title: string;
}

// Alla typer av navigationselement
export type NavigationItems = (NavigationItem | NavigationDivider | NavigationHeader)[];

// Router-liknande interface för att hålla koll på navigering
export interface Router {
  pathname: string;
  navigate: (path: string) => void;
}