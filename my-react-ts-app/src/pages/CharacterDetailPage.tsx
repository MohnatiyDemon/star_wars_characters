import { useParams, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetPersonQuery } from '../store/swapiApi';
import { Stack, Typography, CircularProgress, Alert, Button, Grid, Paper } from '@mui/material';
import { EditableField } from '../components/EditableField';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const { data: person, isLoading, isError } = useGetPersonQuery(id || '', { skip: !id });
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (person) {
      setDraft({});
      setDirty(false);
    }
  }, [person]);

  if (!id) return <Alert severity="error">Неверный идентификатор</Alert>;
  if (isLoading && !person) return <Stack alignItems="center" py={4}><CircularProgress /></Stack>;
  if (isError) return <Alert severity="error">Ошибка загрузки</Alert>;
  if (!person) return <Alert severity="warning">Персонаж не найден</Alert>;

  const labels: Record<string, string> = {
    name: 'Имя',
    height: 'Рост',
    mass: 'Масса',
    hair_color: 'Цвет волос',
    skin_color: 'Цвет кожи',
    eye_color: 'Цвет глаз',
    birth_year: 'Год рождения',
    gender: 'Пол',
  };

  const genderMap: Record<string, string> = {
    male: 'мужской',
    female: 'женский',
    'n/a': 'н/д',
    unknown: 'неизвестно',
  };

  const editableFields: (keyof typeof person)[] = [
    'name',
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
  ];

  const currentValue = (field: keyof typeof person) => {
    const value = field in draft ? draft[field as string] : String(person[field]);
    if (field === 'gender') return genderMap[value] || value;
    return value;
  };

  const handleChange = (field: keyof typeof person, val: string) => {
    setDraft((d) => ({ ...d, [field]: val }));
    setDirty(true);
  };

  const handleReset = () => {
    setDraft({});
    setDirty(false);
  };

  return (
    <Stack spacing={2}>
      <Button component={RouterLink} to="/" size="small" variant="outlined">← Назад</Button>
      <Typography variant="h5" fontWeight={600}>{currentValue('name')}</Typography>
      <Paper sx={{ p: 2 }} variant="outlined">
        <Grid container spacing={2}>
          {editableFields.map((f) => (
            <Grid key={f} size={{ xs: 12, sm: 6 }}>
              <EditableField
                label={labels[f] || f}
                value={currentValue(f)}
                onChange={(v) => handleChange(f, v)}
              />
            </Grid>
          ))}
        </Grid>
        {dirty && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleReset}>Сбросить изменения</Button>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
