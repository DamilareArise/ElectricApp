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
              
                <span className="flex gap-[28px] items-center side">
                  <i className="fa-solid fa-house text-[#EDA145]"></i>
                  <p>Home</p>
                  
                </span>
              </Link>

              <Link
                to="/dashboard"
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
               <span className="flex gap-[28px] items-center side">
               <i className="fa-solid fa-border-none text-[#EDA145]"></i>
               <p>Dashboard</p>
               </span>
              </Link>

              <Link
                to="/transactions"
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <span className="flex gap-[28px] items-center side">
                <i className="fa-solid fa-money-bill-transfer text-[#EDA145] fa-flip"></i>
                <p>Transactions</p>
                </span>
              </Link>

              <Link
                to=""
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
               <span className="flex gap-[28px] items-center side">
               <i className="fa-solid fa-gear text-[#EDA145] "></i>
               <p>Settings</p>
               </span>
              </Link>

              <Link
                to=""
                onClick={logoutUser}
                className="font-[500] text-[20px] leading-[24px] text-[#EDA145] flex gap-[23px] items-center"
              >
                <span className="flex gap-[28px] items-center side ">
                <i className="fa-solid fa-right-from-bracket text-[#EDA145] fa-shake"></i>
                <p>Logout</p>
                </span>
              </Link>
            </div>
          </div>
        </div>
  )
}

export default Sidebar