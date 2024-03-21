import React, { useState, useRef, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";

  const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3 && value !== "") {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const newOtp = [...otp];
    newOtp.splice(index, pastedData.length, ...pastedData.split(""));
    setOtp(newOtp.slice(0, 4));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].current.focus();
      } else {
        inputRefs.current[0].current.focus();
      }
    }

    if (index === 3 && e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(`/otp/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error during OTP resend:", error);
    }
  };

  const handleSubmit = useCallback(async () => {
    const enteredOTP = otp.join("");
    try {
      const response = await fetch(`/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          otp: enteredOTP,
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/dashboard");
        localStorage.setItem("isEmailVerified", "true");
      } else {
        setOtp(["", "", "", ""]);
        alert("Invalid OTP. Please re-enter.");
        inputRefs.current[0].current.focus();
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  }, [otp, setOtp, navigate]);

  // Auto-submit when all digits are filled
  useEffect(() => {
    const filledDigits = otp.filter((digit) => digit !== "").length;
    if (filledDigits === 4) {
      handleSubmit();
    }
  }, [otp,handleSubmit]);

  return (
    <>
      <div
        className="relative flex flex-col bg-gray-50 font-helvetica-neue"
        style={{
          minHeight: `calc(100vh - 76px)`,
          transition: `opacity 300ms ease-in-out`,
        }}
      >
        <div className="flex flex-col items-center justify-center bg-white px-6 py-10 shadow-xl mx-auto w-full max-w-md rounded-2xl mt-20">
          <img
            className="h-10 w-auto mb-2"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Company Logo"
          />
          <p className="mt-2 font-semibold text-3xl">Check Your Email</p>
          <p className="mb-4 flex flex-row text-sm font-medium text-gray-400">
            We've sent you a one-time pin, enter it here.
          </p>

          <div className="flex mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                ref={inputRefs.current[index]}
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e, index)}
                className="w-12 h-12 text-center mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white text-sm shadow-sm"
          >
            Verify Account
          </button>

          <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500 m-2">
            <p>Didn't receive the code?</p>{" "}
            <button
              className="flex items-center text-blue-600"
              onClick={handleResend}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
