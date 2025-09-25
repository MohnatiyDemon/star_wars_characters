import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetPersonQuery } from '../store/swapiApi';
import { Stack, Typography, CircularProgress, Alert, Button, Grid, Paper } from '@mui/material';
import { EditableField } from '../components/EditableField';
import { PERSON_LABELS, EDITABLE_PERSON_FIELDS, mapGender } from '../utils/personDetail';

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
  const storageKey = id ? `person-edit-${id}` : '';

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSavedEdits(parsed || {});
      } else {
        setSavedEdits({});
      }
      setDraft({});
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!person) return;
    if (!storageKey) return;
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
    let value: string;
    if (field in draft) value = draft[field];
    else if (field in savedEdits) value = savedEdits[field];
    else value = String(person[field]);
    if (field === 'gender') return mapGender(value);
    return value;
  };

  const handleChange = (field: keyof typeof person, val: string) => {
    if (!person) return;
    setDraft((prev) => {
      const next = { ...prev, [field]: val };
      const baseline = field in savedEdits ? savedEdits[field] : String(person[field]);
      if (val === baseline) {
        delete next[field];
      }
      return next;
    });
  };

  const handleReset = () => {
    setDraft({});
    setSavedEdits({});
    if (storageKey) localStorage.removeItem(storageKey);
  };

  const handleSave = () => {
    if (!storageKey || !person) return;
    if (Object.keys(draft).length === 0) return;
    let merged: Record<string, string> = { ...savedEdits };
    Object.entries(draft).forEach(([k, v]) => {
      merged[k] = v;
    });

    const pruned: Record<string, string> = {};
    Object.entries(merged).forEach(([k, v]) => {
      if (v === '' || v === String(person[k as keyof typeof person])) return;
      pruned[k] = v;
    });
    if (Object.keys(pruned).length === 0) {
      localStorage.removeItem(storageKey);
      setSavedEdits({});
    } else {
      localStorage.setItem(storageKey, JSON.stringify(pruned));
      setSavedEdits(pruned);
    }
    setDraft({});
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
