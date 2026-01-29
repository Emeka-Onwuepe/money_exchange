import { useEffect } from "react";
import { addAlert } from "../../integrations/features/alert/alertSlice";
import { useCustomerMutation } from "../../integrations/features/apis/apiSlice";
import { addSingleCustomer } from "../../integrations/features/customer/customerSlice";
import { useAppDispatch } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { setLoading } from "../../integrations/features/meta/metaSlice";


const CustomerForm = ({user,customerForm, setCustomerForm}:any) =>{

        const [customerApi, { isLoading}] = useCustomerMutation();
        const dispatch = useAppDispatch();

        useEffect(()=>{
            dispatch(setLoading(isLoading))
                },[isLoading])
        
        const CustomerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

         if(e.target.name == "full_name"){

                setCustomerForm({ ...customerForm, [e.target.name]: e.target.value.toLowerCase() });
                }else{

                setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });

                }
            };
            
    
        const OnSubmitCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (customerForm.id == "") {
                // Add new customer
                const { id, ...formdData } = customerForm;
                const data = { data: { data: formdData, action: "create" }, token: user.usertoken };
                let res = await customerApi(data);
                if (res.data) {
                    dispatch(addSingleCustomer(res.data.customer));
                    setCustomerForm({ id: "", full_name: "", phone_number: "", email: "" });
                    dispatch(addAlert({status:200,message:"Customer added",page:'customerForm'}))

                }else if (res.error) {
                    dispatch(addAlert({...res.error, page:'customerForm'}))
                                }; 
            } else {
                const data = { data: { data: customerForm, action: "update" }, token: user.usertoken };
                let res = await customerApi(data);
                if (res.data) {
                    dispatch(addSingleCustomer(res.data.customer));
                    setCustomerForm({ id: "", full_name: "", phone_number: "", email: "" });
                    dispatch(addAlert({status:200,message:"Customer edited",page:'customerForm'}))

                }else if (res.error) {
                    dispatch(addAlert({...res.error, page:'customerForm'}))
                            }; 
            }
        };
    


    return(
        <div id="customerForm" style={formStyles.formsColumn}>
                            <h3 style={formStyles.formTitle}>Add / Edit Customer</h3>
                            <form style={formStyles.form} onSubmit={OnSubmitCustomer}>
                                <input style={formStyles.input} type="text" placeholder="Full Name" name="full_name" value={customerForm.full_name} onChange={CustomerOnChange} required />
                                <input style={formStyles.input} type="text" placeholder="Phone Number" name="phone_number" value={customerForm.phone_number} onChange={CustomerOnChange} />
                                <input style={formStyles.input} type="email" placeholder="Email" name="email" value={customerForm.email} onChange={CustomerOnChange} />
                                <button   style={{ ...formStyles.submitBtn, 
                                ...(isLoading ? { backgroundColor: '#808080', cursor: 'not-allowed' } 
                                    : {backgroundColor: "#0b5fff", cursor: 'pointer'}) }} 
                                disabled={isLoading}
                                 type="submit">{customerForm.id ? "Update Customer" : "Add Customer"}</button>
                            </form>
                        </div>

    )
}

export default CustomerForm