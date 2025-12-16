import { createSlice } from '@reduxjs/toolkit';

import {writeToLocalStorage, readFromLocalStorage} from '../../localStorage';

const initialData = {
  data: [{
      id: 0,
      amount: 0,
      date: '',
      transaction: 0
  }]}

export const get_initial_payments_data = async () => {
    let data = await readFromLocalStorage("payments")
    let userData = initialData
    if (!data) {
      writeToLocalStorage("payments", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPayments: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToLocalStorage("payments", action.payload):null
        
    },

    addSinglePayment: (state, action) => {

      const filtered = state.data.filter(payment=>payment.id != action.payload.id)
      let data =  [...filtered, action.payload]
      // sort by id in descending order
      data.sort((a,b)=>b.id - a.id)
      state.data = data
      writeToLocalStorage("payments", {data:state.data})
        },

    clearPayments :state=>{
      state = initialData
      writeToLocalStorage("payments", initialData)
    },
    
  },

});

export const { addPayments, addSinglePayment, clearPayments } = paymentsSlice.actions;

export default paymentsSlice.reducer;
