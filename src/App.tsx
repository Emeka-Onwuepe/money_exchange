import './styles/App.css'
import { useAppDispatch, useAppSelector } from "./integrations/hooks";
import { useEffect, useState } from 'react';
import { addExchange } from './integrations/features/exchange/exchangeSlice';
import TransactionForm from './components/forms/transactionForm';
import TransactionTable from './components/tables/transactions';
import { useGetExchangeQuery, 
        useGetCustomerQuery,
        useGetPayeeQuery, } from './integrations/features/apis/apiSlice';
import { useNavigate } from 'react-router';
import { setLoading } from './integrations/features/meta/metaSlice';
import { addAlert } from './integrations/features/alert/alertSlice';
import { readFromLocalStorage, writeToLocalStorage } from './integrations/localStorage';
import { addCustomers } from './integrations/features/customer/customerSlice';
import { addPayees } from './integrations/features/payee/payeeSlice';



function App() {


const navigate = useNavigate()
const user =  useAppSelector(state=>state.user)
const customers =  useAppSelector(state=>state.customers.data)
const transactions = useAppSelector(state => state.exchange.data)
const payees = useAppSelector(state => state.payees.data)

const dispatch = useAppDispatch();
const { data: transactionData, error,isLoading} = useGetExchangeQuery({token:user.usertoken});

const { data: customersData, error: customersError} = useGetCustomerQuery(
        user.usertoken
    );

const { data: payeesData, error: payeesError} = useGetPayeeQuery(user.usertoken);
    

 useEffect(()=>{
        dispatch(setLoading(isLoading))
        if(error){
              dispatch(addAlert({...error, page:'transactionPage'}))
                  }
                    
     },[isLoading])

useEffect(() => {
        if (customersData && customersData.customers) {
            dispatch(addCustomers({ data: customersData.customers, save: true }));
        }

        if (payeesData && payeesData.payees) {
            dispatch(addPayees({ data: payeesData.payees, save: true }));
        }
    }, [customersData, payeesData]);


useEffect(()=>{
    dispatch(setLoading(isLoading))
    if(customersError){
        dispatch(addAlert({...customersError, page:'transactionPage'}))
                   }
     if(payeesError){
        dispatch(addAlert({...payeesError, page:'transactionPage'}))
                   }
    },[isLoading,customersError,payeesError])


const [writeSate,SetWriteState] = useState(false)
const [transactionFormState, setTransactionFormState] = useState({ id:"",base_currency: 'RMB', amount: 0.0,
                            usd_rate: 7.0, naira_rate_cp: 214.8, naira_rate_sp: 214.9,
                            paid_amount:0.0,channel:'transfer', bank:'none', reciept: "",
                             payee: '',customer:"" })



   useEffect(() => {
       const formData = readFromLocalStorage('transaction_form')
       if(formData){
        setTransactionFormState(formData)
        SetWriteState(true)
       }
    }, []);

   useEffect(() => {
      if(writeSate){
       writeToLocalStorage('transaction_form', {...transactionFormState})
      }

    }, [transactionFormState]);

  const checkNull = (data: any) => {
        const Data = { ...data };
        for (const key in Data) {
            if (!Data[key]) {
                Data[key] = "";
            }
        }
        return Data;
    };

  useEffect(()=>{
    if(!user.logedin || !user.verified){ 
          navigate('/login')

    }
  },[user])
  
   useEffect(() => {
        if (transactionData && transactionData.transactions) {
            dispatch(addExchange({ data: transactionData.transactions, save: true }));
        }
    }, [transactionData]);


return(
  <>
  <div>
    <TransactionTable setTransactionForm={setTransactionFormState} 
    checkNull={checkNull} transactions={transactions}
     customers={customers} payees={payees} user={user} />
  </div>
  <div>
    <TransactionForm transactionFormState={transactionFormState} setTransactionFormState={setTransactionFormState} /> 
  </div>
  </>
)

}

export default App
