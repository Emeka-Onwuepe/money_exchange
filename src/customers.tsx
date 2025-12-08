import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./integrations/hooks";
import { useCustomerMutation, useGetCustomerQuery, useGetPayeeQuery, usePayeeMutation } from "./integrations/features/apis/apiSlice";
import { addCustomers, addSingleCustomer } from "./integrations/features/customer/customerSlice";
import { addPayees, addSinglePayee } from "./integrations/features/payee/payeeSlice";

const Customers = () => {

  const customers = useAppSelector(state => state.customers.data);
  const payees = useAppSelector(state => state.payees.data);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

 const [customerApi, { isLoading:cLoading }] = useCustomerMutation();
 const [payeeApi, { isLoading:pLoading }] = usePayeeMutation();

 const [customerForm, setCustomerForm] = useState({id:"", full_name:'',phone_number:"",email:""})
const [payeeForm, setPayeeForm] = useState({id:"", name:'',phone_number:"",email:""})

 const [customerState, setCustomerState] = useState(customers)
  const [payeeState, setPayeeState] = useState(payees)




  const { data: customersData, 
    error: customersError, 
    isLoading: customersLoading } = useGetCustomerQuery(user.usertoken);

    const { data: payeesData, 
    error: payeesError, 
    isLoading: payeesLoading } = useGetPayeeQuery(user.usertoken);

    const checkNull = (data: any) =>{
        const Data = {...data}
        for (const key in Data) {
            if(!Data[key]){
                Data[key] = ""
            }
        }
        return Data
    }

    const [customerSearch, setCustomerSearch] = useState("")
    const [payeeSearch, setPayeeSearch] = useState("")


    const searchCustomer = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let value = e.target.value
        setCustomerSearch(value)
        console.log("Searching for:", value)
        let filtered = customers.filter(customer=>
            customer.full_name.toLowerCase().includes(value.toLowerCase()) ||
            customer.phone_number.toLowerCase().includes(value.toLowerCase()) ||
            customer.email.toLowerCase().includes(value.toLowerCase())
            )
        setCustomerState(filtered)
    }

    const searchPayee = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let value = e.target.value
        setPayeeSearch(value)
        let filtered = payees.filter(payee =>
            payee.name.toLowerCase().includes(value.toLowerCase()) ||
            payee.phone_number.toLowerCase().includes(value.toLowerCase()) ||
            payee.email.toLowerCase().includes(value.toLowerCase())
            )
        setPayeeState(filtered)
    }



    const CustomerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setCustomerForm({ ...customerForm, [e.target.name]: e.target.value })
    }

    const PayeeOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setPayeeForm({ ...payeeForm, [e.target.name]: e.target.value })
    }
    
    const OnSubmitCustomer = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      if(customerForm.id == ""){
        // Add new customer
        const { id, ...formdData } = customerForm
        const data = { data:{data:formdData,action:'create'}, 
                    token: user.usertoken }
        let res = await customerApi(data)
        if(res.data){
            dispatch(addSingleCustomer(res.data.customer))
            setCustomerForm({id:"", full_name:'',phone_number:"",email:""})
        }
        
      }else{

        const data = { data:{data:customerForm,action:'update'}, 
                    token: user.usertoken }
        let res = await customerApi(data)
        if(res.data){
            dispatch(addSingleCustomer(res.data.customer))
            setCustomerForm({id:"", full_name:'',phone_number:"",email:""})
        }
      }

    }

     const OnSubmitPayee = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      if(payeeForm.id == ""){
        // Add new payee
        const { id, ...formdData } = payeeForm
        const data = { data:{data:formdData,action:'create'}, 
                    token: user.usertoken }
        let res = await payeeApi(data)
        if(res.data){
            dispatch(addSinglePayee(res.data.payee))
            setPayeeForm({id:"", name:'',phone_number:"",email:""})
        }
        
      }else{

        const data = { data:{data:payeeForm,action:'update'}, 
                    token: user.usertoken }
        let res = await payeeApi(data)
        if(res.data){
            dispatch(addSinglePayee(res.data.payee))
            setPayeeForm({id:"", name:'',phone_number:"",email:""})
        }
      }

    }




useEffect(() => {
    
  if (customersData && customersData.customers) {
    dispatch(addCustomers({data:customersData.customers,save:true}));
  }

   if (payeesData && payeesData.payees) {
    dispatch(addPayees({data:payeesData.payees,save:true}));
  }

}, [customersData,payeesData]);


useEffect(() => {
    
  setCustomerState(customers)
  setPayeeState(payees)

}, [customers,payees]);


    
    return (
        <div>
            <div>
                <div>
                <h3>Add Customer</h3>
              <form onSubmit={OnSubmitCustomer} >
                  <input type="text" placeholder='Full Name' name="full_name" 
                  value={customerForm.full_name} onChange={CustomerOnChange} required />
                  <input type="text" placeholder='Phone Number' name="phone_number" 
                  value={customerForm.phone_number} onChange={CustomerOnChange} required/>
                  <input type="email" placeholder='Email' name="email" 
                  value={customerForm.email} onChange={CustomerOnChange} />
                  <button type="submit">{customerForm.id ? "Update Customer" : "Add Customer"}</button>
                </form>
                </div>
                <div>
                <form onSubmit={OnSubmitPayee}>
                  <input type="text" placeholder='Full Name' name="name"
                  required value={payeeForm.name} onChange={PayeeOnChange} />
                  <input type="text" placeholder='Phone Number' name="phone_number"
                  value={payeeForm.phone_number} onChange={PayeeOnChange} />
                  <input type="email" placeholder='Email' name="email" value={payeeForm.email} 
                  onChange={PayeeOnChange} />
                  <button type="submit">{payeeForm.id ? "Update Payee" : "Add Payee"}</button>
                </form>
                </div>
            </div>
            <div>
                <div>
                <h3>Customers</h3>
                <div>
                    <label htmlFor="searchCustomer">Search Customer</label>
                    <input type="text" name="searchCustomer"
                     placeholder="Search by name, phone or email" 
                     value={customerSearch}
                     onChange={searchCustomer}/>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const pageSize = 2; // Set the number of customers per page
                        const params = new URLSearchParams(window.location.search);
                        const currentPage = Math.max(1, parseInt(params.get("customerPage") || "1", 10));
                        const totalPages = Math.max(1, Math.ceil(customerState.length / pageSize));
                        const start = (currentPage - 1) * pageSize;
                        const paginated = customerState.slice(start, start + pageSize);

                        return (
                          <>
                            {paginated.map((customer: any, index: number) => (
                              <tr key={start + index}>
                                <td>{customer.full_name}</td>
                                <td>{customer.phone_number}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address || 'N/A'}</td>
                                <td>{customer.balance}</td>
                                <td><button onClick={() => setCustomerForm(checkNull(customer))}>Edit</button></td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan={6} style={{ textAlign: "center", paddingTop: 8 }}>
                                <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      const newPage = Math.max(1, currentPage - 1);
                                      const params = new URLSearchParams(window.location.search);
                                      params.set("customerPage", String(newPage));
                                      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
                                      setCustomerState((prev) => [...prev]); // Force re-render
                                    }}
                                    disabled={currentPage === 1}
                                  >
                                    Prev
                                  </button>
                                  <span>
                                    Page {currentPage} of {totalPages}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      const newPage = Math.min(totalPages, currentPage + 1);
                                      const params = new URLSearchParams(window.location.search);
                                      params.set("customerPage", String(newPage));
                                      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
                                      setCustomerState((prev) => [...prev]); // Force re-render
                                    }}
                                    disabled={currentPage === totalPages}
                                  >
                                    Next
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
                <div>
                     <h3>Payees</h3>
                     <div>
                    <label htmlFor="searchPayee">Search Payee</label>
                    <input type="text" name="searchPayee"
                     placeholder="Search by name, phone or email" 
                     value={payeeSearch}
                     onChange={searchPayee}/>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                    {(() => {
                        const pageSize = 1;
                        const params = new URLSearchParams(window.location.search);
                        const currentPage = Math.max(1, parseInt(params.get("payeePage") || "1", 10));
                        const totalPages = Math.max(1, Math.ceil(payeeState.length / pageSize));
                        const start = (currentPage - 1) * pageSize;
                        const paginated = payeeState.slice(start, start + pageSize);

                        return (
                            <>
                                {paginated.map((payee: any, index: number) => (
                                    <tr key={start + index}>
                                        <td>{payee.name}</td>
                                        <td>{payee.phone_number}</td>
                                        <td>{payee.email}</td>
                                        <td>{payee.address || "N/A"}</td>
                                        <td>
                                            <button onClick={() => setPayeeForm(checkNull(payee))}>Edit</button>
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", paddingTop: 8 }}>
                                        <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                                            <a
                                                href={`?payeePage=${Math.max(1, currentPage - 1)}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const newPage = Math.max(1, currentPage - 1);
                                                    const params = new URLSearchParams(window.location.search);
                                                    params.set("payeePage", String(newPage));
                                                    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
                                                    // force a re-render so the component reads the updated query param
                                                    setPayeeState((prev) => [...prev]);
                                                }}
                                                style={{ pointerEvents: currentPage === 1 ? "none" : "auto", opacity: currentPage === 1 ? 0.5 : 1 }}
                                            >
                                                Prev
                                            </a>
                                            <span>
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <a
                                                href={`?payeePage=${Math.min(totalPages, currentPage + 1)}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const newPage = Math.min(totalPages, currentPage + 1);
                                                    const params = new URLSearchParams(window.location.search);
                                                    params.set("payeePage", String(newPage));
                                                    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
                                                    // force a re-render so the component reads the updated query param
                                                    setPayeeState((prev) => [...prev]);
                                                }}
                                                style={{ pointerEvents: currentPage === totalPages ? "none" : "auto", opacity: currentPage === totalPages ? 0.5 : 1 }}
                                            >
                                                Next
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        );
                    })()}
                    </tbody>
                  </table>
                </div>
                </div>
            </div>
        </div>
    </div>
        )}

export default Customers;

{/* 
 {customers.map((customer:any, index:number)=>(
                    <div key={index}>
                      <p>{customer.full_name} - {customer.phone_number} - {customer.email}</p>
                    </div>
                  ))
                  } */}
