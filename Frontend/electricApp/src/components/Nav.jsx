

function Nav() {
  return (
    <div className="flex justify-between px-[24px] pt-[14px] pb-[12.12px] items-center bg-[#EDA145]">
        <a href="http://">LOGO</a>
        <div className="flex gap-[5px] nav-links ">
            <a href="http://">Home</a>
            <a href="http://">Dashboard</a> 
            <a href="http://">Transactions</a> 
            <a href="http://">Settings</a>
        </div> 

        <a href="http://" className="py-[17.94px] px-[39.96px] bg-[#012436] text-[#EDA145] rounded-[6.52px] text-[22.83px] font-[400] leading-[27.4px]">Buy Electricity</a>
    </div>
  )
}

export default Nav