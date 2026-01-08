import { useEffect, useState } from "react";
import { usePayeeMutation } from "../../integrations/features/apis/apiSlice";
import { useAppDispatch } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { addSinglePayee } from "../../integrations/features/payee/payeeSlice";
import { addAlert } from "../../integrations/features/alert/alertSlice";
import { setLoading } from "../../integrations/features/meta/metaSlice";


const PayeeForm = ({user,payeeForm, setPayeeForm}:any) =>{

        const [payeeApi, { isLoading}] = usePayeeMutation();
        const dispatch = useAppDispatch();

         useEffect(()=>{
                    dispatch(setLoading(isLoading))
                },[isLoading])
        
        const PayeeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if(e.target.name == "name"){
                    setPayeeForm({ ...payeeForm, [e.target.name]: e.target.value.toLowerCase() });

                }else{
                    setPayeeForm({ ...payeeForm, [e.target.name]: e.target.value });

                }

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
                        dispatch(addAlert({status:200,message:"Payee added",page:'payeeForm'}))
                        
                    }else if(res.error){
                        dispatch(addAlert({...res.error, page:'payeeForm'}))
                                   }
                } else {
                    const data = { data: { data: payeeForm, action: "update" }, token: user.usertoken };
                    let res = await payeeApi(data);
                    if (res.data) {
                        dispatch(addSinglePayee(res.data.payee));
                        setPayeeForm({ id: "", name: "", phone_number: "", email: "" });
                        dispatch(addAlert({status:200,message:"Payee Edited",page:'payeeForm'}))
                        
                    }else if(res.error){
                        dispatch(addAlert({...res.error, page:'payeeForm'}))
               }
                }
            };


    return(
       <div id="payeeForm" style={formStyles.formsColumn}>
                    <h3 style={formStyles.formTitle}>Add / Edit Payee</h3>
                    <form style={formStyles.form} onSubmit={OnSubmitPayee}>
                        <input style={formStyles.input} type="text" placeholder="Full Name" name="name" required value={payeeForm.name} onChange={PayeeOnChange} />
                        <input style={formStyles.input} type="text" placeholder="Phone Number" name="phone_number" value={payeeForm.phone_number} onChange={PayeeOnChange} />
                        <input style={formStyles.input} type="email" placeholder="Email" name="email" value={payeeForm.email} onChange={PayeeOnChange} />
                        <button
                         style={{ ...formStyles.submitBtn, 
                                                        ...(isLoading ? { backgroundColor: '#808080', cursor: 'not-allowed' } 
                                                            : {backgroundColor: "#0b5fff", cursor: 'pointer'}) }} 
                        type="submit">{payeeForm.id ? "Update Payee" : "Add Payee"}</button>
                    </form>
                </div>

    )
}

export default PayeeForm