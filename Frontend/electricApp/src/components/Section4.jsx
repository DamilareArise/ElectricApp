// import React from 'react'

import { Link } from "react-router-dom"

// import sec4 from './../assets/sec4Img.png'
const Section4 = () => {
  return (
    <div className="bg-[url('./assets/sec4Img.png')] bg-contain bg-bottom bg-no-repeat h-[70vh] w-full pt-[70px] text-center">
        <div className="flex flex-col justify-center items-center gap-[18px]">
            <p className="/px-[16px] font-[600] md:font-[700] text-[24px] md:text-[38px] lg:text-[48px] text-[#000000] leading-[44px] lg:leading-[57.6px]">
                We provide amazing features to ensure <br className="hidden md:block"/>you have the best energy experience, <br className="hidden md:block"/>
                Get Started now!
            </p>
            <p className="font-[400] text-[20px] lg:text-[28px] leading-[33.6px]">Join the thousands of users using  a fast and reliable top-up service</p>

            <Link to='/signup' className="text-[#012436] font-[400] text-[18px] lg:text-[22px] bg-[#EDA145] py-[18px] px-[42px] w-fit rounded-[8px] /mb-[24px]">Start Now</Link>
        </div>
    </div>
  )
}

export default Section4