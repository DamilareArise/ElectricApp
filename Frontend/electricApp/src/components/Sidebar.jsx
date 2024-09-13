// import React from 'react'
import { Link } from "react-router-dom"

const Sidebar = () => {
  const logoutUser = () =>{
    // localStorage.removeItem('token')
    localStorage.clear()
    window.location.reload()
  }
  let firstName = localStorage.firstname;

  return (
    <div className="w-[20%] bg-[#012436] h-[93vh] pl-[49px] pt-[105px] fixed left-0 hidden lg:block">
          <div className="flex flex-col gap-[57px]">
          <Link to={'/'}><i className="fa-solid fa-arrow-left text-[#EDA145]"></i></Link>
            <p className="text-[16px] text-[#EDA145]">Welcome, {firstName}</p>

            <div className="flex flex-col gap-[35px]">
              <Link
                to="/"
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <img src="" alt="" />
                <p>Home</p>
              </Link>

              <Link
                to="/dashboard"
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <img src="" alt="" />
                <p>Dashboard</p>
              </Link>

              <Link
                to="/transactions"
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <img src="" alt="" />
                <p>Transactions</p>
              </Link>

              <Link
                to=""
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <img src="" alt="" />
                <p>Settings</p>
              </Link>

              <Link
                to=""
                onClick={logoutUser}
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <img src="" alt="" />
                <p>Logout</p>
              </Link>
            </div>
          </div>
        </div>
  )
}

export default Sidebar