import { createSlice } from '@reduxjs/toolkit';

import {writeToLocalStorage, readFromLocalStorage} from '../../localStorage';

const initialData = {
  data: [{
      id: 0,
      full_name: "",
      phone_number: "",
      email: "",
  }]}

export const get_initial_payees_data = async () => {
    let data = await readFromLocalStorage("payees")
    let userData = initialData
    if (!data) {
      writeToLocalStorage("payees", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const payeesSlice = createSlice({
  name: 'payees',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPayees: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToLocalStorage("payees", action.payload):null
        
    },

    addSingleCustomer: (state, action) => {
          state.data = [...state.data, action.payload]
            writeToLocalStorage("payees", {data:state.data})
        },

    clearPayees :state=>{
      state = initialData
      writeToLocalStorage("payees", initialData)
    },
    
  },

});

export const { addPayees, addSingleCustomer, clearPayees } = payeesSlice.actions;

export default payeesSlice.reducer;
