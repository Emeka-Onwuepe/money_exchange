import { useAppDispatch, useAppSelector } from "./../../integrations/hooks";
import formStyles from "../../styles/forms";
import Select from "react-select";
import { addSingleExchange } from "../../integrations/features/exchange/exchangeSlice";
import { baseUrl, useExchangeMutation } from "../../integrations/features/apis/apiSlice";
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";



const sendTransaction = async (formdata:any) => {
  return axios.post(`${baseUrl}/exchange`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Token ${data.token}`,
      },
    })
    .then((res) => {
      return {
        data: res.data,
        success: true,
        status: res.status,
      };
    })
    .catch((err) => {
      return {
        type: "Error",
        success: false,
        data: err.response.data,
        status: err.status,
      };
    });
};



export default function TransactionForm ({transactionFormState, setTransactionFormState}: {transactionFormState: any, setTransactionFormState: React.Dispatch<React.SetStateAction<any>>}){

const user =  useAppSelector(state=>state.user)
const customers =  useAppSelector(state=>state.customers.data)
const payees =  useAppSelector(state=>state.payees.data)
const dispatch = useAppDispatch();
const [exchangeApi, { isLoading: cLoading }] = useExchangeMutation();

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

const currencies = getOptions(['RMB', 'USD', 'EUR', 'GBP', 'JPY',
                               'CAD', 'AUD', 'CHF', 'CNY', 'INR'],
                               'currency')
const payeeOptions = getOptions(payees,'payee')
const customerOptions = getOptions(customers,'customers')
const channelOptions = [{value:'transfer',label:'transfer'},
                        {value:'cash',label:'cash'},
                        {value:'credit',label:'credit'}
]

const [fileData,setFile] = useState<File|"">()

const TransactionOnChange = (e: ChangeEvent<HTMLInputElement>) =>{
  	setTransactionFormState({ ...transactionFormState, [e.target.name]: e.target.value })
	}

const selectChange = (option:any,target:string) =>{
  const newValue = option ? option.value : ''
  setTransactionFormState({...transactionFormState, [target]: newValue})

}

// const handleFile = (option:any,target:string) =>{
//   const newValue = option ? option.value : ''
//   setTransactionFormState({...transactionFormState, [target]: newValue})

// }

const handleFile = (e: ChangeEvent<HTMLInputElement>)=>{
      if(!e.target.files) return
    	setTransactionFormState({ ...transactionFormState, "reciept" : e.target.value })
      setFile(e.target.files[0])

}

useEffect(()=>{
console.log('filedata',fileData)
},[fileData])


  const OnSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(transactionFormState.amount  == 0 || !transactionFormState.amount) return
    if (transactionFormState.id == "") {
      // Add new transaction
        let { id, ...formdData } = transactionFormState;
        // create form
        let form = new FormData();
        for (const [key, value] of Object.entries(formdData)) {
          if (value instanceof File || value instanceof Blob) {
            form.append(key, value as Blob);
          } else if (value === null || value === undefined) {
            form.append(key, "");
          } else {
            form.append(key, String(value));
          }
        }


        const data = { data: { data: form, action: "create" }, token: user.usertoken };
        let res = await exchangeApi(data);


        if (res.data) {
          dispatch(addSingleExchange(res.data.payee));
          setTransactionFormState({ id:"",base_currency: 'RMB', amount: 0.0,
                             usd_rate: 17.0, usd_price: 16.8, naira_rate: 212.12,
                              paid_amount:0.0,channel:'transfer', reciept:"",
                              payee: '',customer:"" });

              }
        } else {

            // create form
        let form = new FormData();
        for (const [key, value] of Object.entries(transactionFormState)) {
          if (value instanceof File || value instanceof Blob) {
            console.log('file value',value)
            form.append(key, value as Blob);
          } else if (value === null || value === undefined) {
            form.append(key, "");
          } else if (key == 'reciept'){
            form.append(key, fileData as Blob);
          }
          else {
            form.append(key, String(value));
          }
        }

        form.append('action','update')
        console.log(form)
        
        const res = await sendTransaction(form)
        console.log('res',res)
          // const data = { data: { data: form, action: "update" }, token: user.usertoken };
          // let res = await exchangeApi(data);
          // if (res.data) {
          //   dispatch(addSingleExchange(res.data.payee));
          //   setTransactionFormState({ id:"",base_currency: 'RMB', amount: 0.0,
          //                    usd_rate: 17.0, usd_price: 16.8, naira_rate: 212.12,
          //                    paid_amount:0.0,channel:'transfer',
          //                    payee: '',customer:"" ,reciept:""});

          //     }
          }
  }


  return (
	<div style={formStyles.formsColumn}>
    <h3 style={formStyles.formTitle}>Add / Edit Transactions</h3>
	   <form style={formStyles.form} onSubmit={OnSubmit}>
      <div className="flex_container">
      <div className="flex_item">
       <label htmlFor="base_currency">Base Currency</label>
      <Select
      options={currencies}
      value={currencies.find(c => c.value === transactionFormState.base_currency) || null}
       onChange={(option:any) => selectChange(option,'base_currency')}
       isSearchable
       name="base_currency"
       placeholder="Select currency"
       className="select"
      />
      <label htmlFor="Amount">Amount</label>
      <input style={formStyles.input} type="number" step='0.1' name="amount" placeholder='0.1'
       required value={transactionFormState.amount} onChange={TransactionOnChange} />
      
      <label htmlFor="usd_rate">USD Rate</label>
      <input style={formStyles.input} name='usd_rate' type='number' step='0.1'  placeholder='0.0'
       required  value={transactionFormState.usd_rate} onChange={TransactionOnChange}/>

      <label htmlFor="usd_price">USD Price</label>
      <input style={formStyles.input} name='usd_price' type='number'  step='0.1' placeholder='0.0' 
      required  value={transactionFormState.usd_price} onChange={TransactionOnChange}/>

      <label htmlFor="naira_rate">Naira Rate</label>
      <input style={formStyles.input} name='naira_rate' type='number' step='0.1'  placeholder='0.0'
       required  value={transactionFormState.naira_rate} onChange={TransactionOnChange} />

       
       <label htmlFor="paid_amount">Paid Amount in Naira</label>
      <input style={formStyles.input} name='paid_amount' type='number' step='0.1'  placeholder='0.0'
       required  value={transactionFormState.paid_amount} onChange={TransactionOnChange} /> 

      </div>

      <div className="flex_item">
        
      <label htmlFor="channel">Channel</label>
      <Select
      options={channelOptions}
      value={channelOptions.find(c => c.value === transactionFormState.channel) || null}
       onChange={(option:any) => selectChange(option,'channel')}
       isSearchable
       name="channel"
       placeholder="Select channel"
      className="select"
       required
      /> 

      <label htmlFor="customer">Customer</label>
      <Select
      options={customerOptions}
      value={customerOptions.find(c => c.value === transactionFormState.customer) || null}
       onChange={(option:any) => selectChange(option,'customer')}
       isSearchable
       name="customer"
       placeholder="Select customer"
       required
      className="select"
      />
      
      <label htmlFor="payee">Payee</label>
      <Select
      options={payeeOptions}
      value={payeeOptions.find(c => c.value === transactionFormState.payee) || null}
       onChange={(option:any) => selectChange(option,'payee')}
       isSearchable
       name="payee"
       placeholder="Select payee"
       required
      className="select"
      />

      <label htmlFor="reciept">Reciept</label>
       <input style={formStyles.input} name='reciept' type="file"  placeholder='Upload Receiept'
      value={transactionFormState.reciept} onChange={handleFile} /> 


      </div>
      </div>
      <button style={formStyles.submitBtn} type="submit">Add Transaction</button>
    </form>
	</div>
  );
}