import { useSearchParams } from 'react-router-dom';
import { useGetPeopleQuery } from '../store/swapiApi';
import { CircularProgress, Alert, Stack, Typography, Fade, Box } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { PaginationControls } from '../components/PaginationControls';
import { CharacterListItem } from '../components/CharacterListItem';

export default function CharactersPage() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(parseInt(params.get('page') || '1', 10), 1);
  const search = params.get('search') || '';
  const { data, isLoading, isError, isFetching } = useGetPeopleQuery({ page, search });
  const people = (data?.ids || []).map((id) => data!.entities[id]);
  const total = data?.total || 0;
  const loading = isLoading || isFetching;

  const handleSearchChange = (val: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) next.set('search', val);
      else next.delete('search');
      next.set('page', '1');
      return next;
    });
  };

  const handlePageChange = (p: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(p));
      if (search) next.set('search', search);
      return next;
    });
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ minHeight: 40 }}>
        <SearchBar value={search} onChange={handleSearchChange} />
      </Box>
      {isError && <Alert severity="error">Произошла ошибка загрузки</Alert>}
      {loading && people.length === 0 && (
        <Stack alignItems="center" py={4}>
          <CircularProgress />
        </Stack>
      )}
      {!loading && people.length === 0 && !isError && (
        <Typography variant="body1">Ничего не найдено.</Typography>
      )}
      <Fade in={people.length > 0 || loading}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              width: '100%',
              maxWidth: 1200,
              minHeight: 420,
              justifyContent: 'center',
            }}
          >
            {people.map((p) => (
              <Box key={p.id} sx={{ flex: '0 0 auto' }}>
                <CharacterListItem person={p} />
              </Box>
            ))}
          </Box>
        </Box>
      </Fade>
      <PaginationControls page={page} total={total} onChange={handlePageChange} />
    </Stack>
  );
}
