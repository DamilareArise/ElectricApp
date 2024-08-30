import { useState } from 'react';
import Navbar from './Navbar';
import message from './../assets/message.svg';

const Paybill = () => {
  const [formType, setFormType] = useState('prepaid');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [submittedData, setSubmittedData] = useState({}); 

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

  const handleFormToggle = (type) => {
    setFormType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const data = {
      formType,
      meterNumber,
      amount,
      phoneNumber,
      email,
    };

   
    setSubmittedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-[105px] flex justify-center items-center h-[95vh]">
      <Navbar />

      <div className="mt-[90px] md:w-[70%] lg:w-[50%] pt-[72px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px] ">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-[62px]">
            <button
              type="button"
              className={`py-[10px] px-[25px] md:px-[47px] font-[500] text-[18px] md:text-[28px] leading-[33.6px] ${formType === 'prepaid' ? 'bg-[#012436] text-[#EDA145]' : 'border-[1px] border-[#012436'} rounded-[8px]`}
              onClick={() => handleFormToggle('prepaid')}
            >
              Prepaid
            </button>
            <button
              type="button"
              className={`py-[10px] px-[25px] md:px-[47px] font-[500] text-[18px] md:text-[28px] leading-[33.6px] ${formType === 'postpaid' ? 'bg-[#012436] text-[#EDA145]' : 'border-[1px] border-[#012436'} rounded-[8px]`}
              onClick={() => handleFormToggle('postpaid')}
            >
              Postpaid
            </button>
          </div>

          {formType === 'prepaid' && (
            <>
              <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <input
                  type="number"
                  placeholder="Meter Number"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                />
              </div>

              <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <input
                  type="number"
                  placeholder="Amount"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </>
          )}

          {formType === 'postpaid' && (
            <>
              <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <input
                  type="number"
                  placeholder="Account Number"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                />
              </div>

              <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
                <input
                  type="number"
                  placeholder="Amount"
                  className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
            <input
              type="number"
              placeholder="Phone Number"
              className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
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
                className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]  "
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {emailError && (
              <div className="text-red-500 text-sm">{emailError}</div>
            )}
          </div>

          <button
            type="submit"
            className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px]  hover:opacity-[75%]"
          >
            Proceed
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
            <p><strong>Type:</strong> {submittedData.formType}</p>
            <p><strong>{formType === 'prepaid' ? 'Meter Number' : 'Account Number'}:</strong> {submittedData.meterNumber}</p>
            <p><strong>Amount:</strong> {submittedData.amount}</p>
            <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <div className="mt-4">
              <button
                onClick={closeModal}
                className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px]  hover:opacity-[75%]"
              >
                Pay
              </button>
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paybill;
