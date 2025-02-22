import {createSlice} from '@reduxjs/toolkit';

interface HealthConcern {
  id: string;
  name: string;
  priority: number;
}

const initialState: HealthConcern[] = [];

const healthSlice = createSlice({
  name: 'healthConcern',
  initialState,
  reducers: {},
});

export const {} = healthSlice.actions;
export default healthSlice.reducer;
