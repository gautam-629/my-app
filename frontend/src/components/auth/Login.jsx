import React from 'react'
import {Link} from 'react-router-dom';
const Login = () => {
  return (
    <>
    <div className="loginWrapper flex items-center justify-center mt-14">
       <div className='bg-white shadow-2xl rounded-md  w-96 h-72'>
       <h1 className='text-center font-bold text-3xl'>Login</h1>
            <form action="">
                <div  className='ml-5'>
                  <label htmlFor="email">email</label> <br />
                  <input className='py-1 px-1 w-80 bg-gray-50  border focus:border-none outline-none rounded border-gray-500' type="text" name="email" id="" placeholder='enter your email address' required />
                </div>
                <div className='ml-5'>
                  <label htmlFor="password">password</label> <br />
                  <input className='py-1 px-1 w-80 bg-gray-50  border focus:border-none outline-none rounded border-gray-500' type="password" name="password" id="" required />
                </div>
                <Link className='relative left-56 font-bold' to='#'>forgot password?</Link>
                <div className='text-center mt-1 py-3'>
                     <button className='rounded-md text-black font-bold py-2 px-32 bg-secondary hover:bg-yellow-500'>login</button>
                  </div>
                  <Link className='relative left-64 font-bold' to='/register'>New User?</Link>
            </form>
       </div>
    </div>
    </>
  )
}

export default Login