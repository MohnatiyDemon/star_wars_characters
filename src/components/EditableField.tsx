import { TextField } from '@mui/material';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
}

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
