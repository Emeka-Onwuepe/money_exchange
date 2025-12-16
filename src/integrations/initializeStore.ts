import { get_initial_user_data, loginUser } from './features/user/usersSlice';
import { get_initial_customers_data, addCustomers } from './features/customer/customerSlice';
import { get_initial_exchange_data, addExchange } from './features/exchange/exchangeSlice';
import { addPayees, get_initial_payees_data } from './features/payee/payeeSlice';
import { addPayments, get_initial_payments_data } from './features/payment/paymentSlice';


const initializeStore = async (store: any) => {
  const user_data = await get_initial_user_data();
  store.dispatch(loginUser({ ...user_data, save: false }));

  const customers = await get_initial_customers_data()
  store.dispatch(addCustomers({ data: customers.data, save: false }))

  const exchange = await get_initial_exchange_data()
  store.dispatch(addExchange({ data: exchange.data, save: false }));

  const payees = await get_initial_payees_data()
  store.dispatch(addPayees({ data: payees.data, save: false }))

   const payments = await get_initial_payments_data()
  store.dispatch(addPayments({ data: payments.data, save: false }))

};

export default initializeStore;