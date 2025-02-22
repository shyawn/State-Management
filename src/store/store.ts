import {configureStore} from '@reduxjs/toolkit';
import healthSlice from './healthConcern/healthSlice';
import dietSlice from './diet/dietSlice';
import allergiesSlice from './allergies/allergiesSlice';
import lifestyleSlice from './lifestyle/lifestyleSlice';

export const store = configureStore({
  reducer: {
    healthConcern: healthSlice,
    diet: dietSlice,
    allergies: allergiesSlice,
    lifestyle: lifestyleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
