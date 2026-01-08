import { useEffect } from "react";
import { addAlert } from "../../integrations/features/alert/alertSlice";
import { usePaymentMutation } from "../../integrations/features/apis/apiSlice";
import { useAppDispatch } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { setLoading } from "../../integrations/features/meta/metaSlice";
import { addCommas,removeCommas } from "../helper";


interface PayeeInterface {
    [key:string]:string
}[]


const PaymentForm = ({user,paymentForm, setPayments, setpaymentForm,transaction}:any) =>{

        const [paymentApi, { isLoading }] = usePaymentMutation();
        const dispatch = useAppDispatch();

         useEffect(()=>{
                    dispatch(setLoading(isLoading))
                },[isLoading])
        
        const paymentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: removeCommas(e.target.value) });
            };
    
        const OnSubmitpayment = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (paymentForm.id == "") {
                // Add new payment
                const { id, ...formdData } = paymentForm;
                const data = { data: { data: formdData, action: "create" }, token: user.usertoken };
                let res = await paymentApi(data);
                if (res.data) {
                    // dispatch(addSinglePayment(res.data.payment));
                    setPayments((prev: any)=>{return[res.data.payment,...prev]})
                    setpaymentForm({ id: "", amount: "", transaction});
                }
            } else {
                // Update payment
                const new_date = new Date(String(paymentForm.date)).toLocaleDateString('en-CA');
                paymentForm = {...paymentForm,date:new_date}
                const data = { data: { data: paymentForm, action: "update" }, token: user.usertoken };
                let res = await paymentApi(data);
                if (res.data) {
                    setPayments((prev: any)=>{
                        const new_data = res.data.payment
                        const new_state: PayeeInterface[]= []
                        prev.forEach((item: any) => {
                            if(item.id != new_data.id){
                                new_state.push(item)
                            }else{
                                new_state.push(new_data)
                            }
                        });
                        // return[res.data.payment,...prev]
                        return new_state
                    })

                    // dispatch(addSinglePayment(res.data.payment));

                    setpaymentForm({ id: "", amount: 0, transaction});
                }else if(res.error){
                    dispatch(addAlert({...res.error, page:'PaymentForm'}))
                               }
            }
        };
    


    return(
        <div style={formStyles.formsColumn}>
                            <h3 style={formStyles.formTitle}>Add / Edit payment</h3>
                            <form style={formStyles.form} onSubmit={OnSubmitpayment}>
                                <input style={formStyles.input} type="text" placeholder="1,000" 
                                name="amount" value={addCommas(paymentForm.amount)} onChange={paymentOnChange} required />
                                <button
                                style={{ ...formStyles.submitBtn, 
                                                        ...(isLoading ? { backgroundColor: '#808080', cursor: 'not-allowed' } 
                                                            : {backgroundColor: "#0b5fff", cursor: 'pointer'}) }} 
                                type="submit">{paymentForm.id ? "Update payment" : "Add payment"}</button>
                            </form>
                        </div>

    )
}

export default PaymentForm