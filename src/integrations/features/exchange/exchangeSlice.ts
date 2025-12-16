import { createSlice } from '@reduxjs/toolkit';

import {writeToLocalStorage, readFromLocalStorage} from '../../localStorage';

const initialData = {
  data: [{
      id:0,
      date: "",
      base_currency: "RMB",
      usd_rate: 7.0,
      usd_price: 6.9,
      naira_rate: 212.0,
      amount:0.0,
      payee:0,
      customer: 0,
      naira: 0,
      usd_bid:0,
      usd_ask:0,
      usd_gain:0,
      balance:0,
      paid_amount:0,
      transaction_id:'#ldldldldl',
      channel: 'transfer',
      paid_once: true,
      reciept:""
  }]}

  // const initialData = {
  // data: Array.from({ length: 10 }, (_, i) => ({
  //     date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10), // recent dates
  //     base_currency: ['RMB', 'USD', 'EUR'][i % 3],
  //     usd_rate: +(6.5 + i * 0.1).toFixed(2),
  //     usd_price: +(6.3 + i * 0.12).toFixed(2),
  //     naira_rate: +(210 + i * 3),
  //     amount: +(100 + i * 25).toFixed(2),
  //     payee: `Payee ${i + 1}`,
  //     customer: `CUST${1000 + i}`,
  //     reciept: `REC-${(100000 + i).toString()}`
  //   }))
  // }

export const get_initial_exchange_data = async () => {
    let data = await readFromLocalStorage("exchange")
    let userData = initialData
    if (!data) {
      writeToLocalStorage("exchange", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addExchange: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToLocalStorage("exchange", action.payload):null
        
    },

    addSingleExchange: (state, action) => {
          state.data = [...state.data, action.payload]
            writeToLocalStorage("exchange", {data:state.data})
        },

    clearExchange :state=>{
      state = initialData
      writeToLocalStorage("exchange", initialData)
    },
    
  },

});

export const { addExchange, addSingleExchange, clearExchange } = exchangeSlice.actions;

export default exchangeSlice.reducer;
