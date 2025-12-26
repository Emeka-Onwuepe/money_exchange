import { useNavigate } from "react-router";
import GetStatementForm from "./components/forms/getStatementForm";
import { useAppSelector } from "./integrations/hooks";
import { useEffect } from "react";

export default function Analytics() {
    const user = useAppSelector((state) => state.user);
    const navigate = useNavigate()

     useEffect(()=>{
        if(!user.logedin || !user.verified){ 
                  navigate('/login')
        }
      },[user])
    
  return (
    <div>
         <div>analytics</div>
         <div className="forms">
            <GetStatementForm user={user}/>

         </div>

    </div>
  )
}
