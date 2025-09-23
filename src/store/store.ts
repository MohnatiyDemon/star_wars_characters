import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './swapiApi';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
