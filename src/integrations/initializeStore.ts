import { get_initial_user_data, loginUser } from './features/user/usersSlice';
import { get_initial_customers_data, addCustomers } from './features/customer/customerSlice';
import { get_initial_exchange_data, addExchange } from './features/exchange/exchangeSlice';


const initializeStore = async (store: any) => {
  const user_data = await get_initial_user_data();
  store.dispatch(loginUser({ ...user_data, save: false }));

  const customers = await get_initial_customers_data()
  store.dispatch(addCustomers({ data: customers.data, save: false }))

  const exchange = await get_initial_exchange_data()
  store.dispatch(addExchange({ data: exchange.data, save: false }));
  
};

export default initializeStore;