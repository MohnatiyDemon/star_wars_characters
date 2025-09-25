import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetPersonQuery } from '../store/swapiApi';
import { Stack, Typography, CircularProgress, Alert, Button, Grid, Paper } from '@mui/material';
import { EditableField } from '../components/EditableField';
import { PERSON_LABELS, EDITABLE_PERSON_FIELDS, mapGender } from '../utils/personDetail';
import {
  getPersonEditStorageKey,
  loadEdits,
  applyDraftChange,
  persistEdits,
  resolveCurrentValue,
  clearEdits,
} from '../utils/personEdits';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };
  const { data: person, isLoading, isError } = useGetPersonQuery(id || '', { skip: !id });
  const [savedEdits, setSavedEdits] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});
  const storageKey = getPersonEditStorageKey(id);

  useEffect(() => {
    if (!storageKey) return;
    const { saved, draft } = loadEdits(storageKey);
    setSavedEdits(saved);
    setDraft(draft);
  }, [storageKey]);

  useEffect(() => {
    if (!person || !storageKey) return;
    const hasStored = localStorage.getItem(storageKey);
    if (!hasStored) {
      setSavedEdits({});
      setDraft({});
    }
  }, [person, storageKey]);

  if (!id) return <Alert severity="error">Неверный идентификатор</Alert>;
  if (isLoading && !person)
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    );
  if (isError)
    return (
      <Alert severity="error">
        Не удалось загрузить данные. Проверьте подключение к интернету.
      </Alert>
    );
  if (!person) return <Alert severity="warning">Персонаж не найден</Alert>;

  const currentValue = (field: keyof typeof person) => {
    const value = resolveCurrentValue(field, {
      draft,
      saved: savedEdits,
      original: person,
    });
    if (field === 'gender') return mapGender(value);
    return value;
  };

  const handleChange = (field: keyof typeof person, val: string) => {
    if (!person) return;
    setDraft((prev) =>
      applyDraftChange({
        field: field,
        value: val,
        draft: prev,
        saved: savedEdits,
        original: person,
      }),
    );
  };

  const handleReset = () => {
    setDraft({});
    setSavedEdits({});
    clearEdits(storageKey);
  };

  const handleSave = () => {
    if (!storageKey || !person) return;
    if (Object.keys(draft).length === 0) return;
    const { saved, draft: clearedDraft } = persistEdits({
      storageKey,
      draft,
      saved: savedEdits,
      original: person,
    });
    setSavedEdits(saved);
    setDraft(clearedDraft);
  };

  const hasUnsaved = Object.keys(draft).length > 0;
  const hasSaved = Object.keys(savedEdits).length > 0;
  const hasAnyDeviation = hasUnsaved || hasSaved;

  return (
    <Stack spacing={2}>
      <Button onClick={handleBack} size="small" variant="outlined">
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
        {hasAnyDeviation && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {hasUnsaved && (
              <Button variant="contained" onClick={handleSave}>
                Сохранить изменения
              </Button>
            )}
            <Button variant="outlined" onClick={handleReset}>
              Сбросить
            </Button>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
