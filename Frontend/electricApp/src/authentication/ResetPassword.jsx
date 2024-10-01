import { useEffect, useState } from 'react';
import loginImg from "../assets/loginImg.jpg";
import passwordd from "../assets/password.svg";
import { Link, useParams } from "react-router-dom";
import Navbar from '../components/Navbar';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [in_token, set_in_token] = useState('')

  let { token } = useParams()
  useEffect(() => {
    if (token) {
      set_in_token(token);
    }
  }, [token]);

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

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (!newConfirmPassword) {
      setConfirmPasswordError('Confirm password is required');
    } else if (newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else if (confirmPassword !== password) {
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

    setLoading(true);
  };


  const resetPassword = ()=>{
    
    fetch('https://electricapp.onrender.com/account/forgot-password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        in_token,
        password
        }),
    })
        .then((response) => {
        return response.json(); // Ensure this returns a promise
        
        })
        .then((data) => {
        console.log(data); // Handle the response data
        alert('Password has been reset successfully! proceed to login');
        })
        .catch((err) => {
        console.log(err); // Handle any errors
        alert('Password has reset failed!');
        });
        setLoading(false);

  }


  return (
    <div className="bg-[url('./assets/loginImg.jpg')] lg:bg-none bg-cover bg-center h-[100vh] /lg:h-fit">
      <Navbar />

      <div className="flex items-center justify-center lg:justify-between h-full /lg:h-fit gap-[104px] px-[24px] lg:pl-[57px] lg:pr-[57px] mt-[50px] mb-[58px] pt-[70px]">
        <img src={loginImg} alt="Reset Password" width={323} height={323} className="w-[40%] hidden lg:block" />
        <div className="md:w-[70%] lg:w-[50%] pt-[32px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px]">
          <form onSubmit={handleSubmit}>
            <p className="pb-[32px] text-center text-[16px] md:text-[28px] font-[500]">Reset Password</p>

            <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
              <img src={passwordd} alt="Password" width={22.07} height={17.43} />
              <input
                type="password"
                placeholder="New Password"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[23.3px]"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {passwordError && <div className="text-red-500 text-sm mb-[23.3px]">{passwordError}</div>}

            <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
              <img src={passwordd} alt="Confirm Password" width={22.07} height={17.43} />
              <input
                type="password"
                placeholder="Confirm Password"
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[23.3px]"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {confirmPasswordError && <div className="text-red-500 text-sm mb-[23.3px]">{confirmPasswordError}</div>}

            <button
              type="submit"
              className={`py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px] hover:opacity-[75%]`}
              disabled={loading}
              onClick={resetPassword}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className="text-center mt-[32px]">
              <p className="md:text-[20px] font-[400] text-[16px]">
                <Link to='/Login' className='font-[400] text-[16px] md:text-[20px]'>Back to Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
