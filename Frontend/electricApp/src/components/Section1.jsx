// import React from 'react'
import secimg from './../assets/sec1Img.png'

const section1 = () => {
  return (
    <div className='flex px-[53px] pt-[175px] justify-center gap-[190px]'>
        <img src={secimg} alt="" width={459}/>
        <div className='flex flex-col gap-[40px] '>
            <p>How it Works</p>

            <div className='flex flex-col  gap-[35.07px] sec1'>
                <div>
                    <p>Step  1</p>
                    <p>Choose a Disco company that suits your region</p>
                </div>

                <div>
                    <p>Step  2</p>
                    <p>Make payment online securely</p>
                </div>

                <div>
                    <p>Step  3</p>
                    <p>Track previous payments and time</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default section1