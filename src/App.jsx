import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Test from './pages/Test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/test/:id' element={<Test/>}></Route>
     </Routes>
    </>
  )
}

export default App
