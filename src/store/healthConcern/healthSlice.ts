import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// todo: place this in types folder
export interface HealthConcern {
  id: string;
  name: string;
  priority?: number;
}

interface HealthConcernsState {
  allConcerns: HealthConcern[];
  selectedConcerns: HealthConcern[];
}

const initialState: HealthConcernsState = {
  allConcerns: [
    {id: '1', name: 'Sleep'},
    {id: '2', name: 'Immunity'},
    {id: '3', name: 'Stress'},
    {id: '4', name: 'Joint Support'},
    {id: '5', name: 'Digestion'},
    {id: '6', name: 'Mood'},
    {id: '7', name: 'Energy'},
    {id: '8', name: 'Hair, Skin, Nails'},
    {id: '9', name: 'Weight Loss'},
    {id: '10', name: 'Fitness'},
  ],
  selectedConcerns: [],
};

const healthSlice = createSlice({
  name: 'healthConcern',
  initialState,
  reducers: {
    // Filters out option from original list based on payload received
    chooseOption: (state, action: PayloadAction<HealthConcern>) => {
      const selected = state.selectedConcerns.find(
        item => item.id === action.payload.id,
      );
      if (selected) {
        state.selectedConcerns = state.selectedConcerns.filter(
          item => item.id !== action.payload.id,
        );
      } else if (state.selectedConcerns.length < 5) {
        state.selectedConcerns.push(action.payload);
      }
    },
    setConcernOrder: (state, action) => {
      return action.payload;
    },
  },
});

export const {chooseOption, setConcernOrder} = healthSlice.actions;
export default healthSlice.reducer;
