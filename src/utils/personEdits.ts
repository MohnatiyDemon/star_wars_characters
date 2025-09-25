import type { Person } from '../store/types';

export function readPersonEdits(id: string): Partial<Person> | null {
  try {
    const raw = localStorage.getItem(getPersonEditStorageKey(id));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (error) {
    console.error('Error reading person edits:', error);
  }
  return null;
}

export function mergePersonWithEdits(person: Person): Person {
  const edits = readPersonEdits(person.id);
  if (!edits) return person;
  return { ...person, ...edits };
}

export function getPersonEditStorageKey(id: string | undefined): string | '' {
  return id ? `person-edit-${id}` : '';
}

export interface LoadedEdits {
  saved: Record<string, string>;
  draft: Record<string, string>;
}

export function loadEdits(storageKey: string): LoadedEdits {
  if (!storageKey) return { saved: {}, draft: {} };
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { saved: {}, draft: {} };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return { saved: parsed, draft: {} };
    }
  } catch (e) {
    console.error('Failed to load edits', e);
  }
  return { saved: {}, draft: {} };
}

export function applyDraftChange<K extends keyof Person>(args: {
  field: K | string;
  value: string;
  draft: Record<string, string>;
  saved: Record<string, string>;
  original: Person | null;
}): Record<string, string> {
  const { field, value, draft, saved, original } = args;
  const key = field;
  const next = { ...draft, [key]: value };
  const baseline =
    key in saved ? saved[key] : original ? String(original[key as keyof Person]) : '';
  if (value === baseline) {
    delete next[key];
  }
  return next;
}

export function persistEdits(args: {
  storageKey: string;
  draft: Record<string, string>;
  saved: Record<string, string>;
  original: Person;
}): { saved: Record<string, string>; draft: Record<string, string> } {
  const { storageKey, draft, saved, original } = args;
  if (!storageKey) return { saved, draft };
  if (Object.keys(draft).length === 0) return { saved, draft };

  const merged: Record<string, string> = { ...saved };
  Object.entries(draft).forEach(([k, v]) => {
    merged[k] = v;
  });

  const pruned: Record<string, string> = {};
  Object.entries(merged).forEach(([k, v]) => {
    const origVal = (original as Person)[k as keyof Person];
    if (v === '' || v === String(origVal)) return;
    pruned[k] = v;
  });

  if (Object.keys(pruned).length === 0) {
    localStorage.removeItem(storageKey);
    return { saved: {}, draft: {} };
  }
  localStorage.setItem(storageKey, JSON.stringify(pruned));
  return { saved: pruned, draft: {} };
}

export function resolveCurrentValue<K extends keyof Person>(
  field: K | string,
  opts: {
    draft: Record<string, string>;
    saved: Record<string, string>;
    original: Person;
  },
): string {
  const { draft, saved, original } = opts;
  const key = field;
  if (key in draft) return draft[key];
  if (key in saved) return saved[key];
  return String(original[key as keyof Person]);
}

export function clearEdits(storageKey: string) {
  if (!storageKey) return;
  localStorage.removeItem(storageKey);
}
