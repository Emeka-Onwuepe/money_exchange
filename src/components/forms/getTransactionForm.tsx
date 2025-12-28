import { useEffect, useState } from "react"
import Select from "react-select"
import { useLazyGetExchangeQuery } from "../../integrations/features/apis/apiSlice"
import { addExchange } from "../../integrations/features/exchange/exchangeSlice"
import { useAppDispatch } from "../../integrations/hooks"
import { addAlert } from "../../integrations/features/alert/alertSlice"

const styles = {
    date: {display: "block",
            width: "95%",
            margin: "5px auto",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #d8dee7",
            fontSize: 14},

    select: {
        display: "block",
        width: "100%",
        margin: "5px auto",
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #d8dee7",
        fontSize: 14,
        background: "#fff"
    },
    submitBtn: {
        marginTop: '8px',
         padding: '8px 12px',
         borderRadius: '6px',
         border: 'medium',
         background: 'rgb(11, 95, 255)',
        color: 'rgb(255, 255, 255)',
        cursor: 'pointer',
        fontWeight: '600',
        width:'100%'
 
        
    },
}

export default function GetTransactionForm({customers,payees,user}: 
  {customers: any[], payees: any[] , user:any}) {

const dispatch = useAppDispatch();
const [getExchange, { data: transactionData, error: transactionError, 
  isLoading: transactionLoading }] = useLazyGetExchangeQuery()

useEffect(() => {
  if (transactionData && transactionData.transactions) {
      dispatch(addExchange({ data: transactionData.transactions, save: true }));
  } 

  if (transactionError) {
      dispatch(addAlert({ ...transactionError, page: 'getTransactionForm' }))
  }

}, [transactionData]);

const reset = () =>{
  getExchange({ data: "", action: "" , token: user.usertoken });
}

const getOptions = (list:any[],type:string) =>{

  interface SelectOption { value: string; label: string }
  let result: SelectOption[] = []
  if(type=="currency"){
    list.forEach((data)=>{
      result.push({value:data,label:data})
    })
  }else if(type == 'payee'){
    list.forEach((data)=>{
      result.push({value:data.id,label:data.name})
    })
  }else if(type == 'customers'){
    list.forEach((data)=>{
      result.push({value:data.id,label:data.full_name})
    })
  }
  return result
}

const payeeOptions = getOptions(payees,'payee')
const customerOptions = getOptions(customers,'customers')
const init = {date:"",customer:'',payee:''}
const [formState,setFormState] = useState(init)
const [neeededInfo,setNeededInfo] = useState({date:false,customer:true,payee:false})

const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  setFormState({ ...formState, [e.target.name]: e.target.value })
}
const selectChange = (option:any,target:string) =>{
  const newValue = option ? option.value : ''
  setFormState({...formState, [target]: newValue})

}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
  console.log("Get transactions with",formState)
  type FormKey = keyof typeof init
  let action: FormKey | undefined = undefined
  for (const key of Object.keys(formState) as FormKey[]) {
    if (formState[key] !== "") {
      action = key
      break
    }
  }
  if (!action) {
    console.warn("No action selected")
    return
  }
  const data = { data: formState[action], action: action , token: user.usertoken };
  getExchange(data)
  setFormState(init)
  setNeededInfo({date:false,customer:true,payee:false})
  // use `data` for the request...
}

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <select style={styles.select}
                name="neededInfo"
                value={neeededInfo.customer ? "customer" : neeededInfo.payee ? "payee" : "date"}
                onChange={(e) =>
                    setNeededInfo({
                        date: e.target.value === "date",
                        customer: e.target.value === "customer",
                        payee: e.target.value === "payee",
                    })
                }
            >
                <option value="date">Date</option>
                <option value="customer">Customer</option>
                <option value="payee">Payee</option>
            </select>

            {neeededInfo.date?
            <>
            <label htmlFor="date">Date</label>
             <input type="date" style={styles.date} name="date" onChange={onDateChange} required />
             </>:
            neeededInfo.customer ?
             <>
                   <label htmlFor="customer">Customer</label>
                   <Select
                   options={customerOptions}
                   value={customerOptions.find(c => c.value === formState.customer) || null}
                    onChange={(option:any) => selectChange(option,'customer')}
                    isSearchable
                    name="customer"
                    placeholder="Select customer"
                    required
                   className="select"
                   />
                   </>:
            neeededInfo.payee? 
            <>
            <label htmlFor="payee">Payee</label>
                   <Select
                   options={payeeOptions}
                   value={payeeOptions.find(c => c.value === formState.payee) || null}
                    onChange={(option:any) => selectChange(option,'payee')}
                    isSearchable
                    name="payee"
                    placeholder="Select payee"
                    required
                   className="select"
                   />
            </>
            :
            null}
            <button style={styles.submitBtn} type="submit">Get Transcations</button>
        </form>
         <button style={styles.submitBtn} onClick={reset}>Reset</button>

    </div>
  )
}
