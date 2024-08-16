import { useEffect } from 'react'
import Nav from '../components/nav'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  
  useEffect(() => {
    getDashboard()
  },[])

  let token = localStorage.token
  let navigate = useNavigate()
  const  getDashboard = async () => {
    // fetch data from API
    const response = await fetch(`http://localhost:5000/account/dashboard`, {
      method: 'GET',
      headers: {
        'authentication': 'Bearer '+token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    if (response.ok){
      const data = await response.json();
      if (!data.status){
        localStorage.removeItem('token')
        navigate('/login')
      }else{
        console.log(data.data);
      }
    }
  }
  
  return (
    <>
      <Nav/>
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard
