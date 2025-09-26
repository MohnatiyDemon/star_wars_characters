export function extractIdFromUrl(url: string): string {
  if (!url) return '';
  return url.split('/').filter(Boolean).pop() || '';
}
