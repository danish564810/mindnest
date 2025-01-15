import React, { useState } from "react";
import { useAuth } from "../../../../useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import './header.css'
import MindnestLogo from "../../../../assests/svgs/Mnlogo.svg";
import { Link } from "react-router-dom";

const Header =() =>{
    const [open, setOpen] = useState(false);
    const {authToken,user, onLogout} = useAuth();
    const navigate = useNavigate();
if(!authToken){
    return <div>Please log in to access the dashboard</div>
}
   const DropdDownHeader = ["My Profile", "Switch Profile", "Billing & Insurance", "Change Password", "Logout"];
   const handleLogOut = () => {
    onLogout();
    navigate("Login")
   }
    return(
        <>
        <header>
    <div className="header-main header-st-main">
        <div className="container">
            <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3 d-flex p-0 align-items-center">
                    <Link className="logo d-flex align-items-center">
                        <div className="logo-image">
                            <img src={MindnestLogo} alt="Mindnest logo"/>
                        </div>
                        <div className="logo-tx">
                            Mindnest
                        </div>
                    </Link>
                </div>
                <div className="col-lg-10 col-md-9 col-sm-9">
                    <div className="ph-main">
                        <div className="profile_pic  d-flex align-items-center">
                            <div className="notifacation-icons">
                                <div className="icon-notification-icon">
                                    <span className="d-none counter-notification fn-total-notifications"></span>
                                </div>
                            </div>
                            <div className="dropdown" onClick={() => setOpen(!open)}>
                                <div className="dropdown-toggle d-flex align-items-center">
                                    <div className="user-image-container">
                                        <img className="profile-pic" src={user ? user.profileImage : 'N/A'} alt="profile-picture"/>
                                        <div className="online-mark"></div>
                                    </div>
                                    <div className="user-name">
                                        <span id="username" className="fn-user-fullname">{user ? user.firstName : 'Guest'}</span>
                                    </div>
                                </div>
                                {
                                    open &&
                                    <div className="dropdown-list">
                                    <ul>
                                        {
                                            DropdDownHeader.map((DropdDownHeader)=>(
                                                <li key={DropdDownHeader}
                                                onClick = {()=> {
                                                    if (DropdDownHeader === "Logout") {
                                                        handleLogOut();
                                                    }
                                                }}
                                                >
                                                    
                                                    
                                                    {DropdDownHeader}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
        </>
    )

}
export default Header;