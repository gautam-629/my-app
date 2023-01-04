import { createSlice } from '@reduxjs/toolkit';
import {api,STATUSES } from '../config/index';
const authSlice=createSlice({
    name:'auth',
    initialState:{
       user:{},
       statusMessage:{
         Message:null
       },
       status: STATUSES.IDLE
    },
      reducers:{
         setUser(state,action){
            state.user=action.payload;
         },
         setStatus(state,action){
             state.status=action.payload;
         },
         setStatusMessage(state,action){
            const {message}=action.payload
            state.statusMessage.Message=message;
         }
      }
})
export const{setUser,setStatus,setStatusMessage}=authSlice.actions;
export default authSlice.reducer;



export function registerRequest(userData){
         return async function registerUserThunk(dispatch,getState){
            dispatch(setStatus(STATUSES.LOADING));
            try {
                const res= await api.post('/api/register',userData)
                dispatch(setUser(res.data))
                dispatch(setStatus(STATUSES.SUCESS));
                console.log(res)
            } catch (error) {
                dispatch(setStatusMessage(error.response.data));
                console.log(error.response.data)
                dispatch(setStatus(STATUSES.ERROR));
            }
         }
}