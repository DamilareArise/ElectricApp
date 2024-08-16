import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="bg-[#00000099] bg-[url('./assets/header.png')] bg-cover bg-top">
      <div className="  bg-[#00000099]  h-[90vh] flex flex-col justify-end items-center text-[#EDA145]  gap-[31px]">
        <p className="text-[58px] text-center">
            Pay 
            <span> Electricity bill </span> 
             from anywhere,<br/> at your comfort anytime
        </p>

        <p className="text-center text-[28px]">
            Fast and easiest way to buy power at your <br/>
            convenience without stress
        </p>

        <Link to='/' className="py-[22px] px-[49px] rounded-[8px] mb-[71px] text-[#012436] bg-[#EDA145]">Buy now</Link>
    </div>
    </div>
  )
}

export default Header