import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bulb from "./../assets/bulb.svg";
import transacnull from "./../assets/transacnull.gif";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [notifications, setNotification] = useState("")


  useEffect(() => {
    getDashboard();
  }, []);
  
  let token = localStorage.token;
  let navigate = useNavigate();
  const getDashboard = async () => {
    // fetch data from API
    const response = await fetch(
      `https://electricapp.onrender.com/account/dashboard`,
      {
        method: "GET",
        headers: {
          authentication: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (!data.status) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.log(data.data);
      }
    }
  };
  // const notifications = true;

  return (
    <div className="pt-[85px]">
      <Navbar />
      {/* <h1>Dashboard</h1> */}

      <div className="relative">
        <Sidebar/>

        <div className="flex ">
          <div className="w-[20%]"></div>

          <div className=" mt-[41px] w-[80%]">
            <Link
              to="/paybill"
              className="flex flex-col w-[279px] rounded-[15px] gap-[57px] px-[23px] py-[40px] max-w-[279px] border-[1px] border-[#EDA145] ml-[30px] mb-[41px] pt-[40px] "
            >
              <img src={bulb} width={32} height={32} alt="" />
              <p className="text-[20px] font-[500] leading-[24px]">
                Pay Electric bill
              </p>
            </Link>

            <div className="py-[28px] pl-[44px] bg-[#F8F8F8] w-full">
              <p className="text-[28px] font-[500] leading-[33.6px] text-[#898989]">
                Notifications (0)
              </p>
            </div>

            {notifications == '' ? <div className="flex flex-col gap-[45px] justify-center items-center pb-[79px]">
              <img src={transacnull} width={300} height={180} alt="" />

              <p className="text-[24px] font-[400] leading-[28.8px] text-[#898989]">No Notifications yet</p>
            </div>: <div>something dey here</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
