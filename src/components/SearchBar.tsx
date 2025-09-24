import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import type { SearchBarProps } from './SearchBar.types';

export function SearchBar({ value, onChange, placeholder = 'Поиск персонажей' }: SearchBarProps) {
  const [local, setLocal] = useState(value);
  const debounced = useDebounce(local, 400);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (debounced !== value) onChange(debounced);
  }, [debounced, value, onChange]);

  return (
    <TextField
      fullWidth
      size="small"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}
