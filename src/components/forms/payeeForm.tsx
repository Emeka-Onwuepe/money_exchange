import { useState } from "react";
import { usePayeeMutation } from "../../integrations/features/apis/apiSlice";
import { useAppDispatch } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { addSinglePayee } from "../../integrations/features/payee/payeeSlice";


const PayeeForm = ({user,payeeForm, setPayeeForm}:any) =>{

        const [payeeApi, { isLoading: pLoading }] = usePayeeMutation();
        const dispatch = useAppDispatch();
        
        const PayeeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setPayeeForm({ ...payeeForm, [e.target.name]: e.target.value });
            };
        
            const OnSubmitPayee = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (payeeForm.id == "") {
                    // Add new payee
                    const { id, ...formdData } = payeeForm;
                    const data = { data: { data: formdData, action: "create" }, token: user.usertoken };
                    let res = await payeeApi(data);
                    if (res.data) {
                        dispatch(addSinglePayee(res.data.payee));
                        setPayeeForm({ id: "", name: "", phone_number: "", email: "" });
                    }
                } else {
                    const data = { data: { data: payeeForm, action: "update" }, token: user.usertoken };
                    let res = await payeeApi(data);
                    if (res.data) {
                        dispatch(addSinglePayee(res.data.payee));
                        setPayeeForm({ id: "", name: "", phone_number: "", email: "" });
                    }
                }
            };


    return(
       <div style={formStyles.formsColumn}>
                    <h3 style={formStyles.formTitle}>Add / Edit Payee</h3>
                    <form style={formStyles.form} onSubmit={OnSubmitPayee}>
                        <input style={formStyles.input} type="text" placeholder="Full Name" name="name" required value={payeeForm.name} onChange={PayeeOnChange} />
                        <input style={formStyles.input} type="text" placeholder="Phone Number" name="phone_number" value={payeeForm.phone_number} onChange={PayeeOnChange} />
                        <input style={formStyles.input} type="email" placeholder="Email" name="email" value={payeeForm.email} onChange={PayeeOnChange} />
                        <button style={formStyles.submitBtn} type="submit">{payeeForm.id ? "Update Payee" : "Add Payee"}</button>
                    </form>
                </div>

    )
}

export default PayeeForm