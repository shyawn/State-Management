import {configureStore} from '@reduxjs/toolkit';
import healthSlice from './healthConcern/healthSlice';

export const store = configureStore({
  reducer: {
    healthConcern: healthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
