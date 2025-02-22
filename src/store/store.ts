import {configureStore} from '@reduxjs/toolkit';
import healthSlice from './healthConcern/healthSlice';
import dietSlice from './diet/dietSlice';

export const store = configureStore({
  reducer: {
    healthConcern: healthSlice,
    diet: dietSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
