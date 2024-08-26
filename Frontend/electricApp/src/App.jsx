// import Header from "./components/Header"
// import Nav from "./components/nav"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import Login from "./authentication/Login"
import SignUp from './authentication/SignUp';
import Landing from "./Web/Landing";
import Dashboard from './pages/Dashboard'
import Login from './authentication/Login';
import Transactions from './pages/Transactions';
import Paybill from './components/Paybill';

function App() {
  // let token = localStorage.token
  localStorage.clear()

  return (
    <>
     <Router>
      
      <Routes>
      <Route path='/paybill' element={<Paybill/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <Route path='/dashboard' element={token ? <Dashboard/> : <Navigate to={'/login'}/>}/> */}
        <Route path='/' element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
  
    </Router>
    </>
  )
}

export default App
