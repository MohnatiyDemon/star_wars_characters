import { TextField } from '@mui/material';
import type { EditableFieldProps } from './EditableField.types';

export function EditableField({ label, value, onChange, multiline }: EditableFieldProps) {
  return (
    <TextField
      fullWidth
      margin="dense"
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      multiline={multiline}
    />
  );
}
