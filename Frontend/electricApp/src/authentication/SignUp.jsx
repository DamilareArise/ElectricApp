import  { useState } from 'react';
import Nav from "../components/nav";
import signup from "../assets/signup.jpg";
import message from "../assets/message.svg";
import passwordd from "../assets/password.svg";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  let navigate = useNavigate()
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
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
      const response = await fetch('http://localhost:5000/account/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        // Redirect to login page
        if (data.status){
          navigate('/login')
        }else{
          setGeneralError('Signup failed. Please try again.');
        }
      } else {
        setGeneralError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setGeneralError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Nav />

      <div className="flex items-center justify-between gap-[104px] pl-[57px] pr-[57px] mt-[50px] mb-[58px]">
        <img src={signup} alt="Sign Up" width={323} height={323} className="w-[40%] loginimg" />
        <div className="w-[50%] pt-[32px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px]">
          <form onSubmit={handleSubmit}>
            <p className="pb-[32px] text-center">Sign Up</p>

            <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
              <input
                type="text"
                placeholder="First Name"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
              <input
                type="text"
                placeholder="Last Name"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>


            <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
              <input
                type="number"
                placeholder="Phone Number"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-[23.3px]">
              <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <img src={message} alt="Email" width={22.07} height={17.43} />
                <input
                  type="email"
                  placeholder="Email"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
            </div>

            <div className="mb-[23.3px]">
              <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <img src={passwordd} alt="Password" width={22.07} height={17.43} />
                <input
                  type="password"
                  placeholder="Password"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
            </div>

            <div className="mb-[39.3px]">
              <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <img src={passwordd} alt="Confirm Password" width={22.07} height={17.43} />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {confirmPasswordError && <div className="text-red-500 text-sm">{confirmPasswordError}</div>}
            </div>

            <button
              type="submit"
              className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px]"
            >
              Sign Up
            </button>

            {generalError && <div className="text-red-500 text-sm text-center">{generalError}</div>}

            <div className="text-center mt-[32px]">
              <p>
                Already a registered member? <Link to='/'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
