import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { STATUSES } from '../../config';
import { loginRequest } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  const sucessNotify = () => toast.success("Register sucessfull !");
   const {status}=useSelector((state)=>state.auth);
   const {errMessage}= useSelector((state)=>state.auth.statusMessage)
  useEffect(()=>{
       if(status===STATUSES.ERROR){
        errorNotify(errMessage)
       }
       if(status===STATUSES.SUCESS){
           sucessNotify()
       }
  },[status,errMessage]);
  const dispatch=useDispatch();
  const initial={
      email:'',
      password:''
  }
   const [loginvalue,setLoginValue]=useState(initial)
   const {email,password}=loginvalue;
  function handleChange(e) {
     const {name,value}=e.target;
     setLoginValue({...loginvalue,[name]:value})
  }
     function handleSubmit(){
         const registerFormData=new FormData();
         registerFormData.set('email',email);
         registerFormData.set('password',password);
          dispatch(loginRequest(registerFormData));
     }
  return (
    <>
    <div className="loginWrapper flex items-center justify-center mt-14">
       <div className='bg-white shadow-2xl rounded-md  w-96 h-72'>
       <h1 className='text-center font-bold text-3xl'>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div  className='ml-5'>
                  <label htmlFor="email">email</label> <br />
                  <input className='py-1 px-1 w-80 bg-gray-50  border focus:border-none outline-none rounded border-gray-500' type="text" name="email" id="" onChange={handleChange} value={email} placeholder='enter your email address' required />
                </div>
                <div className='ml-5'>
                  <label htmlFor="password">password</label> <br />
                  <input className='py-1 px-1 w-80 bg-gray-50  border focus:border-none outline-none rounded border-gray-500' type="password" onChange={handleChange} value={password} name="password" id="" required />
                </div>
                <Link className='relative left-56 font-bold' to='#'>forgot password?</Link>
                <div className='text-center mt-1 py-3'>
                     <button type='submit' disabled={status===STATUSES.LOADING?true:false} onClick={handleSubmit} className='rounded-md text-black font-bold py-2 px-32 bg-secondary hover:bg-yellow-500'>login</button>
                  </div>
                  <Link className='relative left-64 font-bold' to='/register'>New User?</Link>
            </form>
       </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login