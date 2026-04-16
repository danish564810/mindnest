import React, {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({element})=> {
const {authToken} = useContext(AuthContext);
const location = useLocation();
return authToken ? element : <Navigate to="/Login" state={{from: location}} replace />
};
export default PrivateRoute;