import React from "react";
import Routers from "../Routes/Routes";
import ToastProvider from "../../Plugins/Toastr/toastProvider";

const AccountLayout = () => {
    
    return (
        <>
            <ToastProvider /> {/* Ensure this is added to the component tree */}
            <Routers />
        </>
    );
    
}
export default AccountLayout;