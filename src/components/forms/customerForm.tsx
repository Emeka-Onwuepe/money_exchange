import { useCustomerMutation } from "../../integrations/features/apis/apiSlice";
import { addSingleCustomer } from "../../integrations/features/customer/customerSlice";
import { useAppDispatch } from "../../integrations/hooks";
import formStyles from "../../styles/forms";


const CustomerForm = ({user,customerForm, setCustomerForm}:any) =>{

        const [customerApi, { isLoading: cLoading }] = useCustomerMutation();
        const dispatch = useAppDispatch();
        
        const CustomerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
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
                }
            } else {
                const data = { data: { data: customerForm, action: "update" }, token: user.usertoken };
                let res = await customerApi(data);
                if (res.data) {
                    dispatch(addSingleCustomer(res.data.customer));
                    setCustomerForm({ id: "", full_name: "", phone_number: "", email: "" });
                }
            }
        };
    


    return(
        <div style={formStyles.formsColumn}>
                            <h3 style={formStyles.formTitle}>Add / Edit Customer</h3>
                            <form style={formStyles.form} onSubmit={OnSubmitCustomer}>
                                <input style={formStyles.input} type="text" placeholder="Full Name" name="full_name" value={customerForm.full_name} onChange={CustomerOnChange} required />
                                <input style={formStyles.input} type="text" placeholder="Phone Number" name="phone_number" value={customerForm.phone_number} onChange={CustomerOnChange} required />
                                <input style={formStyles.input} type="email" placeholder="Email" name="email" value={customerForm.email} onChange={CustomerOnChange} />
                                <button style={formStyles.submitBtn} type="submit">{customerForm.id ? "Update Customer" : "Add Customer"}</button>
                            </form>
                        </div>

    )
}

export default CustomerForm