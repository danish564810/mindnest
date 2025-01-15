import React from "react";
import '../dashboard/dashboard_style/dashboard.css'
import Sidebar from "../Components/Sidebar/sidebar";
import Header from "../Components/dashboard_header/header";
import Home from "../Pages/Home/home";

const Dashboard = () =>{
    return(
        <>
         <Header/>
        <div className="main">
           <Sidebar/>
         <div className="side-content">
            <Home/>
        </div>
        </div>
        
        </>
    )
}
export default Dashboard;