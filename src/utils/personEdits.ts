import type { Person } from '../store/types';

export function readPersonEdits(id: string): Partial<Person> | null {
  try {
    const raw = localStorage.getItem(`person-edit-${id}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed) return parsed;
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
