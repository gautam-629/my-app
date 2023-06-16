import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { registerRequest } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { STATUSES } from '../../config';
const Register = () => {
   const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
   const sucessNotify = () => toast.success("Register Unsucessfull !");
   const {status} =useSelector((state)=>state.auth);
   const {errMessage} =useSelector((state)=>state.auth.statusMessage);
   useEffect(()=>{
      if (status === STATUSES.ERROR) {
         errorNotify(errMessage)
     }
     
     if (status === STATUSES.SUCESS) {
         sucessNotify()
   }
   },[status,errMessage])
 
   const dispatch = useDispatch()
   const initial = {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
   }
   const [userRegister, setUserRegister] = useState(initial);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setisSubmit] = useState(false);
   const [avatar, setAvatar] = useState('')
   const { name, email, password, confirm_password } = userRegister;
   function handleChange(e) {
      if(e.target.name==='avatar'){
         const reader= new FileReader();
         reader.readAsDataURL(e.target.files[0])
         reader.onloadend=()=>{
            setAvatar(reader.result);
         }
      }
      const { name, value } = e.target;
      setUserRegister({ ...userRegister, [name]: value })
   }
  
   function handleForm(e) {
      e.preventDefault();
      setFormErrors(validation(userRegister))
      setisSubmit(true);
      let registerRequestData = new FormData();
      registerRequestData.set('name', name);
      registerRequestData.set('email', email);
      registerRequestData.set('password', password);
      registerRequestData.set('repeat_password', confirm_password);
      registerRequestData.set('avatar', avatar);

      if (Object.keys(formErrors).length === 0 && isSubmit) {
         // call the api here
         
         dispatch(registerRequest(registerRequestData))

        
      }

    
   }
   function validation(value) {
      let error = {};
      if (!value.name) {
         error.name = 'name is required';
      }
      if (!value.email) {
         error.email = 'email is required';
      }
      if (!value.password) {
         error.password = "password is required";
      }
      if (!value.confirm_password) {
         error.confirm_password = 'confirm_password is required';
      }
      if (value.password !== value.confirm_password) {
         error.confirm_password = 'password and confirm password must be match'
      }
      return error;
   }

   return (
      <>
         <div className="wrapper flex justify-center mt-9">
            <div className='bg-white w-96 h-3/4 rounded-md shadow-2xl'>
               <h1 className='text-center font-bold text-3xl'>Register</h1>
               <form action="" onSubmit={handleForm} encType='multipart/form-data'>
                  <div className='ml-5 mb-3'>
                     <label htmlFor="name">Name</label> <br />
                     <input className='bg-gray-50 border border-gray-300 focus:outline-none rounded-lg w-80 px-1 py-1 ' type="text" onChange={handleChange} value={name} name="name" id="" placeholder='Enter your name' required/>
                     <p className='text-red-700'>{formErrors.name}</p>
                  </div>
                  <div className='ml-5 mb-3'>
                     <label htmlFor="email">email</label><br />
                     <input className='bg-gray-50 border border-gray-300 focus:border-none outline-none rounded-lg w-80 px-1 py-1 ' onChange={handleChange} value={email} type="email" name="email" id="" placeholder='Enter your gmail' required />
                     <p className='text-red-700'>{formErrors.email}</p>
                  </div>
                  <div className='ml-5 mb-3'>
                     <label htmlFor="password">Password</label> <br />
                     <input className='bg-gray-50 border border-gray-300 focus:border-none outline-none rounded-lg w-80 px-1 py-1 ' onChange={handleChange} value={password} type="password" name="password" id="" placeholder='password' required/>
                     <p className='text-red-700'>{formErrors.password}</p>
                  </div>
                  <div className='ml-5 mb-3'>
                     <label htmlFor="confirm-password">confirm Password</label> <br />
                     <input className='bg-gray-50 border border-gray-300 focus:border-none outline-none rounded-lg w-80 px-1 py-1 ' onChange={handleChange} value={confirm_password} type="password" name="confirm_password" id="" placeholder='confirm_password' required/>
                     <p className='text-red-700'>{formErrors.confirm_password}</p>
                  </div>
                  <div className='avatarWrapper flex items-center gap-10 ml-5'>
                     <div className='image '>
                        <img class="p-1 w-16 h-16 rounded-full ring-1 ring-secondary-300 dark:ring-gray-500" src={avatar} alt="avatar" />
                     </div>
                     <div>
                        <label htmlFor="avatar_input">Chose a different photo</label>
                        <input className='hidden' type="file"
                           onChange={handleChange}
                           name="avatar" id="avatar_input" />
                     </div>
                  </div>
                  <div className='text-center mt-1'>
                     <button disabled={status === STATUSES.LOADING? true: false} type='submit' className='rounded-md text-black font-bold py-2 px-32 bg-secondary hover:bg-yellow-500'>Register</button>
                  </div>
               </form>
            </div>
         </div>
         <ToastContainer/>
      </>
   )
}

export default Register