import { useParams, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetPersonQuery } from '../store/swapiApi';
import { Stack, Typography, CircularProgress, Alert, Button, Grid, Paper } from '@mui/material';
import { EditableField } from '../components/EditableField';
import { PERSON_LABELS, EDITABLE_PERSON_FIELDS, mapGender } from '../utils/personDetail';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const { data: person, isLoading, isError } = useGetPersonQuery(id || '', { skip: !id });
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const storageKey = id ? `person-edit-${id}` : '';

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        setDraft(parsed);
        if (Object.keys(parsed).length > 0) setDirty(true);
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (person) {
      if (!storageKey) return;
      const hasStored = localStorage.getItem(storageKey);
      if (!hasStored) {
        setDraft({});
        setDirty(false);
      }
    }
  }, [person, storageKey]);

  if (!id) return <Alert severity="error">Неверный идентификатор</Alert>;
  if (isLoading && !person)
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    );
  if (isError) return <Alert severity="error">Ошибка загрузки</Alert>;
  if (!person) return <Alert severity="warning">Персонаж не найден</Alert>;

  const currentValue = (field: keyof typeof person) => {
    const value = field in draft ? draft[field as string] : String(person[field]);
    if (field === 'gender') return mapGender(value);
    return value;
  };

  const handleChange = (field: keyof typeof person, val: string) => {
    setDraft((d) => ({ ...d, [field]: val }));
    setDirty(true);
  };

  const handleReset = () => {
    setDraft({});
    setDirty(false);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  const handleSave = () => {
    if (!storageKey) return;
    const cleanDraft: Record<string, string> = {};
    Object.entries(draft).forEach(([k, v]) => {
      if (v !== '' && v !== String(person[k as keyof typeof person])) cleanDraft[k] = v;
    });
    if (Object.keys(cleanDraft).length === 0) {
      localStorage.removeItem(storageKey);
      setDirty(false);
      setDraft({});
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(cleanDraft));
    setDraft(cleanDraft);
    setDirty(false);
  };

  return (
    <Stack spacing={2}>
      <Button component={RouterLink} to="/" size="small" variant="outlined">
        Назад
      </Button>
      <Typography variant="h5" fontWeight={600}>
        {currentValue('name')}
      </Typography>
      <Paper sx={{ p: 2 }} variant="outlined">
        <Grid container spacing={2}>
          {EDITABLE_PERSON_FIELDS.map((f) => (
            <Grid key={f} size={{ xs: 12, sm: 6 }}>
              <EditableField
                label={PERSON_LABELS[f] || f}
                value={currentValue(f)}
                onChange={(v) => handleChange(f, v)}
              />
            </Grid>
          ))}
        </Grid>
        {dirty && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Сохранить изменения
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Сбросить
            </Button>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
