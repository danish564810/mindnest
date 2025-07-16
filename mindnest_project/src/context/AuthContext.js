import React, { createContext, useState, useEffect } from "react";
import useIntakeStore from "../Store/intakeStore";
import Cookies from 'js-cookie';
import { loginApi } from "../Api";

// Create the AuthContext
export const AuthContext = createContext();

// Helper function for getting items from localStorage and parsing them
const getItemFromCookies = (key) => {
  try {
    const item = Cookies.get(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [user, setUser] = useState(getItemFromCookies("userData"));
  const [userId, setUserId] = useState(Cookies.get('userId') || null);
  const [code, setCode] = useState(Cookies.get('code') || null);
  const [emailOrPhone, setEmailOrPhone] = useState(Cookies.get('emailOrPhone') || null);
  const [flowType, setFlowType] = useState(Cookies.get('flowType') || null);
  const clearStore = useIntakeStore((s) => s.clearStore);
  // useEffect(() => {
  //   if (user?.id) {
  //     console.log("✅ Clearing intake store on user login");
  //     clearStore();
  //   }
  // }, [user?.id]);

  // Sync state with localStorage on state change
  useEffect(() => {
    if (authToken) {
      Cookies.set("authToken", authToken, { expires: 7, secure: true});
    }

    if (user) {
      Cookies.set("userData", JSON.stringify(user), { expires: 7, secure: true});
    }

    if (emailOrPhone) {
      Cookies.set("emailOrPhone", emailOrPhone,{ expires: 7, secure: true});
    }

    if (userId) {
      Cookies.set("userId", userId , { expires: 7, secure: true});
    }

    if (code) {
      Cookies.set("code", code , { expires: 7, secure: true});
    }

    if (flowType) {
      Cookies.set("flowType", flowType, { expires: 7, secure: true}); // Sync flowType to localStorage
    }
  }, [authToken, user, emailOrPhone, userId, code, flowType]);

  // Function to handle login
  const onLogin = (token, user) => {
    setAuthToken(token);
    setUser(user);
  };
 
  const updateFlowType  = (type) => {
    setFlowType(type);
  };
  const resetAuthFlow = () => {
    setFlowType(null);  
  };
  // Function to handle logout
  const onLogout = () => {
    setAuthToken(null);
    setUser(null);
    setEmailOrPhone(null);
    setUserId(null);
    setCode(null);
    setFlowType(null);
    //remove cookies when logout 
    Cookies.remove("authToken");
    Cookies.remove("userData");
    Cookies.remove("emailOrPhone");
    Cookies.remove("userId");
    Cookies.remove("code");
    Cookies.remove("flowType");
  };

  // Function to update the user's phone or email
  const setUserPhoneOrEmail = (value) => {
    setEmailOrPhone(value);
  };

  // Function to set verification data (userId and code)
  const setVerificationData = (userId, code) => {
    setEmailOrPhone(emailOrPhone);
    setUserId(userId);
    setCode(code);
    Cookies.set("userId", userId, { expires: 7, secure: true});
    Cookies.set("code", code, { expires: 7, secure: true});
    Cookies.set("emailOrPhone", emailOrPhone,{expires: 7, secure: true})
  };

  // Function to handle login API request and update context
  const login = async (emailOrPhone, password) => {
    try {
      const data = await loginApi(emailOrPhone, password);
      const { token, ...userData } = data;
      onLogin(token, userData);
      return { success: true };
    } catch (error) {
      console.error("Full Error Object:", error);
      const errorMessage = error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        error.message;
      return { success: false, message: errorMessage };
    }
  };

  return (
    <AuthContext.Provider value={{
      authToken,
      user,
      emailOrPhone,
      userId,
      code,
      flowType,
      onLogin,
      onLogout,
      login,
      setUserPhoneOrEmail,
      setVerificationData,
      resetAuthFlow,
      updateFlowType ,
    }}>
      {children}
    </AuthContext.Provider>
  );
};