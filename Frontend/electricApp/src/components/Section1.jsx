// import React from 'react'
import secimg from './../assets/sec1Img.png'

const section1 = () => {
  return (
    <div className='flex px-[24px] lg:px-[53px] pt-[75px] lg:pt-[175px] flex-col md:flex-row justify-center items-center lg:gap-[24px] xl:gap-[190px]'>
        <img src={secimg} alt="" className='h-[300px] md:w-[250px] md:h-[250px] lg:w-[459px] lg:h-[459px] xl:w-[559px] xl:h-[559px]'/>
        <div className='flex flex-col md:gap-[20px] lg:gap-[40px] text-[#000000] '>
            <p className='font-[600] md:font-[700] text-[36px] lg:text-[48px] leading-[57.6px]'>How it Works</p>

            <div className='flex flex-col md:gap-[20px] lg:gap-[35.07px] sec1'>
                <div className='step'>
                    <p>Step  1</p>
                    <p>Choose a Disco company that suits your region</p>
                </div>

                <div className='step'>
                    <p>Step  2</p>
                    <p>Make payment online securely</p>
                </div>

                <div className='step'>
                    <p>Step  3</p>
                    <p>Track previous payments and time</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default section1