import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './pages/home/home'
import Signup from './pages/signup/signup'
import Login from './pages/login/login'

function App() {
  
  const [user, setLoginUser]=useState({});

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={user && user._id ? <Home setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
    </Routes>
  </BrowserRouter>
)
}

export default App
