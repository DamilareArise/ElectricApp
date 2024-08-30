import { useState, useEffect } from "react";
import logo from "./../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {
    scrollToTop(); // Scrolls to the top when component mounts
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-[24px] xl:px-[96px] pt-[14px] pb-[12.12px] flex justify-between items-center bg-[#EDA145] w-full fixed top-0 z-[10000]">
      <div className="flex justify-between gap-[68px] w-full basis-[100%]">
        <img src={logo} width={120} height={70} alt="" srcSet="" />

        <div
          className={` navMenu ${
            isOpen ? " active " : ""
          }  lg:flex lg:items-center lg:justify-between basis-[70%]`}
        >
          <span className="flex flex-col lg:flex-row gap-[16px] lg:gap-[0px] items-start text-[#170045] nav-link">
            <Link to="/" className="ink">
              Home
            </Link>
            <Link to="/dashboard" className="ink" onClick={scrollToTop}>
              Dashboard
            </Link>
            <Link to="/transactions" className="ink" onClick={scrollToTop}>
              Transactions
            </Link>
            <Link to="" className="ink" onClick={scrollToTop}>
              Settings
            </Link>
          </span>

          <Link
            to="/dashboard"
            className="py-[17.94px] px-[39.96px] bg-[#012436] text-[#EDA145] rounded-[6.52px] md:text-[14px] xl:text-[22.83px] font-[400] leading-[27.4px]"
          >
            Buy Electricity
          </Link>
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

export default Navbar;
