// import Header from "./components/Header"
// import Nav from "./components/nav"
import {Route, Routes, Navigate } from 'react-router-dom';

// import Login from "./authentication/Login"
import SignUp from './authentication/SignUp';
import Landing from "./Web/Landing";
import Dashboard from './pages/Dashboard'
import Login from './authentication/Login';
import Transactions from './pages/Transactions';
import Paybill from './components/Paybill';
import Eproviders from './pages/Eproviders';
import { useEffect, useState } from 'react';
import ForgotPassword from './authentication/ForgotPassword';
import ResetPassword from './authentication/ResetPassword';

function App() {

  // let token = localStorage.token
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Update the state when token changes in localStorage
  useEffect(() => {
    const handleTokenChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path='/paybill/:provider' element={token ? <Paybill/>: <Navigate to={'/login'}/>}/>
        <Route path='/transactions' element={token ? <Transactions/> : <Navigate to={'/login'}/>}/>
        <Route path='/dashboard' element={token ? <Dashboard/> : <Navigate to={'/login'}/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path='/providers' element={token? <Eproviders/>: <Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
      </Routes>
    </>
  )
}

export default App
