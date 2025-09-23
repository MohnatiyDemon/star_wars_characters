import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffc107' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
