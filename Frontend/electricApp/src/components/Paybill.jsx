import { useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Paybill = () => {
  let { provider } = useParams();

  const [formType, setFormType] = useState("prepaid");
  const [meterNumber, setMeterNumber] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(false);

  let url = "https://api.budpay.com/api/v2/electricity/validate";
  const bearerToken = "sk_test_xs7qwqzpxa1zscb5zbg2ebm9bmwei3ptc5wvlzw";

  const handleFormToggle = (type) => {
    setFormType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateProvider = async () => {
    console.log(provider, formType, meterNumber, amount);
    setLoading(true);
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
      console.log(data);
      setName(data.data.Customer_Name);
      setSuccess(data.success);
      return data.success;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="pt-[105px] flex justify-center items-center h-[95vh]">
      <Navbar />

      <div className="mt-[90px] md:w-[70%] lg:w-[50%] pt-[72px] pb-[32px] bg-[#FFFEFE] shadow-md shadow-[#00000040] px-[26px] rounded-[30px] ">
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
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px] hover:opacity-[75%]"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Proceed'}
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
            <p>
              <strong>Type:</strong> {submittedData.formType}
            </p>
            <p>
              <strong>
                {formType === "prepaid" ? "Meter Number" : "Account Number"}:
              </strong>{" "}
              {submittedData.meterNumber}
            </p>
            <p>
              <strong>Amount:</strong> {submittedData.amount}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <div className="mt-4">
              <button
                onClick={closeModal}
                className="py-[22px] bg-[#EDA145] rounded-tl-[20px] rounded-br-[20px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px] hover:opacity-[75%]"
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
