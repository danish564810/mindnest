import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../useAuth/useAuth";
import { Link } from "react-router-dom";
import Header from "../../Components/AccountHeader/Header";
const SuccessfulVerification = () => {
const{ onLogout} = useAuth();
    const navigate = useNavigate();    
    const location = useLocation();
    const reason = location.state?.reason;
      
    const handleLogout = () => {
        onLogout(); 
        navigate("/Login"); 
      };

    return(
        <>
         <div>
           <Header/>
            <div className='page-content'>
                <div className='login-form-inner'>
                    <div className='log-main'>
                        <div className='log-inner'>
                            <div className="log-header varification-heading">
                                <h1>{reason === "Phone" ? "Phone Number Verified" : "Email Address Verified"}</h1>
                            </div>
                            <div className="confirmation-text text-center">
                                <p>Congratulations! Your {reason === "Phone"? "Phone number" : "Email Address"} has been confirmed sucessfully, now you can login</p>
                            </div>
                            <div className='submit-btn d-flex'>
                                        <button
                                        className='btn-account fn-btn-submit text-center align-items-center d-flex justify-content-center text-decoration-none'
                                         onClick={handleLogout}
                                        >Return to Login</button>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}
export default SuccessfulVerification;