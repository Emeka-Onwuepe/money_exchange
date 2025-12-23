import { useState } from "react";
import formStyles from "../../styles/forms";
import { useAnalyticsMutation } from "../../integrations/features/apis/apiSlice";


export default function GetStatementForm({user}:{user:any}) {

    
    const [analyticsApi, { isLoading}] = useAnalyticsMutation();
    

    const [formState, setFormState] = useState({start:new Date().toLocaleDateString(),
        end:new Date().toLocaleDateString()})

     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
            };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log(formState)
            const data = {data:{data:formState,action:'get_statement'},token:user.usertoken}

            const res = await analyticsApi(data)
            if(res.data && res.data.analysis){
                console.log(res.data.analysis)
            }

        
        }


  return (
    <div style={formStyles.formsColumn}>
                    <h3 style={formStyles.formTitle}>Get Statements</h3>
                    <form onSubmit={handleSubmit} style={formStyles.form}>
                        <input style={formStyles.input} type="date" 
                        name="start" required value={formState.start} onChange={onChange} />
                        <input style={formStyles.input} type="date" 
                        name="end" value={formState.end} onChange={onChange} />
                        
                        <button style={formStyles.submitBtn} type="submit">Get</button>
                    </form>
                        <button style={formStyles.submitBtn} type="submit">Download</button>
                </div>
  )
}
