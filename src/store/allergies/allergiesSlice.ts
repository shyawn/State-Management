import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Allergy {
  id: string;
  name: string;
}

const initialState: Allergy[] = [];

const allergySlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    chooseAllergies: (state, action: PayloadAction<Allergy>) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.filter(item => item.id !== action.payload.id);
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const {chooseAllergies} = allergySlice.actions;
export default allergySlice.reducer;
