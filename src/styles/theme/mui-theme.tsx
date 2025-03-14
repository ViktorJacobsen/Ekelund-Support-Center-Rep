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
    main: 'hsl(214, 100%, 63%)',     // Bright blue
    light: 'hsl(214, 100%, 73%)',
    dark: 'hsl(214, 100%, 53%)',
    contrastText: 'hsl(0, 0%, 100%)',
  },
  secondary: {
    main: 'hsl(222, 25%, 12%)',
    light: 'hsl(222, 25%, 22%)',
    dark: 'hsl(222, 25%, 7%)',
    contrastText: 'hsl(0, 0%, 100%)', 
  },
  error: {
    main: 'hsl(0, 62%, 50%)',
    light: 'hsl(0, 62%, 60%)',
    dark: 'hsl(0, 62%, 40%)',
    contrastText: 'hsl(0, 0%, 100%)',
  },
  warning: {
    main: 'hsl(38, 92%, 50%)',
    light: 'hsl(38, 92%, 60%)',
    dark: 'hsl(38, 92%, 40%)',
    contrastText: 'hsl(0, 0%, 100%)',
  },
  info: {
    main: 'hsl(200, 70%, 60%)',
    light: 'hsl(200, 70%, 70%)',
    dark: 'hsl(200, 70%, 50%)',
    contrastText: 'hsl(0, 0%, 100%)',
  },
  success: {
    main: 'hsl(142, 71%, 45%)',
    light: 'hsl(142, 71%, 55%)',
    dark: 'hsl(142, 71%, 35%)',
    contrastText: 'hsl(0, 0%, 100%)',
  },
  background: {
    default: 'hsl(222, 25%, 7%)',     // Very dark blue-black
    paper: 'hsl(222, 25%, 10%)',      // Slightly lighter card backgrounds
  },
  text: {
    primary: 'hsl(220, 10%, 98%)',    // Almost white
    secondary: 'hsl(220, 10%, 75%)',  // Light gray
    disabled: 'hsl(220, 10%, 45%)',
  },
  divider: 'hsl(223, 20%, 15%)',
  action: {
    active: 'hsl(214, 100%, 63%)',
    hover: 'hsl(222, 30%, 12%)',
    selected: 'hsl(223, 30%, 15%)',
    disabled: 'hsl(220, 10%, 30%)',
    disabledBackground: 'hsl(220, 10%, 12%)',
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
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
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
})

// Funktion för att hämta rätt tema baserat på darkMode
export const getTheme = (darkMode: boolean) => {
  return darkMode ? darkTheme : lightTheme;
};