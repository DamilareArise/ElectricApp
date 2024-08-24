import  { useState} from 'react';
import loginImg from "../assets/loginImg.jpg";
import message from "../assets/message.svg";
import passwordd from "../assets/password.svg";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  let navigate = useNavigate()
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setPasswordError('Password is required');
    } else if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
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

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`https://electricapp.onrender.com/account/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.status){
          console.log('Login successful:', data);
          //na this place you route go another page
          localStorage.token = data.token
          navigate('/dashboard')
        }
        else{
          console.log('Login failed:', data);
          }
        setPasswordError('Login failed. Please check your credentials.');
        
      } else {
        setPasswordError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setPasswordError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-[url('./assets/loginImg.jpg')]  lg:bg-none bg-cover bg-center h-[100vh] lg:h-fit">
      <Navbar/>

      <div className="flex /bg-[url('./assets/loginImg.jpg')] items-center justify-center lg:justify-between h-full lg:h-fit gap-[104px] px-[24px] lg:pl-[57px] lg:pr-[57px] mt-[50px] mb-[58px] pt-[70px]">
        <img src={loginImg} alt="Login" width={323} height={323} className="w-[40%] loginimg hidden lg:block" />
        <div className="md:w-[70%] lg:w-[50%] pt-[32px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px] ">
          <form onSubmit={handleSubmit}>
            <p className="pb-[32px] text-center">Login</p>

            <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
              <img src={message} alt="Email" width={22.07} height={17.43} />
              <input
                type="email"
                placeholder="Email"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {emailError && <div className="text-red-500 text-sm mb-[23.3px]">{emailError}</div>}

            <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
              <img src={passwordd} alt="Password" width={22.07} height={17.43} />
              <input
                type="password"
                placeholder="Password"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {passwordError && <div className="text-red-500 text-sm mb-[39.3px]">{passwordError}</div>}

            <button
              type="submit"
              className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px]"
            >
              Login
            </button>

            <a href="#" className="w-full">
              <p className="text-right">Forget password?</p>
            </a>

            <div className="text-center mt-[32px]">
              <p>
                Already a registered member? <Link to='/SignUp'>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
