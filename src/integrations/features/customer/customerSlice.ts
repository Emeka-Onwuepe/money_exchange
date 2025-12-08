import { createSlice } from '@reduxjs/toolkit';

import {writeToLocalStorage, readFromLocalStorage} from '../../localStorage';

const initialData = {
  data: [{
      id: 0,
      full_name: "",
      phone_number: "",
      email: "",
  }]}

export const get_initial_customers_data = async () => {
    let data = await readFromLocalStorage("customers")
    let userData = initialData
    if (!data) {
      writeToLocalStorage("customers", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const customersSlice = createSlice({
  name: 'customers',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCustomers: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToLocalStorage("customers", action.payload):null
        
    },

    addSingleCustomer: (state, action) => {

      const filtered = state.data.filter(customer=>customer.id != action.payload.id)
      let data =  [...filtered, action.payload]
      // sort by id in descending order
      data.sort((a,b)=>b.id - a.id)
      state.data = data

            writeToLocalStorage("customers", {data:state.data})
        },

    clearCustomers :state=>{
      state = initialData
      writeToLocalStorage("customers", initialData)
    },
    
  },

});

export const { addCustomers, addSingleCustomer, clearCustomers } = customersSlice.actions;

export default customersSlice.reducer;
