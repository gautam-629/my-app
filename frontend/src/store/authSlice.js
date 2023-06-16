import { createSlice } from '@reduxjs/toolkit';
import { api, STATUSES } from '../config/index';
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isAuth: false,
      user: null,
      statusMessage: {
         errMessage: null
      },
      status: STATUSES.IDLE
   },
   reducers: {
      setUser(state, action) {
         const { user } = action.payload;
         state.user = user;
         if(user===null){
            state.isAuth=false;
         }
         else{
         state.isAuth = true;
         }
      },
      setStatus(state, action) {
         state.status = action.payload;
      },
      setStatusMessage(state, action) {
         const { message } = action.payload
         state.statusMessage.errMessage = message;
      }
   }
})
export const { setUser, setStatus, setStatusMessage } = authSlice.actions;
export default authSlice.reducer;



export function registerRequest(userData) {
   return async function registerUserThunk(dispatch, getState) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
         const res = await api.post('/api/register', userData)
         dispatch(setUser(res.data))
         dispatch(setStatus(STATUSES.SUCESS));

      } catch (error) {
         dispatch(setStatus(STATUSES.ERROR));
         dispatch(setStatusMessage(error.response.data));

      }
   }
}

export function loginRequest(userData) {
   return async function (dispatch, getState) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
         const res = await api.post('api/login', userData);
         dispatch(setUser(res.data))
         dispatch(setStatus(STATUSES.SUCESS));

      } catch (error) {
         dispatch(setStatus(STATUSES.ERROR));
         dispatch(setStatusMessage(error.response.data))
      }
   }
}