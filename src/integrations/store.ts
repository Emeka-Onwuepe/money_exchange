import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import alertSlice from './features/alert/alertSlice';
import { moneyExchangeApi  } from './features/apis/apiSlice';
import userslice from './features/user/usersSlice';
import customersSlice  from './features/customer/customerSlice';
import  exchangeSlice  from './features/exchange/exchangeSlice';
import initializeStore from './initializeStore';
import payeesSlice  from './features/payee/payeeSlice';
import paymentsSlice  from './features/payment/paymentSlice';
import  metaSlice  from './features/meta/metaSlice';


export const store = configureStore({
  reducer: {
    user: userslice,
    alert: alertSlice,
    customers: customersSlice,
    exchange: exchangeSlice,
    payees: payeesSlice,
    payments: paymentsSlice,
    meta: metaSlice,
    [moneyExchangeApi.reducerPath] : moneyExchangeApi.reducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware().concat([moneyExchangeApi.middleware]),
});



initializeStore(store);

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




