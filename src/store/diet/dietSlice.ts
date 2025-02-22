import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import dietJSON from '../../utils/Diets.json';

// const initialState: any = [];
interface Diet {
  id: string;
  name: string;
  value: string;
}

const initialState: Diet | null = null;

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    chooseDiet: (state, action: PayloadAction<Diet>) => {
      return action.payload;
    },
  },
});

export const {chooseDiet} = dietSlice.actions;
export default dietSlice.reducer;
