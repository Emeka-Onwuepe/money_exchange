import './styles/App.css'
import { useAppDispatch, useAppSelector } from "./integrations/hooks";
import { useEffect, useState } from 'react';
import { addExchange } from './integrations/features/exchange/exchangeSlice';
import TransactionForm from './components/forms/transactionForm';



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



function App() {
const user =  useAppSelector(state=>state.user)
const customers =  useAppSelector(state=>state.customers.data)
const exchanges = useAppSelector(state => state.exchange.data)
const dispatch = useAppDispatch();

const [transactionFormState, setTransactionFormState] = useState({base_currency: 'RMB', amount: 0.0,
                             usd_rate: 16.8, usd_price: 17.0, naira_rate: 212.12, payee: '' })

const [customerForm, setCustomerForm] = useState({full_name:'',phone_number:"",email:""})


const CustomerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  setCustomerForm({ ...customerForm, [e.target.name]: e.target.value })
}

const data = Array.from({ length: 10 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10), // recent dates
      base_currency: ['RMB', 'USD', 'EUR'][i % 3],
      usd_rate: +(6.5 + i * 0.1).toFixed(2),
      usd_price: +(6.3 + i * 0.12).toFixed(2),
      naira_rate: +(210 + i * 3),
      amount: +(100 + i * 25).toFixed(2),
      payee: `Payee ${i + 1}`,
      customer: `CUST${1000 + i}`,
      customer_id: i + 1,
      customer_name: `Customer ${i + 1}`,
      reciept: `REC-${(100000 + i).toString()}`
    }))

    useEffect(() => {
      dispatch(addExchange({ data: data, save: true }))
    }, []);

    useEffect(() => {
      console.log(transactionFormState
      )
    },[transactionFormState])

  
return(
  <>
  <div>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Payee</th>
                <th>USD Rate</th>
                <th>USD Price</th>
                <th>Naira Rate</th>
                <th>Base</th>
                <th>Amount</th>
                <th>Naira</th>
                <th>USD Bid</th>
                <th>USD Ask</th>
                <th>USD Gain</th>
                <th>Receipt</th>
            </tr>
        </thead>
        <tbody>
            {exchanges.map((exchange, index) => (
              exchange.amount ? (
                <tr key={index}>
                    <td>{exchange.date}</td>
                    <td>{exchange.customer_name}</td>
                    <td>{exchange.payee}</td>
                    <td>{exchange.usd_rate}</td>
                    <td>{exchange.usd_price}</td>
                    <td>{exchange.naira_rate}</td>
                    <td>{exchange.base_currency}</td>
                    <td>{exchange.amount.toFixed(2)}</td>
                    <td>{(exchange.amount * exchange.naira_rate).toFixed(1)}</td>
                    <td>{(exchange.amount / exchange.usd_rate).toFixed(1)}</td>
                    <td>{(exchange.amount / exchange.usd_price).toFixed(1)}</td>
                    <td>{((exchange.usd_price - exchange.usd_rate) * (exchange.amount / exchange.usd_rate)).toFixed(1)}</td>
                    <td>{exchange.reciept}</td>
                </tr>) : null
            ) )}
        </tbody>
        <tfoot></tfoot>
    </table>
  </div>

  <div>
    <form>
      <input type="text" placeholder='Full Name' required />
      <input type="text" placeholder='Phone Number' required/>
      <input type="email" placeholder='Email' />
      <button type="submit">Add Customer</button>
    </form>
  </div>

  <div>
    <TransactionForm transactionFormState={transactionFormState} setTransactionFormState={setTransactionFormState} /> 
  </div>
  </>
)

}

export default App
