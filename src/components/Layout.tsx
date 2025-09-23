import { AppBar, Toolbar, Container, Box } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Starfield } from './Starfield';
import logo from '../../static/star-wars-logo.png';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        zIndex: 1,
      }}
    >
      <Starfield />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 4px 18px -4px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ position: 'relative', minHeight: 70 }} disableGutters>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Star Wars"
              sx={{ height: 50, width: 'auto', filter: 'drop-shadow(0 0 6px rgba(255,193,7,0.5))' }}
            />
          </Box>
        </Toolbar>
        <Box
          sx={{
            height: 3,
            background: 'linear-gradient(90deg,#ffc107 0%, #16e0ff 50%, #ffc107 100%)',
            opacity: 0.5,
          }}
        />
      </AppBar>
      <Container
        sx={{
          position: 'relative',
          py: 4,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          maxWidth: '1200px !important',
          mx: 'auto',
          width: '100%',
          minHeight: { xs: 'unset', md: '600px' },
          zIndex: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
