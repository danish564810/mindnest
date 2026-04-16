import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css';
import home from "../../../../assests/svgs/home.svg";
import chat from "../../../../assests/svgs/chat.svg";
import provider from "../../../../assests/svgs/provider.svg";
import prescription from "../../../../assests/svgs/prescriptions.svg";
import medical from "../../../../assests/svgs/medical.svg";
import Contact from "../../../../assests/svgs/contacts.svg";
const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="navbar">
                    <nav>
                        <ul className="nav-bar p-0">
                            <li className="active list-unstyled d-flex">
                                <Link to="/" className=" d-flex align-items-center send-request">
                                    <img src={home} alt="home"/>
                                    <div className="nav__text"> MyNest</div>
                                </Link>
                            </li>
                            <li className="list-unstyled d-flex">
                                <Link to="/chat"k className=" d-flex align-items-center send-request">
                                <img src={chat} alt="chat"/>
                                    <div className="nav__text"> Chat</div>
                                </Link>
                            </li>
                            <li className="list-unstyled d-flex">
                                <Link to ="/findproviderlist    " className=" d-flex align-items-center send-request">
                                    <img src={provider} alt="provider"/>
                                    <div className="nav__text"> Find a Provider</div>
                                </Link>
                            </li>
                            <li className="list-unstyled d-flex">
                                <Link className="d-flex align-items-center send-request">
                                    <img src={prescription} alt="prescription"/>
                                    <div className="nav__text"> Prescriptions</div>
                                </Link>
                            </li>
                            <li className="list-unstyled d-flex">
                                <Link to="/medicalsummary" className=" d-flex align-items-center send-request">
                                    <img src={medical} alt="medical"/>
                                    <div className="nav__text"> Medical Summary</div>
                                </Link>
                            </li>
                            <li className="  list-unstyled d-flex">
                                <Link className=" d-flex align-items-center send-request">
                                    <img src={Contact} alt="contact"/>
                                    <div className="nav__text"> Contact us</div>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Sidebar;