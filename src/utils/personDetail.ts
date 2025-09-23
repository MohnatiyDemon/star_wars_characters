export const PERSON_LABELS: Record<string, string> = {
  name: 'Имя',
  height: 'Рост',
  mass: 'Масса',
  hair_color: 'Цвет волос',
  skin_color: 'Цвет кожи',
  eye_color: 'Цвет глаз',
  birth_year: 'Год рождения',
  gender: 'Пол',
};

export const GENDER_MAP: Record<string, string> = {
  male: 'мужской',
  female: 'женский',
  'n/a': 'н/д',
  unknown: 'неизвестно',
};

export const EDITABLE_PERSON_FIELDS = [
  'name',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
] as const;

export function mapGender(value: string) {
  return GENDER_MAP[value] || value;
}
