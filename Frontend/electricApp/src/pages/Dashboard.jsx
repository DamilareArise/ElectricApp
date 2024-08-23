import { useEffect } from 'react'
import Nav from '../components/nav'
import { Link, useNavigate } from 'react-router-dom'

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
  // const notifications = true;
  
  return (
    <div className='pt-[90px]'>
      <Nav/>
      {/* <h1>Dashboard</h1> */}

      <div>
        <div className='w-[355px] bg-[#012436] h-[95vh] pl-[49px] pt-[105px]'>
          <div className='flex flex-col gap-[57px]'>
            <img src="" alt="" width={24} height={24}/>

            <div className='flex flex-col gap-[35px]'>
              <Link to='' className='font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center'>
                <img src="" alt="" />
                <p>Home</p>
              </Link>

              <Link to='' className='font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center'>
                <img src="" alt="" />
                <p>Dashboard</p>
              </Link>

              <Link to='' className='font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center'>
                <img src="" alt="" />
                <p>Transactions</p>
              </Link>

              <Link to='' className='font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center'>
                <img src="" alt="" />
                <p>Settings</p>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div></div>

          <div>
            <Link to='' className='flex gap-[57px] px-[23px] py-[40px] max-w-[279px]'>
              <img src="" alt="" />
              <p>Pay Electric bill</p>
            
            </Link>

            <div className='py-[28px] pl-[44px]'>
              <p>Notifications (0)</p>
            </div>

            <div>
              <div className='flex flex-col gap-[45px] items-center'>
                <img src="" alt="" />

                <p>No Notifications  yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
