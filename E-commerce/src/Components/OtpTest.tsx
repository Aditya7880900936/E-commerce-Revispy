import React from "react";
import { useNavigate } from "react-router-dom";
import EmailVerification from "./otp";
import { verifyOtp } from "../api/api"; // Import API function

const OtpTest: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";

  const handleVerify = async (code: string) => {
    try {
      const response = await verifyOtp(email, code); // Call API to verify OTP
      alert(response.message); // Show success message

      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      navigate("/login"); // Redirect after successful verification
    } catch (error: any) {
      alert(error.message || "Invalid OTP, please try again.");
    }
  };

  return (
    <EmailVerification 
      email={email} 
      onVerify={handleVerify} 
      fetchOtpFromBackend={() => Promise.resolve("")} 
    />
  );
};

export default OtpTest;
