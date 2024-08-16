// import Header from "./components/Header"
// import Nav from "./components/nav"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import Login from "./authentication/Login"
import SignUp from './authentication/SignUp';
import Landing from "./Web/Landing";
import Dashboard from './pages/Dashboard'

function App() {
  let token = localStorage.token

  return (
    <>
     <Router>
      
      <Routes>
        <Route path='/dashboard' element={token ? <Dashboard/> : <Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Landing/>}/>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
  
    </Router>
    </>
  )
}

export default App
