import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Lifestyle {
  is_daily_exposure: boolean;
  is_smoke: boolean;
  alcohol: string;
}

const initialState: Lifestyle = {
  is_daily_exposure: false,
  is_smoke: false,
  alcohol: '',
};

const lifestyleSlice = createSlice({
  name: 'lifestyle',
  initialState,
  reducers: {
    setDailyExposure: (state, action: PayloadAction<boolean>) => {
      state.is_daily_exposure = action.payload;
    },
    setSmokingStatus: (state, action: PayloadAction<boolean>) => {
      state.is_smoke = action.payload;
    },
    setAlcoholConsumption: (state, action: PayloadAction<string>) => {
      state.alcohol = action.payload;
    },
  },
});

export const {setDailyExposure, setSmokingStatus, setAlcoholConsumption} =
  lifestyleSlice.actions;
export default lifestyleSlice.reducer;
