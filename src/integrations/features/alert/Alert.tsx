import { useAppDispatch, useAppSelector } from "../../hooks";
import { logoutUser } from "../user/usersSlice"
import { useEffect } from "react"
// import {Toast} from "toastify-react-native";
import { ToastContainer, toast } from 'react-toastify';
import { clearAlert } from "./alertSlice";
import { useNavigate } from "react-router";

const Alert_System = () => {

  const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const alert = useAppSelector(state => state.alert);
    
    useEffect(() => {
      if (alert.status_code > 0) {
        if(alert.status_code === 401){
          dispatch(logoutUser())
          navigate('/login')
        }
        // let type = alert.status_code === 200 ? 'success' : 'error'
        for (const message of alert.message) {
          if (alert.status_code === 200) {
            
            toast.success(message,{
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
            })
          } else {
            toast.error(message,{
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
            })
          }
            
        }
        dispatch(clearAlert())
      }
    }, [alert])
  
  return (
    // <React.Fragment></React.Fragment>
    <ToastContainer />
  )
}

export default Alert_System

