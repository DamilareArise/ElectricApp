// import React from 'react'


import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import nulltransac from "./../assets/nulltransac.gif";

const Transactions = () => {
  const [transac, setTransac] = useState([]);
  const userId = localStorage.userId
  let url =`https://electricapp.onrender.com/transaction/all-transaction/${userId}` 
  const bearerToken = "sk_test_xs7qwqzpxa1zscb5zbg2ebm9bmwei3ptc5wvlzw";

  useEffect(()=>{
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
  
    }
    )
    .then((res)=>{
      if(res.status==200){
        res.json()
        .then((res)=>{
          // console.log(res)
          setTransac(res.transactions)
        })
      }
    })
    
    .catch((err)=>{
      console.error(err)})
  }, [userId])

  console.log(transac);
  

  return (
    <div className="pt-[85px]">
      <Navbar />
      <div className="relative">
        <Sidebar />

        <div className="flex">
          <div className="w-[20%] hidden lg:block"></div>
          <div className="pt-[45] mt-[45px] px-[20px] w-full lg:w-[80%]">
            <div className="bg-[#F8F4F4] px-[20px] border-[1px] border-[#000000] h-[80dvh] overflow-x-auto ">
              <table className="md:w-full w-[600px]">
                <thead>
                  <tr className="py-[20px] transac-heading border-b-[1px] border-[#DAD9D9]">
                    <th className="border-r-[3px] border-[#D9D6D6] w-[5%]">ID</th>
                    <th className="border-r-[3px] border-[#D9D6D6] w-[5%]">Status</th>
                    <th className="border-r-[3px] border-[#D9D6D6] w-[20%]">Category</th>
                    <th className="border-r-[3px] border-[#D9D6D6] w-[10%]">Amount</th>
                    <th className="border-r-[3px] border-[#D9D6D6] w-[15%]">Token</th>
                    <th className="border-r-[3px] border-[#D9D6D6] w-[15%]">Customer Name</th>
                    <th className="border-r-[3px] border-[#D9D6D6] w-[20%]">Meter no.</th>
                    <th className="w-[15%]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transac.length === 0 ? (
                    <tr>
                      <td colSpan="7">
                        <div className="mt-[43px] flex flex-col justify-center items-center">
                          <img src={nulltransac} width={256} height={242} alt="" className="pt-[100px]" />
                          <p className="text-[24px] font-[400] leading-[28.8px] text-[#898989] pb-[33px]">No transaction recorded yet</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transac.map((transaction, index) => (
                      <tr key={index}>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">{index+1}</td>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">

                          {transaction.successful? <span className="text-green-700 text-[16px] text-center">Successful</span> : <span className="text-red-500 text-[16px] text-center">Failed</span>}
                          
                        </td>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">{transaction.category}</td>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">{transaction.amount}</td>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">{transaction.token ? transaction.token : '---'}</td>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">{transaction.customerName}</td>
                        <td className="border-r-[3px] border-[#D9D6D6] text-center">{transaction.meterNo}</td>
                        <td>{new Date(transaction.date).toLocaleString()}</td>
                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
