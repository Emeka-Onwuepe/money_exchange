import { useEffect, useState } from "react";
import { useLoginMutation} from "../../integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { loginUser } from "../../integrations/features/user/usersSlice";
import { useNavigate } from "react-router";

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        width:'60vh',
        margin: 'auto',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#f2f2f2',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  
        width: '80%',

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

        const [loginApi, { isLoading: pLoading }] = useLoginMutation();
        const dispatch = useAppDispatch();

         useEffect(()=>{
            if(user.logedin && user.verified){ 
                 navigate('/')

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
                    }
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
                            style={formStyles.submitBtn} 
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
    )
}

export default LoginForm