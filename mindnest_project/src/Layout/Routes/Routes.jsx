import React from "react";
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Login from "../Account_Screens/Pages/Login";
import Signup from "../Account_Screens/Pages/Signup";
import Dashboard from "../Dashboard_Screens/dashboard";
import Verification from "../Account_Screens/Pages/Verification";
import PhoneNumber from "../Account_Screens/Pages/ForgotPassword/Phone";
import Email from "../Account_Screens/Pages/ForgotPassword/Email";
import ResetPassword from "../Account_Screens/Pages/ResetPassword";
import ResetSuccessfully from "../Account_Screens/Pages/ResetSuccessfully";
import PatientProfile from "../Dashboard_Screens/Pages/patient-profile/PatientProfile";
import SuccessfulVerification from "../Account_Screens/Pages/VerificatoinScreen";

import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Routers = () =>{
    return(
        <>
        <Router>
            <Routes>
           
            <Route exact path="/Login" element={<Login/>} />
            <Route exact path="/Signup" element={<Signup/>} /> 
            <Route exact path="/Email" element ={ <Email/>}/>
            <Route exact path="/Phone" element ={<PhoneNumber/>}/>
            <Route exact path="/Verification" element ={<Verification/>}/>
            <Route exact path="/ResetPassword" element={<ResetPassword/>} /> 
            <Route exact path="/ResetSuccessfully" element={<ResetSuccessfully/>} />
            <Route exact path="/successfulVerification" element={<SuccessfulVerification/>} />
            <Route path="/" element = {<PrivateRoute element={<Dashboard/>}/>}/> 
            <Route path="/patientProfile" element = {<PrivateRoute element={<PatientProfile/>}/>}/>
           
            </Routes>
        </Router>
        </>
    )
}
export default Routers; 