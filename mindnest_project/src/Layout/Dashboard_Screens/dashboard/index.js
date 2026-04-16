import React from "react";
import '../dashboard/dashboard_style/dashboard.css'
import Sidebar from "../Components/Sidebar/sidebar";
import Header from "../Components/dashboard_header/header";
import { Outlet } from "react-router-dom";

const Dashboard = () =>{
    return(
        <>
         <Header/>
        <div className="main">
           <Sidebar/>
         <div className="side-content">
            <Outlet/>
        </div>
        </div>
        
        </>
    )
}
export default Dashboard;