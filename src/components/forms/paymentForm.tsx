import { usePaymentMutation } from "../../integrations/features/apis/apiSlice";
import { addSinglePayment } from "../../integrations/features/payment/paymentSlice";
import { useAppDispatch } from "../../integrations/hooks";
import formStyles from "../../styles/forms";


const PaymentForm = ({user,paymentForm, setPayments, setpaymentForm,transaction}:any) =>{

        const [paymentApi, { isLoading: pLoading }] = usePaymentMutation();
        const dispatch = useAppDispatch();
        
        const paymentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
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
                    setPayments(prev=>{return[res.data.payment,...prev]})
                    setpaymentForm({ id: "", amount: "", transaction});
                }
            } else {
                const data = { data: { data: paymentForm, action: "update" }, token: user.usertoken };
                let res = await paymentApi(data);
                if (res.data) {
                    setPayments(prev=>{
                        const new_data = res.data.payment
                        const new_state= []
                        prev.forEach(item => {
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

                    setpaymentForm({ id: "", amount: "", transaction});
                }
            }
        };
    


    return(
        <div style={formStyles.formsColumn}>
                            <h3 style={formStyles.formTitle}>Add / Edit payment</h3>
                            <form style={formStyles.form} onSubmit={OnSubmitpayment}>
                                <input style={formStyles.input} type="text" placeholder="0.0" 
                                name="amount" value={paymentForm.amount} onChange={paymentOnChange} required />
                                <button style={formStyles.submitBtn} 
                                type="submit">{paymentForm.id ? "Update payment" : "Add payment"}</button>
                            </form>
                        </div>

    )
}

export default PaymentForm