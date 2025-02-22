import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import healthJSON from '../../utils/Healthconcern.json';

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
  allConcerns: healthJSON.data,
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
    setConcernOrder: (state, action: PayloadAction<HealthConcern[]>) => {
      state.selectedConcerns = action.payload;
    },
  },
});

export const {chooseOption, setConcernOrder} = healthSlice.actions;
export default healthSlice.reducer;
