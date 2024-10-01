import { useEffect, useState } from 'react';
import loginImg from "../assets/loginImg.jpg";
import message from "../assets/message.svg";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail) {
      setEmailError('Email is required');
    } else if (!validateEmail(newEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  
  const sendMail = () => {
    fetch('https://electricapp.onrender.com/account/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        return response.json(); // Ensure this returns a promise
      })
      .then((data) => {
        console.log(data); // Handle the response data
      })
      .catch((err) => {
        console.log(err); // Handle any errors
      });
  };
  

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate an async operation, such as sending a password reset email
    setTimeout(() => {
      setLoading(false);
      alert('Password reset link has been sent to your email!');
    }, 2000);
  };

  return (
    <div className="bg-[url('./assets/loginImg.jpg')] lg:bg-none bg-cover bg-center h-[100vh] /lg:h-fit">
      <Navbar />

      <div className="flex items-center justify-center lg:justify-between h-full /lg:h-fit gap-[104px] px-[24px] lg:pl-[57px] lg:pr-[57px] mt-[50px] mb-[58px] pt-[70px]">
        <img src={loginImg} alt="Forgot Password" width={323} height={323} className="w-[40%] hidden lg:block" />
        <div className="md:w-[70%] lg:w-[50%] pt-[32px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px]">
          <form onSubmit={handleSubmit}>
            <p className="pb-[32px] text-center text-[16px] md:text-[28px] font-[500]">Forgot Password</p>

            <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
              <img src={message} alt="Email" width={22.07} height={17.43} />
              <input
                type="email"
                placeholder="Email"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[23.3px]"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {emailError && <div className="text-red-500 text-sm mb-[23.3px]">{emailError}</div>}

            <button
              type="submit"
              className={`py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px]  hover:opacity-[75%]`}
              disabled={loading}
              onClick={sendMail}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center mt-[32px]">
              <p className="md:text-[20px] font-[400] text-[16px]">
                Remembered your password? <Link to='/Login' className='font-[400] text-[16px] md:text-[20px]'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
