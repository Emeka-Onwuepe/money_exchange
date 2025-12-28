import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "../../integrations/hooks";
import formStyles from "../../styles/forms";
import { loginUser, logoutUser } from "../../integrations/features/user/usersSlice";
import { useNavigate } from "react-router";
import { addAlert } from "../../integrations/features/alert/alertSlice";

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


const SignUpForm = () =>{

        const navigate = useNavigate()
        const user = useAppSelector(state=>state.user)

        const [userApi, { isLoading: pLoading }] = useRegisterUserMutation();
        const dispatch = useAppDispatch();

         useEffect(()=>{
            if(user.logedin && user.verified){ 
                 navigate('/')

            }else if(user.logedin && !user.verified){
                dispatch(addAlert({status:401, page:'signup',
                    data:{message:"Please verify your account"}}))
                    // dispatch(logoutUser());
                    // navigate('/login')

            }
          },[user])

        const [userForm, setuserForm] = useState({ full_name: "", phone_number: "",
             email: "", password:"", confirm_password:"" });

        
        const userOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setuserForm({ ...userForm, [e.target.name]: e.target.value });
            };
        
            const OnSubmituser = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const data ={...userForm,user_type:"staff"}
                    let res = await userApi(data);
                    if (res.data) {
                        dispatch(loginUser({...res.data.user,
                            usertoken: res.data.token , logedin:true,save:true}));
                        setuserForm({ full_name: "", phone_number: "", email: "",
                            password:"",confirm_password:"" });
                    }else if (res.error) {
                        dispatch(addAlert({...res.error, page:'signup'}))
                };       

                };       

    return(
       <div style={style.container}>
                    <form style={style.form} onSubmit={OnSubmituser}>
                        <input 
                            style={style.input} 
                            type="text" 
                            placeholder="Full Name" 
                            name="full_name" 
                            required 
                            minLength={2}
                            value={userForm.full_name} 
                            onChange={userOnChange} 
                        />
                        <input 
                            style={style.input} 
                            type="tel" 
                            placeholder="Phone Number" 
                            name="phone_number" 
                            required
                            pattern="[0-9\-\+\s]{10,}"
                            value={userForm.phone_number} 
                            onChange={userOnChange} 
                        />
                        <input 
                            style={style.input} 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            required
                            value={userForm.email} 
                            onChange={userOnChange} 
                        />
                        <input 
                            style={style.input} 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            required
                            minLength={6}
                            value={userForm.password} 
                            onChange={userOnChange} 
                        />
                        <input 
                            style={style.input} 
                            type="password" 
                            placeholder="Confirm Password" 
                            name="confirm_password" 
                            required
                            minLength={6}
                            value={userForm.confirm_password} 
                            onChange={userOnChange} 
                        />
                        {userForm.password !== userForm.confirm_password && (
                            <p style={{ color: '#dc3545', marginBottom: '10px', fontSize: '14px' }}>
                                Passwords do not match
                            </p>
                        )}
                        <button 
                            style={formStyles.submitBtn} 
                            type="submit"
                            disabled={userForm.password !== userForm.confirm_password}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
    )
}

export default SignUpForm