import { useEffect, useState } from "react";
import formStyles from "../../styles/forms";
import { useAnalyticsMutation } from "../../integrations/features/apis/apiSlice";
import { addAlert } from "../../integrations/features/alert/alertSlice";
import { useAppDispatch } from "../../integrations/hooks";
import { setLoading } from "../../integrations/features/meta/metaSlice";


export default function GetStatementForm({user,setSource}:{user:any,setSource:any}) {

    
    const [analyticsApi, { isLoading}] = useAnalyticsMutation();
    const dispatch = useAppDispatch();
    
    useEffect(()=>{
        dispatch(setLoading(isLoading))
     },[isLoading])

    const [formState, setFormState] = useState({start:new Date().toISOString().split('T')[0],
        end:new Date().toISOString().split('T')[0]})

     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
            };
    

    useEffect(()=>{
         const data = {data:{data:formState,action:"get_today_statement"},token:user.usertoken}
        analyticsApi(data).then(res=>{
            if(res.data && res.data.analysis){
                setSource(res.data.analysis)
               }else if(res.error){
                dispatch(addAlert({...res.error, page:'getStatementForm'}))
               }
            
            }).catch(err=>console.log('login error',err))
        
    },[])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,action:string) => {
            e.preventDefault();
            if(isLoading) return;
            if(!user.usertoken) return;
            if(!formState.start || !formState.end) return;

            // YYYY-MM-DD

            const data = {data:{data:formState,action},token:user.usertoken}

            const res = await analyticsApi(data)
           if(res.data && res.data.statement_url){
            const link = document.createElement('a');
            link.href = res.data.statement_url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
           }else if(res.data && res.data.analysis){
            setSource(res.data.analysis)
           }else if(res.error){
                dispatch(addAlert({...res.error, page:'getStatementForm'}))
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
                        
                        <button   style={{ ...formStyles.submitBtn, 
                                ...(isLoading ? { backgroundColor: '#808080', cursor: 'not-allowed' } 
                                    : {backgroundColor: "#0b5fff", cursor: 'pointer'}) }} 
                        disabled={isLoading}
                        type="submit">Get</button>
                    </form>
                        <button   style={{ ...formStyles.submitBtn, 
                                ...(isLoading ? { backgroundColor: '#808080', cursor: 'not-allowed' } 
                                    : {backgroundColor: "#0b5fff", cursor: 'pointer'}) }} 
                        disabled={isLoading}
                        onClick={(e) => handleSubmit(e, 'download_statement')} 
                         type="submit">Download</button>
                </div>
  )
}
