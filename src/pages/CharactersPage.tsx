import { useSearchParams } from 'react-router-dom';
import { useGetPeopleQuery } from '../store/swapiApi';
import { CircularProgress, Alert, Stack, Typography, Fade } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { PaginationControls } from '../components/PaginationControls';
import { CharacterListItem } from '../components/CharacterListItem';
import './CharactersPage.styled.css';

export default function CharactersPage() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(parseInt(params.get('page') || '1', 10), 1);
  const search = params.get('search') || '';
  const { data, isLoading, isError, isFetching } = useGetPeopleQuery({ page, search });
  const people = data ? data.ids.map((id) => data.entities[id]) : [];
  const total = data?.total ?? 0;
  const loading = isLoading || isFetching;

  const handleSearchChange = (val: string) => {
    const entries: [string, string][] = [['page', '1']];
    if (val) entries.push(['search', val]);
    setParams(entries);
  };

  const handlePageChange = (p: number) => {
    const entries: [string, string][] = [['page', String(p)]];
    if (search) entries.push(['search', search]);
    setParams(entries);
  };

  return (
    <Stack spacing={2}>
      <div className="characters-search">
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>
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
        <div className="characters-list-wrapper">
          <div className="characters-list">
            {people.map((p) => (
              <CharacterListItem key={p.id} person={p} />
            ))}
          </div>
        </div>
      </Fade>
      <PaginationControls page={page} total={total} onChange={handlePageChange} />
    </Stack>
  );
}
