import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Account Pages
import Login from "../Account_Screens/Pages/Login";
import Signup from "../Account_Screens/Pages/Signup";
import Verification from "../Account_Screens/Pages/Verification";
import PhoneNumber from "../Account_Screens/Pages/ForgotPassword/Phone";
import Email from "../Account_Screens/Pages/ForgotPassword/Email";
import ResetPassword from "../Account_Screens/Pages/ResetPassword";
import ResetSuccessfully from "../Account_Screens/Pages/ResetSuccessfully";
import SuccessfulVerification from "../Account_Screens/Pages/VerificatoinScreen";

// Dashboard Layout + Pages
import Home from "../Dashboard_Screens/Pages/Home/Home";
import Dashboard from "../Dashboard_Screens/dashboard";
import PatientProfile from "../Dashboard_Screens/Pages/patient-profile/PatientProfile";
import Chat from "../Dashboard_Screens/Pages/Chat/Chat";
import MedicalSummary from "../Dashboard_Screens/Pages/Medical-Summary/MedicalSummary";
import FindProviderList from "../Dashboard_Screens/Pages/Find-Provider/FindProviderList";

// Auth
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Routers = () => {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email" element={<Email />} />
        <Route path="/phone" element={<PhoneNumber />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetsuccessfully" element={<ResetSuccessfully />} />
        <Route path="/successfulverification" element={<SuccessfulVerification />} />

        {/* ================= PROTECTED ROUTES ================= */}
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />}>
        <Route index element={<Home />} />

          {/* Dashboard Pages */}
          <Route path="chat" element={<Chat />} />
          <Route path="findproviderlist" element={<FindProviderList />} />
          <Route path="patientProfile" element={<PatientProfile />} />
          <Route path="medicalsummary" element={<MedicalSummary />} />
          <Route path="findproviderlist" element={<FindProviderList />} />

        </Route>

      </Routes>
    </Router>
  );
};

export default Routers;