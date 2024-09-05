// import React from 'react'

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Eproviders = () => {
  let url = "https://api.budpay.com/api/v2/electricity";
  const bearerToken = "sk_test_xs7qwqzpxa1zscb5zbg2ebm9bmwei3ptc5wvlzw";
  const [Providers, setProviders] = useState([]);
  const [payType, setPayType] = useState("pay for me");
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
        // console.log(response.json())
      })
      .then((data) => {
        console.log(data);
        setProviders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePayToggle =(type)=>{
   
      setPayType(type);
  
}

  return (
    <div className="pt-[85px]">
      <Navbar />
      <div className="relative w-[100%]">
        <Sidebar />

        <div className="flex">
          <div className="w-[20%]"></div>
          <div className="px-[32px] flex flex-col gap-[24px] w-[80%]">
            <div className="flex justify-center mt-[94px]">
              <button onClick={()=>handlePayToggle('pay for me')} className={`py-[10px] px-[25px] md:px-[47px] font-[500] text-[18px] md:text-[28px] leading-[33.6px] ${payType === 'pay for me' ? 'bg-[#012436] text-[#EDA145]' : 'border-[1px] border-[#012436'} rounded-[8px]`}>pay for me</button>
              <button onClick={()=>handlePayToggle('pay for others')} className={`py-[10px] px-[25px] md:px-[47px] font-[500] text-[18px] md:text-[28px] leading-[33.6px] ${payType === 'pay for others' ? 'bg-[#012436] text-[#EDA145]' : 'border-[1px] border-[#012436'} rounded-[8px]`}>pay for others</button>
            </div>
            <p className="text-[24px] font-[600] leading-[28.8px] text-[#000000] text-center mt-[43px]">
              Select Electricity Disco
            </p>
            <div className="flex flex-wrap justify-center gap-x-[39px]">
              {payType === "pay for me" &&
                (Providers.length > 0
                  ? Providers.map((provider, index) => (
                      <Link to={'/paybill'}
                        key={index}
                        className="flex items-center justify-between gap-[88px] w-[480px] /h-[120px] rounded-[16px] pl-[33px] pr-[27px] py-[18.5px] mb-[44px] shadow-[#00000040] shadow-md hover:scale-x-[1.1] transition-all hover:bg-[#00000040]"
                      >
                        <p className="text-[19.2px] font-[400] leading-[23.04px]">
                          {provider.code}
                        </p>
                        {/* <p className="text-[19.2px] font-[400] leading-[23.04px]">{provider.provider}</p> */}
                        <img
                          src={`https://api.budpay.com/${provider.providerLogoUrl}`}
                          alt=""
                          width={156}
                          height={80}
                          className="/w-[156px] h-[120px]  "
                        />
                        {/* <p>{`https://api.budpay.com/${provider.providerLogoUrl}`}</p> */}
                      </Link >
                    ))
                  : "Loading Providers")}

              {payType === "pay for others" &&
                (Providers.length > 0
                  ? Providers.map((provider, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-[88px] w-[480px] /h-[120px] rounded-[16px] pl-[33px] pr-[27px] py-[18.5px] mb-[44px] shadow-[#00000040] shadow-md hover:scale-x-[1.1] transition-all hover:bg-[#00000040]"
                      >
                        <p className="text-[19.2px] font-[400] leading-[23.04px]">
                          {provider.code}
                        </p>
                        {/* <p className="text-[19.2px] font-[400] leading-[23.04px]">{provider.provider}</p> */}
                        <img
                          src={`https://api.budpay.com/${provider.providerLogoUrl}`}
                          alt=""
                          width={156}
                          height={80}
                          className="/w-[156px] h-[120px]  "
                        />
                        {/* <p>{`https://api.budpay.com/${provider.providerLogoUrl}`}</p> */}
                      </div>
                    ))
                  : "Loading Providers")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eproviders;
