import { NavLink, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../integrations/hooks";
import { logoutUser } from "../integrations/features/user/usersSlice";
import { useLogoutMutation } from "../integrations/features/apis/apiSlice";

export default function Header() {

  let location = useLocation().pathname
  location = location.slice(1)
  const button_text = location == 'signup'?'Login':location == 'login'?"Sign Up":"Log Out"
  const class_name = location == 'signup'?'Login':location == 'login'?"Sign Up":"Log Out"
  const action = location == 'signup'?'login':location == 'login'?"signup":"logout"
  const navigate = useNavigate()

  const [logoutApi] = useLogoutMutation();
  const user = useAppSelector(state=>state.user)
  const dispatch = useAppDispatch()

  const Onclick = async() =>{
    if(action == 'login'){
      navigate('/login')
    }else if(action == "signup"){
      navigate('/signup')
    }else if(action == 'logout'){
      await logoutApi(user.usertoken)
      dispatch(logoutUser())

    }
  }

  return (
    <div>
    <header 
    >
       <div className="logo_div">
        <img src="/logo.jpeg" alt="logo" />
        </div>
        

        <nav>
                  {location == 'signup' || location == 'login'? <></> :

          <>
        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/'}>Home</NavLink>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/customers'}>Customers</NavLink>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/analytics'}>Analytics</NavLink>
        </>

        }

                <button style={{padding:"7px 10px",border:'0px',  color:'white', marginLeft:'15px',
          ...(class_name == 'Log Out'?{backgroundColor:"#ff0b44ff"}: {backgroundColor:"#0b65ff"})}} 
          onClick={Onclick} className={class_name}>{button_text}</button>


        </nav>
    </header>
    <div className="sperator">

       <header 
    >
       <div className="logo_div">
        <img src="/logo.jpeg" alt="logo" />
        </div>
        

        <nav>
                  {location == 'signup' || location == 'login'? <></> :

          <>
        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/'}>Home</NavLink>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/customers'}>Customers</NavLink>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/analytics'}>Analytics</NavLink>
        </>

        }

                <button style={{padding:"7px 10px",border:'0px',  color:'white', marginLeft:'15px',
          ...(class_name == 'Log Out'?{backgroundColor:"#ff0b44ff"}: {backgroundColor:"#0b65ff"})}} 
          onClick={Onclick} className={class_name}>{button_text}</button>


        </nav>
    </header>

    </div>

    </div>
    
    )

}
