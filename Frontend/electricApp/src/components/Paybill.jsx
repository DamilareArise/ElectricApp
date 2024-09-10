import { useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Paybill = () => {
  // State and variables
  let { provider } = useParams();
  const [formType, setFormType] = useState("prepaid");
  const [meterNumber, setMeterNumber] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  const url = "https://api.budpay.com/api/v2/electricity/validate";
  const url2 = "https://api.budpay.com/api/v2/electricity/recharge";
  const bearerToken = "sk_test_xs7qwqzpxa1zscb5zbg2ebm9bmwei3ptc5wvlzw";

  // Form toggler (prepaid/postpaid)
  const handleFormToggle = (type) => {
    setFormType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateReferenceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const randomDigits = Math.floor(Math.random() * 1e11).toString().padStart(11, "0");

    return `${year}${month}${day}${randomDigits}`;
  };

  const validateProvider = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: meterNumber,
          provider: provider,
          type: formType,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error("Provider validation failed");
      }
      setName(data.data.Customer_Name);
      setSuccess(data.success);
      return data.success;
    } catch (err) {
      setError("Error validating provider");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Log transaction
  const logTransaction = async (success, referenceNumber, token) => {
    const logUrl = "https://electricapp.onrender.com/transaction/log-transaction";

    try {
      const response = await fetch(logUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId: "USER_ID",
          customerName: name,
          meterNo: meterNumber,
          amount: amount,
          token: token || "", 
          category: formType,
          refrenceId: referenceNumber,
          successful: success,
        }),
      });
      const logData = await response.json();
      console.log("Transaction Log:", logData); 
    } catch (err) {
      console.error("Error logging transaction:", err);
    }
  };

  const recharge = async () => {
    setLoading(true);
    setError("");
  
    let referenceNumber = null;
  
    try {
      referenceNumber = generateReferenceNumber();
  
      console.log("Generated Reference Number:", referenceNumber); 
  
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: meterNumber,
          provider: provider,
          type: formType,
          amount,
          reference: referenceNumber, 
        }),
      });
  
      const data = await response.json();
  
      if (!data.success) {
        throw new Error("Recharge failed");
      }
  
    
      await logTransaction(data.success, referenceNumber, data.data.token);
  
      setRechargeSuccess(data.success);
      closeModal();
    } catch (err) {
      setError("Error during recharge");
  
      
      if (referenceNumber) {
        await logTransaction(false, referenceNumber, null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount < 500) {
      setAmountError("Amount cannot be less than 500");
      return;
    }

    const isValid = await validateProvider();

    if (isValid) {
      const data = {
        formType,
        meterNumber,
        amount,
      };
      setSubmittedData(data);
      setIsModalOpen(true);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (value < 500) {
      setAmountError("Amount cannot be less than 500");
    } else {
      setAmountError("");
    }
  };

  return (
    <div className="pt-[105px] flex justify-center items-center h-[95vh]">
      <Navbar />

      <div className="mt-[90px] md:w-[70%] lg:w-[50%] pt-[72px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px]">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-[62px]">
            <button
              type="button"
              className={`py-[10px] px-[25px] md:px-[47px] font-[500] text-[18px] md:text-[28px] leading-[33.6px] ${
                formType === "prepaid"
                  ? "bg-[#012436] text-[#EDA145]"
                  : "border-[1px] border-[#012436"
              } rounded-[8px]`}
              onClick={() => handleFormToggle("prepaid")}
            >
              Prepaid
            </button>
            <button
              type="button"
              className={`py-[10px] px-[25px] md:px-[47px] font-[500] text-[18px] md:text-[28px] leading-[33.6px] ${
                formType === "postpaid"
                  ? "bg-[#012436] text-[#EDA145]"
                  : "border-[1px] border-[#012436"
              } rounded-[8px]`}
              onClick={() => handleFormToggle("postpaid")}
            >
              Postpaid
            </button>
          </div>

          <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
            <input
              type="number"
              placeholder="Meter Number"
              className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-[23.3px] bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040]">
            <input
              type="number"
              placeholder="Amount"
              className="py-[20.91px] bg-[#F5F5F5] border-none outline-none w-full placeholder:md:text-[20px] placeholder:font-[400] placeholder:text-[16px]"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>

          {amountError && (
            <div className="text-red-500 text-sm mb-4">{amountError}</div>
          )}

          <button
            type="submit"
            className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px] hover:opacity-[75%]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Proceed"}
          </button>
        </form>

        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
      </div>

      {isModalOpen && !error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
            <p>
              <strong>Type:</strong> {submittedData.formType}
            </p>
            <p>
              <strong>Meter Number:</strong> {meterNumber}
            </p>
            <p>
              <strong>Amount:</strong> {amount}
            </p>
            <p>
              <strong>Account Name:</strong> {name}
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={recharge}
                className="bg-[#EDA145] px-4 py-2 text-white rounded hover:opacity-[70%]"
              >
               {loading ? "Loading..." : "confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paybill;
