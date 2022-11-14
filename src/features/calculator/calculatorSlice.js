import { createSlice } from '@reduxjs/toolkit';
import {calculator} from "./calculatorUtils";

const initialState = {
  value: 0,
  isDirty :false,
  isBeforeNumber:null,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onNumberClicked: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if(state.isDirty){
        state.value = state.value + action.payload;
      }else{
        state.value = action.payload;
        state.isDirty = true;
      }
      state.isBeforeNumber=true; 
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    onOperatorClicked: (state, action) => {
      if(state.isDirty && state.isBeforeNumber){
        state.value = state.value + action.payload;
        state.isBeforeNumber = false;
      }
    },
    onClearClicked:(state)=>{
      state.value = 0;
      state.isDirty =false;
    },
    onResultClicked:(state)=>{
      state.value = calculator(state.value);
    }
  }
})

export const { 
  onNumberClicked, 
  onOperatorClicked,
  onClearClicked,
  onResultClicked 
} = calculatorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCalculator = (state) => state.calculator.value;

export default calculatorSlice.reducer;
