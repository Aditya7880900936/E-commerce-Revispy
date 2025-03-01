import React, { useState, useRef, useEffect } from "react";

interface EmailVerificationProps {
  email: string;
  onVerify: (code: string) => void;
  fetchOtpFromBackend: () => Promise<string>; // Function to fetch OTP from backend
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerify,
  fetchOtpFromBackend,
}) => {
  const [code, setCode] = useState<string[]>(Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const maskedEmail = email.replace(/(.{3})(.*)(@.*)/, "$1***$3");

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 8);
  }, []);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    // Only accept digits
    if (/^\d*$/.test(value)) {
      newCode[index] = value.charAt(0);
      setCode(newCode);

      // Auto-focus next input if value is entered
      if (value && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key press for navigation between inputs
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 7) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 8).split("");

    if (digits.length) {
      const newCode = [...code];
      digits.forEach((digit, index) => {
        if (index < 8) {
          newCode[index] = digit;
        }
      });
      setCode(newCode);

      // Focus the input after the last pasted digit
      const focusIndex = Math.min(digits.length, 7);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // Fetch OTP from backend and auto-fill
  const fetchAndFillOtp = async () => {
    try {
      setIsLoading(true);
      const otpFromBackend = await fetchOtpFromBackend();

      if (otpFromBackend && otpFromBackend.length === 8) {
        const otpArray = otpFromBackend.split("");
        setCode(otpArray);
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill OTP when component mounts
  useEffect(() => {
    fetchAndFillOtp();
  }, []);

  // Submit verification code
  const handleSubmit = () => {
    const completeCode = code.join("");
    if (completeCode.length === 8) {
      onVerify(completeCode);
    }
    else{
      alert("Please enter a valid 8 digit code");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto my-12 p-8 border rounded-lg">
        <h1
          className="text-center mb-5 text-2xl font-bold"
        >
          Verify your email
        </h1>

        <p className="text-center mb-5">
          Enter the 8 digit code you have received on
          <br />
          {maskedEmail}
        </p>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">Code</label>
          <div
            className="flex justify-center space-x-2"
          >
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md mx-0.5"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={code.join("").length !== 8 || isLoading}
          className={`w-full py-3 bg-black text-white border-none rounded-md text-lg font-bold  
          ${
            code.join("").length === 8
              ? "cursor-pointer opacity-100"
              : "cursor-not-allowed opacity-70"
          }`}
        >
          {isLoading ? "LOADING..." : "VERIFY"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;

// Example usage:
//
// const App = () => {
//   const handleVerify = (code: string) => {
//     console.log('Verification code submitted:', code);
//     // Make API call to verify the code
//   }
//
//   const fetchOtpFromBackend = async () => {
//     // Example implementation:
//     // const response = await fetch('/api/get-otp');
//     // const data = await response.json();
//     // return data.otp;
//
//     // For demo, return a mock OTP
//     return Promise.resolve('12345678');
//   };
//
//   return (
//     <EmailVerification
//       email="dev***@revispy.com"
//       onVerify={handleVerify}
//       fetchOtpFromBackend={fetchOtpFromBackend}
//     />
//   );
// }
