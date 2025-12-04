import { createSlice } from '@reduxjs/toolkit';
import { get_message_and_code } from './helper';

interface AlertState {
    status_code: number;
    message: string[];
}

const initialData: AlertState = {
    status_code: 0,
    message: []
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addAlert: (state, action) => {
      const data = get_message_and_code(action.payload)
        state.status_code = data.status_code
        state.message = [...state.message,...data.message]
    },
    clearAlert :state=>{
      state.status_code = 0
      state.message = []
    }
   
  },
 
});

// export const getuser = (state)=>state
// export const getuserToken = (state)=>state.token
export const { addAlert,clearAlert} = alertSlice.actions;

export default alertSlice.reducer;
