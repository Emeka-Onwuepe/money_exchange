import './styles/App.css'
import { useAppDispatch, useAppSelector } from "./integrations/hooks";
import { useEffect, useState } from 'react';
import { addExchange } from './integrations/features/exchange/exchangeSlice';
import TransactionForm from './components/forms/transactionForm';
import TransactionTable from './components/tables/transactions';
import { useGetExchangeQuery } from './integrations/features/apis/apiSlice';



// const initialErrorState = {
//         first_name: false, last_name: false, phone_number: false, email: false, phoneNumLength: false
//     }
//     useEffect(() => {
//         storedispatch(load(LOADED))
//     }, []);
//     const [formstate, setFormstate] = useState(initialState);
//     const [errorstate, setErrorstate] = useState(initialErrorState);
//     const { first_name, last_name, phone_number, email, password, confirm_password } = formstate;
//     let errorTest = {
//         "name": /[^a-z\s]/i,
//         "phone_number": /[^0-9+\s]/i,
//         "email": /^[a-z]+\d*[a-z]*@[a-z]+\.\w+\s*$/gi,
//     }

//     const onChange = (e) => {
//         setFormstate({ ...formstate, [e.target.name]: e.target.value })
//     }


interface transactionForm { id:string,base_currency: string, amount: number,
                             usd_rate: number, usd_price: number, naira_rate: number, 
                            paid_amount:number,channel:string, reciept: File|string,
                             payee: string,customer:string }



function App() {
const user =  useAppSelector(state=>state.user)
const customers =  useAppSelector(state=>state.customers.data)
const transactions = useAppSelector(state => state.exchange.data)
const payees = useAppSelector(state => state.payees.data)

const dispatch = useAppDispatch();
const { data: transactionData, error: transactionError, isLoading: transactionLoading } = useGetExchangeQuery(user.usertoken);


const [transactionFormState, setTransactionFormState] = useState({ id:"",base_currency: 'RMB', amount: 0.0,
                             usd_rate: 16.8, usd_price: 17.0, naira_rate: 212.12, 
                            paid_amount:0.0,channel:'transfer', reciept: "",
                             payee: '',customer:"" })

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
console.log(transactionFormState)
  },[transactionFormState])
  
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
     customers={customers} payees={payees} />
  </div>
  <div>
    <TransactionForm transactionFormState={transactionFormState} setTransactionFormState={setTransactionFormState} /> 
  </div>
  </>
)

}

export default App
