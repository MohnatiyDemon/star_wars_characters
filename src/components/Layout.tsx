import { AppBar, Toolbar, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Starfield } from './Starfield';
import logo from '../../static/star-wars-logo.png';
import type { LayoutProps } from './Layout.types';
import './Layout.styled.css';

export function Layout({ children }: LayoutProps) {
  return (
    <Box className="app-layout-root">
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
        <Toolbar className="app-layout-toolbar" disableGutters>
          <Box component={RouterLink} to="/" className="app-layout-logo-link">
            <Box component="img" src={logo} alt="Star Wars" className="app-layout-logo-img" />
          </Box>
        </Toolbar>
        <Box className="app-layout-gradient-bar" />
      </AppBar>
      <Container className="app-layout-container" sx={{ maxWidth: '1200px !important' }}>
        {children}
      </Container>
    </Box>
  );
}
