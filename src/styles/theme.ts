import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const themeBase = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffc107', contrastText: 'var(--color-text-invert)' },
    secondary: { main: '#16e0ff' },
    background: { default: 'var(--color-bg-default)', paper: 'var(--color-bg-paper)' },
    divider: 'var(--color-divider)',
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
          backgroundImage: 'linear-gradient(145deg, var(--color-glass-a), var(--color-glass-b))',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, var(--color-appbar-a), var(--color-appbar-b))',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0 0 0 1px var(--color-border-strong), 0 8px 24px -6px var(--color-shadow-strong)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'var(--color-border-subtle)',
          backgroundImage:
            'linear-gradient(145deg, rgba(var(--color-primary-rgb),0.15), rgba(var(--color-primary-rgb),0.05))',
          transition: 'all .25s ease',
          '&:hover': {
            borderColor: 'var(--color-primary)',
            boxShadow:
              '0 0 0 1px rgba(var(--color-primary-rgb),0.4), 0 0 18px -2px rgba(var(--color-primary-rgb),0.45)',
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
