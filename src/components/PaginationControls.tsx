import { Pagination, Stack } from '@mui/material';

interface PaginationControlsProps {
  page: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

export function PaginationControls({
  page,
  total,
  pageSize = 10,
  onChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(total / pageSize) || 1;
  if (totalPages <= 1) return null;
  return (
    <Stack alignItems="center" sx={{ my: 2 }}>
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
