import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./integrations/hooks";
import {
    useCustomerMutation,
    useGetCustomerQuery,
    useGetPayeeQuery,
    usePayeeMutation,
} from "./integrations/features/apis/apiSlice";
import { addCustomers, addSingleCustomer } from "./integrations/features/customer/customerSlice";
import { addPayees, addSinglePayee } from "./integrations/features/payee/payeeSlice";
import formStyles from "./styles/forms";
import CustomerTable from "./components/tables/customers";
import PayeeTable from "./components/tables/payees";
import CustomerForm from "./components/forms/customerForm";
import PayeeForm from "./components/forms/payeeForm";
import { useNavigate } from "react-router";
import { setLoading } from "./integrations/features/meta/metaSlice";
import { addAlert } from "./integrations/features/alert/alertSlice";

const styles = {
    card:{  
        // border: "1px solid #ccc",
        borderRadius: 4,
        padding: 16,
        marginBottom: 16,
        backgroundColor: "#fdfdfd",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width:"44%",

    }
}


const Customers = () => {
    const customers = useAppSelector((state) => state.customers.data);
    const payees = useAppSelector((state) => state.payees.data);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

      const [width, setWidth] = useState('45%');

    useEffect(() => {
        const updateHeaderWidth = () => {
          const vw = window.innerWidth;
          setWidth(vw < 640 ? '95%' : '45%' );
        };
    
        updateHeaderWidth();
        window.addEventListener('resize', updateHeaderWidth);
        return () => window.removeEventListener('resize', updateHeaderWidth);
      }, []);


    useEffect(()=>{
    if(!user.logedin || !user.verified){ 
            navigate('/login')
    }
  },[user])

    const { data: customersData, error, isLoading} = useGetCustomerQuery(
        user.usertoken
    );


    const { data: payeesData, error: payeesError, isLoading: payeesLoading } = useGetPayeeQuery(user.usertoken);
    const [payeeForm, setPayeeForm] = useState({ id: "", name: "", phone_number: "", email: "" });
    const [customerForm, setCustomerForm] = useState({ id: "", full_name: "", phone_number: "", email: "" });


useEffect(()=>{
    dispatch(setLoading(isLoading))
    if(error){
        dispatch(addAlert({...error, page:'customers'}))
                   }
     if(payeesError){
        dispatch(addAlert({...payeesError, page:'customers'}))
                   }
    },[isLoading,error,payeesError])



    const checkNull = (data: any) => {
        const Data = { ...data };
        for (const key in Data) {
            if (!Data[key]) {
                Data[key] = "";
            }
        }
        return Data;
    };


    useEffect(() => {
        if (customersData && customersData.customers) {
            dispatch(addCustomers({ data: customersData.customers, save: true }));
        }

        if (payeesData && payeesData.payees) {
            dispatch(addPayees({ data: payeesData.payees, save: true }));
        }
    }, [customersData, payeesData]);

    // useEffect(() => {
    //     // setCustomerState(customers);
    //     // setPayeeState(payees);
    // }, [customers, payees]);

    return (
        <div style={formStyles.page}>
            <div className="flex_container" >
                <div style={{...styles.card,width}}>
                <CustomerForm user={user} setCustomerForm={setCustomerForm} customerForm={customerForm} />
                </div>
                <div style={{...styles.card,width}}>
                <PayeeForm  user={user} setPayeeForm={setPayeeForm} payeeForm={payeeForm}/>
                </div>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                
                    <CustomerTable setCustomerForm ={setCustomerForm} checkNull={checkNull} customers={customers}  />

                    <PayeeTable setPayeeForm={setPayeeForm} payees={payees} checkNull={checkNull} />
                </div>
            
        </div>
    );
};

export default Customers;
