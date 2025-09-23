export function extractIdFromUrl(url: string): string {
  // Извлекает числовой ID из конца URL ресурса SWAPI
  if (!url) return '';
  const parts = url.split('/').filter(Boolean);
  if (parts.length === 0) return '';
  const last = parts[parts.length - 1];
  const idCandidate = /\d+/.test(last) ? last : parts[parts.length - 2];
  return idCandidate || '';
}
