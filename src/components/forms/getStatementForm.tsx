import { useEffect, useState } from "react";
import formStyles from "../../styles/forms";
import { useAnalyticsMutation } from "../../integrations/features/apis/apiSlice";


export default function GetStatementForm({user,setSource}:{user:any,setSource:any}) {

    
    const [analyticsApi, { isLoading}] = useAnalyticsMutation();
    

    const [formState, setFormState] = useState({start:new Date().toLocaleDateString(),
        end:new Date().toLocaleDateString()})

     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
            };
    

    useEffect(()=>{
         const data = {data:{data:formState,action:"get_today_statement"},token:user.usertoken}
        analyticsApi(data).then(res=>{
            if(res.data && res.data.analysis){
                setSource(res.data.analysis)
               }
            }).catch(err=>console.log(err))
        
    },[])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,action:string) => {
            e.preventDefault();
            if(isLoading) return;
            if(!user.usertoken) return;
            if(!formState.start || !formState.end) return;

            const data = {data:{data:formState,action},token:user.usertoken}

            const res = await analyticsApi(data)
           console.log(res.data)
           if(res.data && res.data.statement_url){
            const link = document.createElement('a');
            link.href = res.data.statement_url;
            // link.download = 'statement.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
           }else if(res.data && res.data.analysis){
            setSource(res.data.analysis)
           }
    
        }


  return (
    <div style={formStyles.formsColumn}>
                    <h3 style={formStyles.formTitle}>Get Statements</h3>
                    <form onSubmit={(e) => handleSubmit(e, 'get_statement')} style={formStyles.form}>
                        <input style={formStyles.input} type="date" 
                        name="start" required value={formState.start} onChange={onChange} />
                        <input style={formStyles.input} type="date" 
                        name="end" value={formState.end} onChange={onChange} />
                        
                        <button style={formStyles.submitBtn} type="submit">Get</button>
                    </form>
                        <button  onClick={(e) => handleSubmit(e, 'download_statement')} style={formStyles.submitBtn} type="submit">Download</button>
                </div>
  )
}
