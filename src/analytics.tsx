import GetStatementForm from "./components/forms/getStatementForm";
import { useAppSelector } from "./integrations/hooks";

export default function Analytics() {
    const user = useAppSelector((state) => state.user);
    
  return (
    <div>
         <div>analytics</div>
         <div className="forms">
            <GetStatementForm user={user}/>

         </div>

    </div>
  )
}
