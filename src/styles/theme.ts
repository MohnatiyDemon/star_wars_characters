import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const themeBase = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffc107', contrastText: '#000' },
    secondary: { main: '#16e0ff' },
    background: { default: '#05060a', paper: 'rgba(20,22,30,0.72)' },
    divider: 'rgba(255,255,255,0.08)',
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#ef5350' },
  },
  typography: {
    fontFamily: `'Orbitron', 'Segoe UI', Roboto, system-ui, Arial, sans-serif`,
    h5: { letterSpacing: '0.04em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(6px)',
          backgroundImage: 'linear-gradient(145deg, rgba(40,45,60,0.65), rgba(10,12,18,0.65))',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(10,12,18,0.85), rgba(40,45,60,0.85))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px -6px rgba(0,0,0,0.6)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.12)',
          backgroundImage: 'linear-gradient(145deg, rgba(255,193,7,0.15), rgba(255,193,7,0.05))',
          transition: 'all .25s ease',
          '&:hover': {
            borderColor: '#ffc107',
            boxShadow: '0 0 0 1px rgba(255,193,7,0.4), 0 0 18px -2px rgba(255,193,7,0.45)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
    },
  },
});

export const theme = responsiveFontSizes(themeBase);
