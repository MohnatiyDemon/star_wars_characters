import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PeopleApiResponse, Person } from './types';
import { extractIdFromUrl } from '../utils/extractIdFromUrl';

interface GetPeopleArgs {
  page: number;
  search: string;
}
interface GetPeopleResult {
  ids: string[];
  entities: Record<string, Person>;
  total: number;
}

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getPeople: builder.query<GetPeopleResult, GetPeopleArgs>({
      query: ({ page, search }) => `people/?page=${page}&search=${encodeURIComponent(search)}`,
      transformResponse: (response: PeopleApiResponse): GetPeopleResult => {
        const entities: Record<string, Person> = {};
        const ids = response.results.map((raw) => {
          const id = extractIdFromUrl(raw.url);
          entities[id] = { id, ...(raw as Omit<Person, 'id'>) };
          return id;
        });
        return { ids, entities, total: response.count };
      },
      serializeQueryArgs: ({ queryArgs }) => `${queryArgs.search}::${queryArgs.page}`,
    }),
    getPerson: builder.query<Person, string>({
      query: (id) => `people/${id}/`,
      transformResponse: (raw, _, id) => ({ id, ...(raw as Omit<Person, 'id'>) }),
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = swapiApi;
