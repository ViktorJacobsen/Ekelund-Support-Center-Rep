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
  kind: 'divider';
}

// Rubrik i navigeringen
export interface NavigationHeader {
  kind: 'header';
  title: string;
}

// Alla typer av navigationselement
export type NavigationItems = (NavigationItem | NavigationDivider | NavigationHeader)[];

// Router-liknande interface för att hålla koll på navigering
export interface Router {
  pathname: string;
  navigate: (path: string) => void;
}