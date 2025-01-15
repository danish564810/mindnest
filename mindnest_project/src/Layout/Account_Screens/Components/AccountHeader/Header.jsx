import React, { useContext } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import AuthButton from "../AuthButton";
import { useAuth } from '../../../../useAuth/useAuth';
import logo from '../../../../assests/images/logo.png';


const Header = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    
    
    return (
        <>
            <header>
                <div className="header-main fixed">
                    <div className="container d-flex align-items-center justify-content-center p-xxl-0 h-100">
                        <a href="https://onebehavioralhealth.com" className="logo d-flex align-items-center">
                            <span className="icon-logo">
                                <img src={logo} alt="logo image" />
                            </span>
                            <div className="logo-text"> Mindnest</div>
                        </a>
                        <div className="flex-fill text-right d-flex align-items-center justify-content-end fn-btn-account-action">
                       <AuthButton />
                        </div>
                    </div>
                </div>
            </header>
            
        </>
    );
}
export default Header; 