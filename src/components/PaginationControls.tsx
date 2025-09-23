import { Pagination, Stack } from '@mui/material';
import type { PaginationControlsProps } from './PaginationControls.types';
import './PaginationControls.styled.css';

export function PaginationControls({
  page,
  total,
  pageSize = 10,
  onChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(total / pageSize) || 1;
  if (totalPages <= 1) return null;
  return (
    <Stack className="pagination-controls">
      <Pagination
        count={totalPages}
        page={page}
        color="primary"
        size="small"
        onChange={(_, p) => onChange(p)}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
