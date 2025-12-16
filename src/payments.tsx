import { useParams } from "react-router"
import { useAppSelector } from "./integrations/hooks"
import "./styles/payments.css"
import { useEffect } from "react"
import { useGetPaymentsQuery } from "./integrations/features/apis/apiSlice"



export default function Payments() {
let param = useParams()
const id = param.transactionId || '0'
const exchange = useAppSelector(state=>state.exchange.data)
const customers = useAppSelector(state=>state.customers.data)
const user = useAppSelector(state=>state.user)

// const payees = useAppSelector(state=>state.payees.data)
const [transaction] = exchange.filter(trans=>trans.id == parseInt(id))
const [customer] = customers.filter(c=>c.id==transaction.customer)
const [payee] = customers.filter(p=>p.id==transaction.payee)


 const { data: paymentsData, error: paymentsError, isLoading: paymentsLoading } = useGetPaymentsQuery(
        {token:user.usertoken,transaction_id:id}
    );

useEffect(()=>{
    if(paymentsData && paymentsData.payments){
        console.log(paymentsData.payments)
    }

},[paymentsData])


  return (
    <>
    <div>payments {param.transactionId}</div>
    <div>
       <h3>Transaction</h3> 
       <div className="flex_container" id="transaction">
         <p><strong>Date:</strong><span>  {transaction.date}</span></p>
                <p ><strong>Base:</strong><span>  {transaction.base_currency}</span></p>
                <p ><strong>Amount:</strong><span>  {transaction.amount}</span></p>
                <p ><strong>USD Price:</strong><span>  {transaction.usd_price}</span></p>
                <p ><strong>USD Rate:</strong><span>  {transaction.usd_rate}</span></p>
                <p ><strong>USD Ask:</strong><span>  {transaction.usd_ask}</span></p>
                <p ><strong>USD Bid:</strong><span>  {transaction.usd_bid}</span></p>
                <p ><strong>USD Gain:</strong><span>  {transaction.usd_gain}</span></p>
                <p ><strong>Naira Rate:</strong><span>  {transaction.naira_rate}</span></p>
                <p ><strong>Naira:</strong><span>  {transaction.naira}</span></p>
                <p ><strong>Paid Amount:</strong><span>  {transaction.paid_amount}</span></p>
                <p ><strong>Balance:</strong><span>  {transaction.balance}</span></p>
                <p ><strong>Name:</strong><span>  {customer.full_name}</span></p>
                <p ><strong>Payee:</strong><span>  {payee.full_name}</span></p>
                <p ><strong>Receipt:</strong><span>  {transaction.reciept}</span></p>
       </div>
    </div>
    </>
  )
}