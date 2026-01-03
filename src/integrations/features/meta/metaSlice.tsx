import { createSlice } from '@reduxjs/toolkit';
import {writeToLocalStorage, readFromLocalStorage} from '../../localStorage';
import Loading from '../../../components/loading';


const initialData = {
  loading:false,
}


export const get_initial_meta_data = async () => {
  let data = await readFromLocalStorage("meta")
  let metaData = initialData
  if (!data) {
    writeToLocalStorage("meta", initialData)
    // metaData = initialData
  } else {
    metaData = data 
  }
  return metaData
} 


export const metaSlice = createSlice({
  name: 'meta',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setData: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      Object.assign(state, action.payload)
      save ? writeToLocalStorage("meta", action.payload):null
    },
    setLoading: (state, action) =>{
        state.loading = action.payload
        writeToLocalStorage("meta", {Loading:state.loading})

    },
  },
 
});


export const { setData, setLoading } = metaSlice.actions;

export default metaSlice.reducer;
