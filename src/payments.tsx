import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "./integrations/hooks"
import "./styles/payments.css"
import { useEffect, useState } from "react"
import { useGetPaymentsQuery } from "./integrations/features/apis/apiSlice"
import PaymentForm from "./components/forms/paymentForm"
import { addCommas } from "./components/helper";
import { setLoading } from "./integrations/features/meta/metaSlice"
import { addAlert } from "./integrations/features/alert/alertSlice"




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
const [payments, setPayments] = useState<{[key: string]: any}>([])
const navigate = useNavigate()
const dispatch = useAppDispatch()


 useEffect(()=>{
    if(!user.logedin || !user.verified){ 
          navigate('/login')

    }
  },[user])
const [paymentForm, setPaymentForm] = useState({ id: "", amount: 0,
                                                 transaction: parseInt(id) });

const [paymentSum, setPaymentSum] = useState({ payments: 0, total: 0})


 const { data: paymentsData, error, isLoading } = useGetPaymentsQuery(
        {token:user.usertoken,transaction_id:id}
    );


useEffect(()=>{

    dispatch(setLoading(isLoading))
    if(error){
        dispatch(addAlert({...error, page:'payments'}))
                   }

    },[isLoading,error])

    
useEffect(()=>{
    if(paymentsData && paymentsData.payments){
        setPayments(paymentsData.payments)   
    }

},[paymentsData])

useEffect(()=>{

let sum = 0

payments.forEach((data:any) => {
  sum += data.amount
});
 
setPaymentSum({payments:sum,total:sum+transaction.paid_amount})

},[payments])


  return (
    <div>
    <div className="sectionCard">
       <h3 className="sectionTitle">Transaction</h3> 
       <div  className="flex_container" id="transaction">
         <p><strong>Date:</strong><span>  {transaction.date}</span></p>
           <p ><strong>Name:</strong><span>  {customer.full_name}</span></p>

                <p ><strong>Base:</strong><span>  {transaction.base_currency}</span></p>
                <p ><strong>Amount:</strong><span>  {addCommas(transaction.amount)}</span></p>
                <p ><strong>USD Price:</strong><span>  {addCommas(transaction.usd_price)}</span></p>
                <p ><strong>USD Rate:</strong><span>  {addCommas(transaction.usd_rate)}</span></p>
                <p ><strong>USD Ask:</strong><span>  {addCommas(transaction.usd_ask)}</span></p>
                <p ><strong>USD Bid:</strong><span>  {addCommas(transaction.usd_bid)}</span></p>
                <p ><strong>USD Gain:</strong><span>  {addCommas(transaction.usd_gain)}</span></p>
                <p ><strong>Naira Rate:</strong><span>  {addCommas(transaction.naira_rate)}</span></p>
                <p ><strong>Naira:</strong><span>  {addCommas(transaction.naira)}</span></p>
                <p ><strong>Paid Amount:</strong><span>  {addCommas(transaction.paid_amount)}</span></p>
                <p ><strong>Payments:</strong><span>  {addCommas(paymentSum.payments)}</span></p>
                <p ><strong>Total Payments:</strong><span>  {addCommas(paymentSum.total)}</span></p>
                <p ><strong>Balance:</strong><span>  {addCommas(paymentSum.total - transaction.naira)}</span></p>
                <p ><strong>Payee:</strong><span>  {payee.full_name}</span></p>
                <p ><strong>Receipt:</strong><span>  {transaction.reciept?<a target="blank" href={transaction.reciept}>View</a>: "no reciept"}</span></p>
       </div>
    </div>
    <div className="flex_container payment_flex">
        <PaymentForm user = {user} setPayments={setPayments} paymentForm = {paymentForm} setpaymentForm = {setPaymentForm} transaction={parseInt(id)} />
        {payments && (payments.map((payment: any, index: number) => (
            <div key={index} className="payments">
                <p>{payment.date}</p>
                <p>{addCommas(payment.amount)}</p>
                <button onClick={()=>setPaymentForm(payment)}>Edit</button>
            </div>)
            ))}

    </div>
    </div>
  )
}