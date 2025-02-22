import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// interface HealthConcern {
//   id: string;
//   name: string;
//   priority: number;
// }

// const initialState: HealthConcern[] = [];
const initialState: string[] = [
  'Sleep',
  'Immunity',
  'Stress',
  'Joint Support',
  'Digestion',
  'Mood',
  'Energy',
  'Hair, Skin, Nails',
  'Weight Loss',
  'Fitness',
];

const healthSlice = createSlice({
  name: 'healthConcern',
  initialState,
  reducers: {
    // Toggles concern option based on payload received
    chooseOption: (state, action: PayloadAction<string>) => {
      const index = state.indexOf(action.payload);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
    // setConcernOrder: (state, action) => {
    //   return action.payload;
    // },
  },
});

export const {chooseOption} = healthSlice.actions;
export default healthSlice.reducer;
