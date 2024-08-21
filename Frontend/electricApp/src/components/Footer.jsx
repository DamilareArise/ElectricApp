// import React from 'react'
import logo from './../assets/logo.svg'

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-[#F3F1F1]  flex-col md:flex-row py-[98px] lg:py-[142px] flex  items-start md:items-center gap-[32px] md:gap-[79px] px-[24px] lg:px-[71px]">
        <div>
        <img
          src={logo}
          width={120}
          height={70}
          alt=""
          srcSet=""
        />
            <p className="font-[400] text-[20px] lg:text-[28px] leading-[33.6px]">©2024 Logo, All Rights Reserved.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start footer-links justify-start gap-[32px] md:gap-[79px]">
            <div className="footer-link">
                <p>Clients Area</p>
                <Link to='/'>Account</Link>
                <Link to='/'>Dashboard</Link>
                <Link to='/'>Transaction</Link>
            </div>
            <div className="footer-link">
                <p>Legal</p>
                <Link to='/'>Terms of  Service</Link>
                <Link to='/'>Privacy Policy</Link>
                
            </div>

            <div className="footer-link ">
                <p>Company</p>
                <Link to='/'>Contact Us</Link>
                <Link to='/'>About Us</Link>
                <Link to='/'>Services</Link>
                <Link to='/'>Career</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer