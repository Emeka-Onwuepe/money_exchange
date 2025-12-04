import { useAppDispatch, useAppSelector } from "./../../integrations/hooks";

export default function TransactionForm ({transactionFormState, setTransactionFormState}: {transactionFormState: any, setTransactionFormState: React.Dispatch<React.SetStateAction<any>>}){

const user =  useAppSelector(state=>state.user)
const customers =  useAppSelector(state=>state.customers.data)
const dispatch = useAppDispatch();

const TransactionOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
  	setTransactionFormState({ ...transactionFormState, [e.target.name]: e.target.value })
	}


  const OnSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log("Submitted")
  }


  return (
	<div>
	   <form onSubmit={OnSubmit}>

      <label htmlFor="Amount">Amount</label>
      <input type="number" step='0.1' name="amount" placeholder='0.1'
       required value={transactionFormState.amount} onChange={TransactionOnChange} />
      
      <label htmlFor="base_currency">Base Currency</label>
      <select name="base_currency" id="base_currency" required  
       value={transactionFormState.base_currency} onChange={(e)=>TransactionOnChange}
      >
        <option value="" >Select Currency</option>
        <option value="RMB">RMB</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <label htmlFor="usd_rate">USD Rate</label>
      <input name='usd_rate' type='number' step='0.1'  placeholder='0.0'
       required  value={transactionFormState.usd_rate} onChange={TransactionOnChange}/>

      <label htmlFor="usd_price">USD Price</label>
      <input name='usd_price' type='number'  step='0.1' placeholder='0.0' 
      required  value={transactionFormState.usd_price} onChange={TransactionOnChange}/>
      <label htmlFor="naira_rate">Naira Rate</label>
      <input name='naira_rate' type='number' step='0.1'  placeholder='0.0'
       required  value={transactionFormState.naira_rate} onChange={TransactionOnChange} />
      
      <label htmlFor="payee">Payee</label>
      <input type="text" name="payee" placeholder='Payee' 
       value={transactionFormState.payee} required onChange={TransactionOnChange} />

      <button type="submit">Add Transaction</button>
    </form>
	</div>
  );
}