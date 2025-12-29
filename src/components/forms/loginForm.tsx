import { useEffect, useState } from "react";
import { useLoginMutation} from "../../integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { loginUser, logoutUser } from "../../integrations/features/user/usersSlice";
import { useNavigate } from "react-router";
import { addAlert } from "../../integrations/features/alert/alertSlice";
import { setLoading } from "../../integrations/features/meta/metaSlice";

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '60vh',
        // width:'60vh',
        marginTop: '50px',
        padding: '100px 10px',
        borderRadius: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        padding: '50px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  
        width: '60%',

    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    submitBtn: {
        padding: '10px',
        borderRadius: '3px',
        border: 'none',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
}


const LoginForm = () =>{

        const navigate = useNavigate()
        const user = useAppSelector(state=>state.user)

        const [loginApi, { isLoading }] = useLoginMutation();
        const dispatch = useAppDispatch();

        useEffect(()=>{
            dispatch(setLoading(isLoading))
        },[isLoading])

         useEffect(()=>{
            if(user.logedin && user.verified){ 
                 navigate('/')

            }else if(user.logedin && !user.verified){
                dispatch(addAlert({status:401,page:'login',
                    data:{message:"Please verify your account"}}))
                // dispatch(logoutUser());
                

            }
          },[user])

        const [loginForm, setLoginForm] = useState({ phone_number: "", password:""});

        
        const userOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
            };
        
            const OnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const data ={...loginForm,user_type:"staff"}
                    let res = await loginApi(data);
                    if (res.data) {
                        dispatch(loginUser({...res.data.user,
                            usertoken: res.data.token , logedin:true,save:true}));
                        setLoginForm({ phone_number: "", password:"" });
                    }else if (res.error) {
                            dispatch(addAlert({...res.error, page:'login'}))
                                    };   
                };       

    return(
       <div style={style.container}>
                    <form style={style.form} onSubmit={OnSubmit}>
                        <input 
                            style={style.input} 
                            type="tel" 
                            placeholder="Phone Number" 
                            name="phone_number" 
                            required
                            pattern="[0-9\-\+\s]{10,}"
                            value={loginForm.phone_number} 
                            onChange={userOnChange} 
                        />
                        <input 
                            style={style.input} 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            required
                            minLength={6}
                            value={loginForm.password} 
                            onChange={userOnChange} 
                        />
                        <button  
                            type="submit"
                            disabled={isLoading}

                            style={{ ...formStyles.submitBtn, 
                                ...(isLoading ? { backgroundColor: '#808080', cursor: 'not-allowed' } 
                                    : {backgroundColor: "#0b5fff", cursor: 'pointer'}) }} 
                        
                        >
                            Login
                        </button>
                    </form>
                </div>
    )
}

export default LoginForm