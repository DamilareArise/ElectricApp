// import React from 'react'
import sec2img from './../assets/sec2img.png'
const Section2 = () => {
  return (
    <div className='flex pl-[24px] pr-[24px] lg:pl-[64px] lg:pr-[78px] xl:pr-[113px] flex-col-reverse md:flex-row justify-center items-center gap-[24px] xl:gap-[190px]'>
        <div className=''>
            <p className='xl:pb-[30px] mb-[5px] lg:mb-[23px] text-[36px] lg:text-[42px] xl:text-[48px] font-[600] md:font-[700] lg:leading-[57.68px]'>A wide reach  and coverage</p>
            <p className='mb-[11px] font-[400] text-[16px] lg:text-[20px] leading-[24px]'>
                We offer a wide range of disco electricity  at unbeatable prices, we <br/>
                get the most strategic partners, to give you the <br/>
                best deals in the market.
            </p>

            <p className='font-[400] text-[16px] lg:text-[20px] leading-[24px]'>
                Also, We are constantly reaching out to new partners with the aim <br/>
                to provide you with a wider range of services and lower market<br/> prices.
            </p>
        </div>

        <img src={sec2img} alt="" width={559} height={559} className='h-[300px] md:w-[250px] md:h-[250px] lg:w-[459px] lg:h-[459px] xl:w-[559px] xl:h-[559px]' />

    </div>
  )
}

export default Section2