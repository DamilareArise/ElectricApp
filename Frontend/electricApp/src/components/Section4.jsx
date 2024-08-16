// import React from 'react'

import { Link } from "react-router-dom"

// import sec4 from './../assets/sec4Img.png'
const Section4 = () => {
  return (
    <div className="bg-[url('./assets/sec4Img.png')] bg-contain bg-bottom bg-no-repeat h-[70vh] w-full pt-[70px]">
        <div className="flex flex-col justify-center items-center gap-[18px]">
            <p className="font-[700] text-[48px] text-[#000000] leading-[57.6px]">
                We provide amazing features to ensure <br/>you have the best energy experience, <br/>
                Get Started now!
            </p>
            <p>Join the thousands of users using  a fast and reliable top-up service</p>

            <Link to='/' className="text-[#012436] font-[400] text-[28px] bg-[#EDA145] py-[22px] px-[49px] w-fit rounded-[8px]">Start Now</Link>
        </div>
    </div>
  )
}

export default Section4