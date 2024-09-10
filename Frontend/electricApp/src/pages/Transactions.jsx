// import React from 'react'

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import nulltransac from "./../assets/nulltransac.gif";

const Transactions = () => {
  let transac = [];
  return (
    <div className="pt-[85px]">
      <Navbar />
      <div className="relative">
        <Sidebar />

        <div className="flex ">
          <div className="w-[20%] hidden lg:block"></div>
          <div className="pt-[45] mt-[45px] px-[20px] w-full lg:w-[80%]">
            <div className="bg-[#F8F4F4] px-[20px] border-[1px] border-[#000000] h-[80dvh]">
              <div className="py-[20px] transac-heading border-b-[1px] border-[#DAD9D9] w-full flex items-center text-center">
                <div className="border-r-[3px] border-[#D9D6D6] w-[5%]">ID</div>
                <div className="border-r-[3px] border-[#D9D6D6] w-[20%]">
                  Category
                </div>
                <div className="border-r-[3px] border-[#D9D6D6] w-[10%]">Amount</div>
                <div className="border-r-[3px] border-[#D9D6D6] w-[15%]">Token</div>
                <div className="border-r-[3px] border-[#D9D6D6] w-[20%]">
                  Meter no.
                </div>
                <div className="border-r-[3px] border-[#D9D6D6] w-[15%]">Date</div>
                <div className="w-[15%]">Phone number</div>
              </div>

              {transac.length == 0 ? (
                <div className="mt-[43px] flex flex-col justify-center items-center ">
                    <img src={nulltransac} width={256} height={242} alt="" className="pt-[100px] " />
                    <p className="text-[24px] font-[400] leading-[28.8px] text-[#898989] pb-[33px]">No transaction recorded yet</p>
                </div>
              ) : (
                <div className="mt-[43px] w-full">
                  {transac.map((transaction, index) => (
                    <div key={index}>
                      <div className="border-r-[3px] border-[#D9D6D6] w-[5%]">
                        {transaction.id}
                      </div>
                      <div className="border-r-[3px] border-[#D9D6D6] w-[20%]">
                        {/* this will def be an image url or something */}
                        {transaction.category}
                      </div>
                      <div className="border-r-[3px] border-[#D9D6D6] w-[10%]">
                        {transaction.token}
                      </div>
                      <div className="border-r-[3px] border-[#D9D6D6] w-[10%]">
                        Token
                      </div>
                      <div className="border-r-[3px] border-[#D9D6D6] w-[20%]">
                        Meter no.
                      </div>
                      <div className="border-r-[3px] border-[#D9D6D6] w-[15%]">
                        Date
                      </div>
                      <div className="w-[15%]">Phone number</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
