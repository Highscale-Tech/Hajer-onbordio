import React from 'react'
import Navbar from './Components/Navbar'
import LoginForm from './Components/LoginForm'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Home from './Components/Home'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <><Navbar showButton={false}/><LoginForm/></>}   />
      <Route path='/loged' element={ <><Navbar showButton={true} name='Hajer'/><Home/></>}/>
    </Routes>

  )
}

export default App