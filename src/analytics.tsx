import { useNavigate } from "react-router";
import GetStatementForm from "./components/forms/getStatementForm";
import { useAppSelector } from "./integrations/hooks";
import { useEffect, useState } from "react";
import TransactionTable from "./components/tables/transactionsTable";
import Incomes from "./components/tables/incomes";
import OverAll from "./components/tables/overAll";

export default function Analytics() {
    const user = useAppSelector((state) => state.user);
    const navigate = useNavigate()
  
      const[source,setSource] = useState<{ transactions?: any[],incomes?:any[],
        total_income?:number,overall?:any,by_currency?:any[],
         total_income_by_channel?: any }>({})


     useEffect(()=>{
        if(!user.logedin || !user.verified){ 
                  navigate('/login')
        }
      },[user])
  
  return (
    <div>
         <div className="forms">
            <GetStatementForm user={user} setSource={setSource}/>
            <TransactionTable transactions={source.transactions || []} />
            <Incomes income={source.incomes || []}  
            total_income={source.total_income || 0}
             total_income_by_channel={source.total_income_by_channel || {}} />
            <OverAll overall={source.overall || {}} byCurrency={source.by_currency || []} />


         </div>

    </div>
  )
}
