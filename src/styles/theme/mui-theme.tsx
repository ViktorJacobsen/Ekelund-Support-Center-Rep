import { createTheme, ThemeOptions, PaletteOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

// Ljus och mörk palett baserat på dina befintliga CSS-variabler
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: 'hsl(219, 34%, 22%)', // --primary
    light: 'hsl(219, 34%, 32%)',
    dark: 'hsl(219, 34%, 18%)',
    contrastText: 'hsl(219, 0.68%, 92.2%)', // --primary-foreground
  },
  secondary: {
    main: 'hsl(219, 1.7%, 96.1%)', // --secondary
    light: 'hsl(219, 1.7%, 98%)',
    dark: 'hsl(219, 1.7%, 85%)',
    contrastText: 'hsl(219, 3.04%, 12.2%)', // --secondary-foreground
  },
  error: {
    main: 'hsl(0, 84.2%, 60.2%)', // --destructive
    light: 'hsl(0, 84.2%, 70%)',
    dark: 'hsl(0, 84.2%, 50%)',
    contrastText: 'hsl(0, 0%, 98%)', // --destructive-foreground
  },
  warning: {
    main: 'hsl(38, 92%, 50%)',
    light: 'hsl(38, 92%, 60%)',
    dark: 'hsl(38, 92%, 40%)',
    contrastText: 'hsl(0, 0%, 98%)',
  },
  info: {
    main: 'hsl(220, 70%, 50%)',
    light: 'hsl(220, 70%, 60%)',
    dark: 'hsl(220, 70%, 40%)',
    contrastText: 'hsl(0, 0%, 98%)',
  },
  success: {
    main: 'hsl(142, 71%, 45%)',
    light: 'hsl(142, 71%, 55%)',
    dark: 'hsl(142, 71%, 35%)',
    contrastText: 'hsl(0, 0%, 98%)',
  },
  background: {
    default: 'hsl(219, 96.7%, 98.44%)', // --background
    paper: 'hsl(219, 62.8%, 92.2%)', // --card
  },
  text: {
    primary: 'hsl(219, 3.4%, 0.88%)', // --foreground
    secondary: 'hsl(219, 1.7%, 42.2%)', // --muted-foreground
    disabled: 'hsl(219, 1.7%, 62%)',
  },
  divider: 'hsl(219, 8.4%, 89.88%)', // --border
  action: {
    active: 'hsl(219, 34%, 22%)',
    hover: 'hsl(219, 34%, 92%)',
    selected: 'hsl(219, 34%, 90%)',
    disabled: 'hsl(219, 1.7%, 70%)',
    disabledBackground: 'hsl(219, 1.7%, 90%)',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: 'hsl(204, 99%, 52%)', // --primary
    light: 'hsl(204, 99%, 62%)',
    dark: 'hsl(204, 99%, 42%)',
    contrastText: 'hsl(204, 9.9%, 5.2%)', // --primary-foreground
  },
  secondary: {
    main: 'hsl(204, 49.5%, 15.6%)', // --secondary
    light: 'hsl(204, 49.5%, 25%)',
    dark: 'hsl(204, 49.5%, 10%)',
    contrastText: 'hsl(204, 9.9%, 97.6%)', // --secondary-foreground
  },
  error: {
    main: 'hsl(0, 62.8%, 30.6%)', // --destructive
    light: 'hsl(0, 62.8%, 40.6%)',
    dark: 'hsl(0, 62.8%, 25%)',
    contrastText: 'hsl(204, 9.9%, 97.6%)', // --destructive-foreground
  },
  warning: {
    main: 'hsl(38, 92%, 50%)',
    light: 'hsl(38, 92%, 60%)',
    dark: 'hsl(38, 92%, 40%)',
    contrastText: 'hsl(204, 9.9%, 10%)',
  },
  info: {
    main: 'hsl(220, 70%, 60%)',
    light: 'hsl(220, 70%, 70%)',
    dark: 'hsl(220, 70%, 50%)',
    contrastText: 'hsl(204, 9.9%, 10%)',
  },
  success: {
    main: 'hsl(142, 71%, 45%)',
    light: 'hsl(142, 71%, 55%)',
    dark: 'hsl(142, 71%, 35%)',
    contrastText: 'hsl(204, 9.9%, 10%)',
  },
  background: {
    default: 'hsl(204, 64.35%, 4.16%)', // --background
    paper: 'hsl(204, 45.2%, 6.76%)', // --card
  },
  text: {
    primary: 'hsl(204, 9.9%, 97.6%)', // --foreground
    secondary: 'hsl(204, 9.9%, 55.2%)', // --muted-foreground
    disabled: 'hsl(204, 9.9%, 40%)',
  },
  divider: 'hsl(204, 49.5%, 15.6%)', // --border
  action: {
    active: 'hsl(204, 99%, 52%)',
    hover: 'hsl(204, 49.5%, 10%)',
    selected: 'hsl(204, 49.5%, 12%)',
    disabled: 'hsl(204, 9.9%, 30%)',
    disabledBackground: 'hsl(204, 9.9%, 15%)',
  },
};

// Typografi-inställningar baserat på dina font-variabler
const typography: TypographyOptions = {
  fontFamily: [
    'var(--font-sans)',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.025em',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.3,
    letterSpacing: '-0.025em',
  },
  h3: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
    letterSpacing: '-0.025em',
  },
  h4: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.5,
  },
  h6: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle1: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    textTransform: 'none', // Ingen ALL CAPS-stil
  },
  caption: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

// Dela gemensamma tema-inställningar
const commonThemeOptions: ThemeOptions = {
  typography,
  shape: {
    borderRadius: 12, // Baserat på --radius: 0.75rem
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    // resten av shadows...
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        containedPrimary: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
      },
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: 'var(--gradient)',
            color: '#ffffff',
            '&:hover': {
              background: 'var(--gradient)',
              filter: 'brightness(110%)',
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out, border-color 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '0 4px',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          height: 'auto',
          padding: '2px 2px',
        },
        label: {
          padding: '4px 8px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: '0.5rem',
          padding: '8px 12px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '0.75rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.75rem',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 'auto',
            minHeight: 'auto',
            padding: '8px 16px',
          },
        },
      },
    },
  },
};

// Skapa ljus och mörk tema
export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: lightPalette,
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: darkPalette,
});

// Funktion för att hämta rätt tema baserat på darkMode
export const getTheme = (darkMode: boolean) => {
  return darkMode ? darkTheme : lightTheme;
};

export default getTheme;