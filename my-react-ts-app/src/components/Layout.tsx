import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface LayoutProps { children: ReactNode }

export function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h4" textAlign="center">Star Wars Characters</Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
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
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
