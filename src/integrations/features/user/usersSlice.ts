import { createSlice } from '@reduxjs/toolkit';
import {writeToLocalStorage, readFromLocalStorage} from '../../localStorage';


const initialData = {
  id: 0,
  full_name: "",
  email: "",
  user_role: "",
  profile_image: "",
  gender: "",
  phone_number: "",
  verified_phone_number: false, 
  verified_email: false, 
  usertoken: "",
  logedin: false,
}


export const get_initial_user_data = async () => {
  let data = await readFromLocalStorage("user")
  let userData = initialData
  if (!data) {
    writeToLocalStorage("user", initialData)
    // userData = initialData
  } else {
    userData = data 
  }
  return userData
} 


export const userSlice = createSlice({
  name: 'user',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginUser: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      Object.assign(state, action.payload)
      save ? writeToLocalStorage("user", action.payload):null
    },
    logoutUser: (state)=>{
      // for (const key in state) {
      //   state[key] = initialData[key]
      //   }
        Object.assign(state, initialData)
        writeToLocalStorage("user", initialData)
    }
  },
 
});


export const { loginUser,logoutUser } = userSlice.actions;

export default userSlice.reducer;
