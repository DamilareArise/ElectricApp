// import Header from "./components/Header"
// import Nav from "./components/nav"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./authentication/Login"
import SignUp from './authentication/SignUp';

function App() {


  return (
    <>
     <Router>
      
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
  
    </Router>
    </>
  )
}

export default App
