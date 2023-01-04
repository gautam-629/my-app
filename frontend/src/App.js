import React from 'react'
import Navbar from './components/layout/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/> 
      <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App;