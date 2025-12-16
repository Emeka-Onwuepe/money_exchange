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



const Customers = () => {
    const customers = useAppSelector((state) => state.customers.data);
    const payees = useAppSelector((state) => state.payees.data);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();


    const { data: customersData, error: customersError, isLoading: customersLoading } = useGetCustomerQuery(
        user.usertoken
    );

    const { data: payeesData, error: payeesError, isLoading: payeesLoading } = useGetPayeeQuery(user.usertoken);
    const [payeeForm, setPayeeForm] = useState({ id: "", name: "", phone_number: "", email: "" });
    const [customerForm, setCustomerForm] = useState({ id: "", full_name: "", phone_number: "", email: "" });



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
            <div style={formStyles.headerRow}>
                <CustomerForm user={user} setCustomerForm={setCustomerForm} customerForm={customerForm} />
                <PayeeForm  user={user} setPayeeForm={setPayeeForm} payeeForm={payeeForm}/>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>

                    <PayeeTable setPayeeForm={setPayeeForm} payees={payees} checkNull={checkNull} />
                    <CustomerTable setCustomerForm ={setCustomerForm} checkNull={checkNull} customers={customers}  />
                </div>
            
        </div>
    );
};

export default Customers;
