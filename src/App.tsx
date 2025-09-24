import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { theme } from './styles/theme';

const CharactersPage = lazy(() => import('./pages/CharactersPage'));
const CharacterDetailPage = lazy(() => import('./pages/CharacterDetailPage'));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 10 }}>
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/character/:id" element={<CharacterDetailPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}
