import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    
    return (
        <>
            <nav className='bg-primary flex justify-between  pl-4 pr-20'>
                <div className="image">
                    <img src="/images/shopit_logo.png" alt="" />
                </div>
                <div className="search w-2/5">
                    <form action="">
                        <div className='flex items-center justify-center mt-4'>
                            <input className='rounded-sm w-full outline-none px-3 py-1 ' type="text" name="" id="" placeholder='Enter product name...' />
                            <button className='bg-secondary py-1 px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="cart-wrapper flex justify-center items-center gap-7">
                    <div className='flex gap-1'>
                        <span  className='text-white text-lg'>Cart</span>
                        <span className='bg-secondary px-2 py-1 rounded-sm'>9</span>
                    </div>
                    <div className='login'>
                        <Link to='/login'> <button className='font-bold text-lg rounded-sm px-5 bg-secondary hover:bg-yellow-500'>login</button></Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar