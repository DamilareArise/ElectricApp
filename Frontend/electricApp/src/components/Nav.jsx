// import { useState, useEffect } from "react";
// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
// }
// function Nav() {
//   useEffect(() => {
//     scrollToTop(); 
//   }, []);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div 
//     className={` navMenu ${
//       isOpen ? " active " : ""
//     }  lg:flex lg:items-center lg:justify-between basis-[80%] bg-[#EDA145]`}
//     >

//       <div className="flex justify-between px-[24px] pt-[14px] pb-[12.12px] items-center  ">
//               <a href="http://">LOGO</a>
//               <div className="flex gap-[5px] nav-links ">
//                   <a href="http://">Home</a>
//                   <a href="http://">Dashboard</a> 
//                   <a href="http://">Transactions</a> 
//                   <a href="http://">Settings</a>
//               </div> 

//               <a href="http://" className="py-[17.94px] px-[39.96px] bg-[#012436] text-[#EDA145] rounded-[6.52px] md:text-[14px] xl:text-[22.83px] font-[400] leading-[27.4px]">Buy Electricity</a>

//               <button
//                 type="button"
//                 className={`hamburger lg:hidden ${isOpen ? "active" : ""}`}
//                 onClick={toggleMenu}
//               >
//                 <div className="hamburger-bar top"></div>
//                 <div className="hamburger-bar middle"></div>
//                 <div className="hamburger-bar bottom"></div>
//               </button>
//           </div>
//     </div>
//   )
// }

// export default Nav


import { useState, useEffect } from "react";
import logo from './../assets/logo.svg'
import { Link } from "react-router-dom";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const Nav = () => {
  useEffect(() => {
    scrollToTop(); // Scrolls to the top when component mounts
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="px-[24px] xl:px-[96px] pt-[14px] pb-[12.12px] flex justify-between items-center bg-[#EDA145] w-full fixed top-0 z-[10000]">
      <div className="flex justify-between gap-[68px] w-full basis-[100%]">
        <img
          src={logo}
          width={80}
          height={40}
          alt=""
          srcSet=""
        />

        <div
          className={` navMenu ${
            isOpen ? " active " : ""
          }  lg:flex lg:items-center lg:justify-between basis-[80%]`}
        >
          <span className="flex flex-col lg:flex-row gap-[16px] lg:gap-[0px] items-start text-[#170045]">
            <a
              href="/"
              className=""
            >
              Home
            </a>
            <Link
              to="/"
              className="" onClick={scrollToTop}
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="" onClick={scrollToTop}
            >
              Transactions
            </Link>
            <Link
              to=""
              className="" onClick={scrollToTop}
            >
              Settings
            </Link>
           
          </span>
          
          <a href="http://" className="py-[17.94px] px-[39.96px] bg-[#012436] text-[#EDA145] rounded-[6.52px] md:text-[14px] xl:text-[22.83px] font-[400] leading-[27.4px]">Buy Electricity</a>
          
          
        </div>
      </div>

      <button
        type="button"
        className={`hamburger lg:hidden ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="hamburger-bar top"></div>
        <div className="hamburger-bar middle"></div>
        <div className="hamburger-bar bottom"></div>
      </button>
    </div>
  );
};

export default Nav;
