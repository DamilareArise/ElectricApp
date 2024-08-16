// import React from 'react'
import sec2img from './../assets/sec2img.png'
const Section2 = () => {
  return (
    <div className='flex items-center pl-[64px] pr-[113px] gap-[47px] justify-between '>
        <div className=''>
            <p className='pb-[30px] mb-[23px] text-[48px] font-[700] leading-[57.68px]'>A wide reach  and coverage</p>
            <p className='mb-[11px]'>
                We offer a wide range of disco electricity  at unbeatable prices, we <br/>
                get the most strategic partners, to give you the <br/>
                best deals in the market.
            </p>

            <p>
                Also, We are constantly reaching out to new partners with the aim <br/>
                to provide you with a wider range of services and lower market<br/> prices.
            </p>
        </div>

        <img src={sec2img} alt="" />

    </div>
  )
}

export default Section2