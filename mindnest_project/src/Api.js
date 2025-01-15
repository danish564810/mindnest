import axios from "axios";

// Create an axios instance to manage base URL and headers
const api = axios.create({
    // baseURL: 'https://localhost:7031',
    headers: {
        'Content-Type': 'application/json',
    },
});
//login function
const loginApi = async (emailOrPhone, password) => {
    try {
        const response = await api.post('/api/Account/Login', {
            emailOrPhone,
            password
        });
        // Check for success in the response data
        if (response.data.success) {
            return response.data.data;  // Return token and user data
        } else {
            throw new Error(response.data.message || "Login failed");
        }
    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data.errors?.[0] || error.response.data.message || "Login failed"
            );
        } else {
            throw new Error("Network error or server unreachable");
        }
    }
};

//check user 
const checkUSer = async (emailOrPhone) => {
    try {
        const response  = await api.post('/api/Account/CheckUser', {
            emailOrPhone
        });
        if(response.data.success){
            return response.data.data;
        }
        throw new Error(response.data.message || "User not found");
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.errors?.[0]|| error.response.data.message || "User not found");
            
        }else{
            throw new Error("Network error or server unreachable");
        }
    }
}

//registration api

const registrationApi = async (phoneNumber,firstName,lastName,dob,gender,email, password, smsNotification) => {
   
    try {
        const response = await api.post('/api/Account/Register', {
            phoneNumber: phoneNumber,          // User's phone number
            password: password,             // User's password
            firstName: firstName,            // User's first name
            lastName: lastName,             // User's last name
            dob: dob,                  // User's date of birth (ensure it's formatted correctly, e.g., "YYYY-MM-DD")
            gender: gender,               // User's gender
            smsNotification: smsNotification,      // Consent for SMS notifications (true if consented)
            email: email,      // Consent for SMS notifications (true if consented)
 });
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Registration Failed");

        }
    }
    catch (error) {
        if(error.response){
            throw new Error(
                error.response.data.errors?.[0] || error.response.data.message || "Registration Failed"
            );
        }
        else{
           throw new Error("Network error or server unreachable");
        }
        

    }
}

//verification API
const verificationCodeApi = async(emailOrPhone) => {
 try {
    const response = await api.post('/api/Account/ForgotPassword', {
        emailOrPhone: emailOrPhone,
    });
    if(response.data.success){
        return response.data.data;
    }else{
        throw new Error(response.data.message || "Invalid Code");
    }
 } catch (error) {
    if(error.response){
        throw new Error(error.response.data.errors?.[0] || error.response.data.message || "Verification failed");
    }else{
        throw new Error("Network error or server unreachable");
    }
    
 }
}
//verify code api
const verifyCode = async (emailOrPhone, code , reason) => {
    try {
        const response = await api.post('/api/Account/VerifyCode', {
            emailOrPhone: emailOrPhone,
            code:code,
            reason: reason
        });
        if(response.data.success){
            return response.data.data;
        }else{
            throw new Error(response.data.message || "Invalid COde");
            
        }
    } catch (error) {
       if(error.response){
        throw new Error(error.response.data.errors?.[0] || error.response.data.message || "Invalid Code");
       }
       else{
        throw new Error("Network error or server unreachable");
        
       }
    }
}

//forgot password api
const forgotPassword = async(emailOrPhone) => {
    try {
        const response = await api.post('/api/Account/ForgotPassword',{
           emailOrPhone
        });
        if(response.data.success){
            return response.data.data;
        }else{
            throw new Error(response.data.message ||"Invalid Phone");
            
        }
    } catch (error) {
       if(error.response){
        throw new Error(error.response.data.errors?.[0] || error.response.data.message || "Invalid Email");
       }else{
        throw new Error("Network error or server unreachable");
        
       }
    }
}

//reset password
const resetPassword = async(userId, code ,password ) => {
    try {
        const response = await api.post('/api/Account/ResetPassword',{
            userId,
            code,
            password,
        });
        console.log("API Response:", response);
        if(response.data.success){
            return response.data.data;
        }else{
            throw new Error(response.data.message ||"Failed to reset password.");
            
        }
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.errors?.[0]);
        }else{
            throw new Error("Network error or server unreachable");
            
        }
        
    }
}

//wallness guide API
const getWellnessGuide = async(token)=> {
try {
    const response = await api.post('api/Patient/WellnessGuide',{}, {
        headers: {
            Authorization : `Bearer ${token}`,
        },
    });
    return response.data;
} catch (error) {
    throw error; 
}
}
//get all patient task
const getAllPatientTask = async(token)=> {
    try {
        const response = await api.post('/api/Patient/GetAllPatientTasks',{}, {
            headers: {
                Authorization : `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error; 
    }
    }
export { loginApi, registrationApi, verificationCodeApi,verifyCode,forgotPassword,resetPassword,checkUSer,getWellnessGuide,getAllPatientTask };
