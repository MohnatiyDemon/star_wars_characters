export interface PaginationControlsProps {
  page: number;
  total: number;
  pageSize?: number;
  onChange: (nextPage: number) => void;
}
