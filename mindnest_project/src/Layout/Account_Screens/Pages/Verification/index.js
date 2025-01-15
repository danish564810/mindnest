import React, { useRef, useState, useEffect } from 'react';
import Header from '../../Components/AccountHeader/Header';
import { useAuth } from '../../../../useAuth/useAuth';
import { useNavigate } from "react-router-dom";
import { verifyCode } from '../../../../Api';
import { forgotPassword } from '../../../../Api';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import Cookies from 'js-cookie';
import { useLoading } from '../../../../context/LoadingContext';

function Verification() {
  const { emailOrPhone, setVerificationData,setUserPhoneOrEmail,flowType, resetAuthFlow,} = useAuth();
  const {startLoading, stopLoading, isLoading} = useLoading();
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0)
  const [resendDisabled, setResendDisabled] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [didntReceiveDisabled, setDidntReceiveDisabled] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Ensure you read emailOrPhone from cookies when the component is mounted
    if (!emailOrPhone) {
      const savedEmailOrPhone = Cookies.get("emailOrPhone");
      if (savedEmailOrPhone) {
        setUserPhoneOrEmail(savedEmailOrPhone); // This will update the context state
      }
    }
  }, [emailOrPhone, setUserPhoneOrEmail]);
  useEffect(() => {
    let intervalId;
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(intervalId); // Stop the interval once the countdown is over
            setResendDisabled(false); // Re-enable resend button
            setDidntReceiveDisabled(false); // Re-enable "Didn't receive" button
          }
          return prev - 1;
        });
      }, 1000); // Update every second
    }
    return () => clearInterval(intervalId); // Cleanup interval on component unmount or when countdown stops
  }, [countdown]);

//format phone number 
const formatPhoneNumber = (phone) => {
const phoneNumber = phone?.replace(/[^\d]/g, '');
return phoneNumber?.length === 10 ? `+1 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}` : phone;
}


  const handleInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      e.preventDefault();
      return;
    }
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (e.key === 'Backspace') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      e.target.value = ''; // Clear input value
      e.preventDefault();
    }
    const updatedCode = inputRefs.current.map(input => input.value).join('');
    setCode(updatedCode);  // Update the code state
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('Text');
    const numericPastedText = pastedText.replace(/\D/g, '');

    // Distribute pasted characters across the inputs
    [...numericPastedText].forEach((char, i) => {
      if (index + i < 6) inputRefs.current[index + i].value = char;
    });

    inputRefs.current[index + numericPastedText.length]?.focus(); // Move focus to next input
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    
    const otp = inputRefs.current.map(input => input.value).join(''); // Collect OTP
    const phoneNumber = emailOrPhone;
    const Token  = Cookies.get('authToken');
    const reason = emailOrPhone.includes('@') ? "Email" : "Phone";
   try {
      const response = await verifyCode(phoneNumber, otp, reason, Token ,); 
     if (response && response.userId && response.code) {
       const { userId, code } = response;
        setVerificationData(userId, code);
        if (flowType === 'register') {
          navigate('/');
        } else if (flowType === 'passwordReset') {
          navigate('/ResetPassword');
        }else{
          navigate('/successfulVerification', {state: {reason}});
        }
        
    
    } else {
        setErrorMessage("Verification failed:", response?.message || "Invalid OTP");
    }
    } catch (error) {
      setErrorMessage(error.message || 'Verification failed.');
    }
    stopLoading();
};

const handleResend = async(e) => {
  e.preventDefault();
  setCode('');
  inputRefs.current.forEach(input => {
    input.value = '';  // Clear individual input fields
  });
  const emailOrPhone = emailOrPhone;
  setResendDisabled(true);
  setDidntReceiveDisabled(true);
  setCountdown(30);
  try {
    const response  = await forgotPassword (emailOrPhone);
    if(response) {
       
       const intervalId = setInterval(()=>{
        setCountdown((prev) => {
          if(prev === 1){
            clearInterval(intervalId);
            setResendDisabled(false);
            setDidntReceiveDisabled(false);
          }
          return prev -1 ;
        })
       }, 1000)



      if (flowType === 'register') {
        navigate('/Login');
       } else if (flowType === 'passwordReset') {
       navigate('/ResetPassword');
       }
       resetAuthFlow(); 
    }
   } catch (error) {
    setErrorMessage(error.message || 'Verification failed.');
   }
   stopLoading();
}     
const handleDidRecieveCode = ()=> {
  setShowResendButton(true);
}


  return (
    <div>
      <Header />
      {isLoading && <LoadingSpinner />}
      <div className="page-content">
        <div className="login-form-inner">
          <div className='login-page'>
            <div className="login-page-inner">
              <div className="log-header varification-heading">
                <h1 className="text-center">Verification Code</h1>
              </div>
              <div className="code-send-number">
                <p>Enter the 6-digit verification code sent to  <span className="verfiNumber">{formatPhoneNumber(emailOrPhone)}</span></p>
              </div>
              <small className="cd-dg">Enter the 6-digit code below. </small>
              <div className="verification-code-container">
                <form onSubmit={handleSubmit}>
                  <div className="input-container p-0 d-flex justify-content-between">
                    {[...Array(6)].map((_, index) => {
                      return (
                        <input
                          className='otp'
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          onChange={(e) => handleInput(e, index)} // Handle input change
                          onKeyDown={(e) => handleInput(e, index)} // Handle backspace key
                          onPaste={(e) => handlePaste(e, index)}
                        />
                      );
                    })}
                  </div>
                  {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                  <div className="submit-btn d-flex">
                    <button type="submit" className="btn-account fn-btn-submit" >Continue</button>
                  </div>
                </form>
              </div>
              <div className="cd-container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <button type="button"
                   onClick={handleDidRecieveCode}
                   disabled={didntReceiveDisabled}
                   className="btn mb-3 mt-2 get-code">
                    Didn't receive the code?
                  </button>
                  <form onSubmit={handleResend}>
                  {showResendButton && (
                    
                      <div className="code-links d-flex flex-column">
                        <button
                          type="submit"
                          className="btn btn-sm btn-link mb-2 resend-verification"
                          disabled={resendDisabled}
                        >
                          {resendDisabled ? `Resend after ${countdown}s` : 'Resend'}
                        </button>
                      </div>
                  
                  )}
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
