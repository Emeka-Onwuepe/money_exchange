import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./integrations/hooks";

const Customers = () => {

  const customers = useAppSelector(state => state.customers.data);
  const payees = useAppSelector(state => state.payees.data);
  const dispatch = useAppDispatch();
  const [customerForm, setCustomerForm] = useState({full_name:'',phone_number:"",email:""})


    const CustomerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setCustomerForm({ ...customerForm, [e.target.name]: e.target.value })
    }
    
    const OnSubmitCustomer = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
    }
    
    return (
        <div>
            <div>
              <form onSubmit={OnSubmitCustomer} >
                  <input type="text" placeholder='Full Name' required />
                  <input type="text" placeholder='Phone Number' required/>
                  <input type="email" placeholder='Email' />
                  <button type="submit">Add Customer</button>
                </form>
                <form >
                  <input type="text" placeholder='Full Name' required />
                  <input type="text" placeholder='Phone Number' required/>
                  <input type="email" placeholder='Email' />
                  <button type="submit">Add Payee</button>
                </form>
            </div>
        </div>
        )}

export default Customers;