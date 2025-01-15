import React from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import { useAuth } from '../../../../useAuth/useAuth'; 
const AuthButton = () => {
  const { authToken, onLogout, flowType, updateFlowType } = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const reason = location.state?.reason;

  // Check if the current page is login or signup
  const isHomePage = location.pathname === "/Login"; 
  const isSignupPage = location.pathname === "/Signup"; 
  const passwordReset = 
    location.pathname === "/Phone" || 
    location.pathname === "/Email" || 
    location.pathname === "/ResetPassword" || 
    location.pathname === "/Verification" || 
    location.pathname === "/successfulVerification";
    ;
    const checkUser = location.pathname === "/verification" || location.pathname === "/successfulVerification";
    const isVerificationScreen  = location.pathname === "/Verification";

  // Handle logout
  const handleLogout = () => {
    onLogout(); // Call logout function from context
    navigate("/Login"); // Navigate to the homepage (or login page) after logout
  };
  const handleSignUp = () => {
    updateFlowType('register');
    navigate('/Signup');
  };

  return (
    <>
    {authToken ? (
      <>
      {isVerificationScreen && flowType === "register" && (
        <button
        className="btn signButton d-flex align-items-center justify-content-center"
        onClick={handleLogout}
      >
        Logout
      </button>
      )}
      </>
    ): (
           <>
           {isHomePage && (
              <button
              onClick={handleSignUp}
              className="btn signButton d-flex align-items-center justify-content-center"
            >
              Sign Up
            </button>
           )}
           {isSignupPage && (
            <Link
            to="/"
            className="btn signButton d-flex align-items-center justify-content-center"
          >
            Sign In
          </Link>
           )}
           {passwordReset && flowType === "passwordReset" && (
            <Link
            to="/Login"
            className="btn signButton d-flex align-items-center justify-content-center"
          >
            Sign In
          </Link>
           )
             
           }
           {checkUser && flowType === "checkUser" &&(
            <Link
            to="/Login"
            className="btn signButton d-flex align-items-center justify-content-center"
          >
            Login
          </Link>
           )
             
           }
           
           </>
    )

    }
    </>
  );
};

export default AuthButton;