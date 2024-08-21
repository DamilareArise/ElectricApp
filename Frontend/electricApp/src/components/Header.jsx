import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="bg-[#00000099] bg-[url('./assets/header.png')] bg-cover bg-top">
      <div className="  bg-[#00000099]  h-[90vh] flex flex-col justify-end items-center text-[#EDA145]  gap-[31px]">
        <p className="text-[36px] md:text-[42px] lg:text-[58px]  text-center font-[600] md:font-[700] /text-[#000000] /text-[52.08px] ">
            Pay 
            <span className="text-animation"> Electricity bill </span> 
             from anywhere,<br className="hidden md:block"/> at your comfort anytime
        </p>

        <p className="text-center text-[22px] lg:text-[28px]">
            Fast and easiest way to buy power at your <br className="hidden md:block"/>
            convenience without stress
        </p>

        <Link to='/' className="py-[22px] px-[49px] font-[400] text-[22px] lg:text-[28px] leading-[33.6px] rounded-[8px] mb-[71px] text-[#012436] bg-[#EDA145]">Buy now</Link>
    </div>
    </div>
  )
}

export default Header