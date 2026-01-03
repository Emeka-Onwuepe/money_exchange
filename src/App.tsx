import './styles/App.css'
import { useAppDispatch, useAppSelector } from "./integrations/hooks";
import { useEffect, useState } from 'react';
import { addExchange } from './integrations/features/exchange/exchangeSlice';
import TransactionForm from './components/forms/transactionForm';
import TransactionTable from './components/tables/transactions';
import { useGetExchangeQuery } from './integrations/features/apis/apiSlice';
import { useNavigate } from 'react-router';
import { setLoading } from './integrations/features/meta/metaSlice';
import { addAlert } from './integrations/features/alert/alertSlice';


interface transactionForm { id:string,base_currency: string, amount: number,
                             usd_rate: number, usd_price: number, naira_rate: number, 
                            paid_amount:number,channel:string, reciept: File|string,
                             payee: string,customer:string }



function App() {


const navigate = useNavigate()
const user =  useAppSelector(state=>state.user)
const customers =  useAppSelector(state=>state.customers.data)
const transactions = useAppSelector(state => state.exchange.data)
const payees = useAppSelector(state => state.payees.data)

const dispatch = useAppDispatch();
const { data: transactionData, error,isLoading} = useGetExchangeQuery({token:user.usertoken});

 useEffect(()=>{
        dispatch(setLoading(isLoading))
        if(error){
              dispatch(addAlert({...error, page:'getStatementForm'}))
                  }
                    
     },[isLoading])



const [transactionFormState, setTransactionFormState] = useState({ id:"",base_currency: 'RMB', amount: 0.0,
                            usd_rate: 17.0, usd_price: 16.8,naira_rate: 212.12, 
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
