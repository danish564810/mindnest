import axios from "axios";
import Cookies from 'js-cookie';

// Create an axios instance to manage base URL and headers
const api = axios.create({
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
        const response = await api.post('/api/Account/CheckUser', {
            emailOrPhone
        });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || "User not found");
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.errors?.[0] || error.response.data.message || "User not found");

        } else {
            throw new Error("Network error or server unreachable");
        }
    }
}

//registration api

const registrationApi = async (phoneNumber, firstName, lastName, dob, gender, email, password, smsNotification) => {

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
        if (error.response) {
            throw new Error(
                error.response.data.errors?.[0] || error.response.data.message || "Registration Failed"
            );
        }
        else {
            throw new Error("Network error or server unreachable");
        }


    }
}

//verification API
const verificationCodeApi = async (emailOrPhone) => {
    try {
        const response = await api.post('/api/Account/ForgotPassword', {
            emailOrPhone: emailOrPhone,
        });
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Invalid Code");
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.errors?.[0] || error.response.data.message || "Verification failed");
        } else {
            throw new Error("Network error or server unreachable");
        }

    }
}
//verify code api
const verifyCode = async (emailOrPhone, code, reason) => {
    try {
        const response = await api.post('/api/Account/VerifyCode', {
            emailOrPhone: emailOrPhone,
            code: code,
            reason: reason
        });
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Invalid COde");

        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.errors?.[0] || error.response.data.message || "Invalid Code");
        }
        else {
            throw new Error("Network error or server unreachable");

        }
    }
}

//forgot password api
const forgotPassword = async (emailOrPhone) => {
    try {
        const response = await api.post('/api/Account/ForgotPassword', {
            emailOrPhone
        });
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Invalid Phone");

        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.errors?.[0] || error.response.data.message || "Invalid Email");
        } else {
            throw new Error("Network error or server unreachable");

        }
    }
}

//reset password
const resetPassword = async (userId, code, password) => {
    try {
        const response = await api.post('/api/Account/ResetPassword', {
            userId,
            code,
            password,
        });
        console.log("API Response:", response);
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to reset password.");

        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.errors?.[0]);
        } else {
            throw new Error("Network error or server unreachable");

        }

    }
}

//wallness guide API
const getWellnessGuide = async (token) => {
    try {
        const response = await api.post('api/Patient/WellnessGuide', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
//get all patient task
const getAllPatientTask = async (token) => {
    try {
        const response = await api.post('/api/Patient/GetAllPatientTasks', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//care manager details
const getCareManagerDetails = async (token) => {
    try {
        const response = await api.post('/api/Patient/GetCareManagerDetails', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        throw error;
    }
}
//patient appointment
const getPatientAppointment = async (token) => {
    try {
        const response = await api.post('/api/Patient/PatientAppointments', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        throw error;
    }
}

// intake API
//Patient Status
const intakePatientStatusApi = async (isNew) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error("Auth token is missing");

  try {
    const response = await api.post(`/api/Intake/IntakePatientStatus?PatientStatus=${isNew}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


//intake independent Api
const intakeIndependentPatientApi = async (formData) => {
  const token = Cookies.get("authToken");
  if (!token) return { success: false, message: "Token missing" };

  try {
    const response = await api.post("/api/Intake/IntakeIndependentPatient", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Raw response from API:", response);

    return {
      success: response.data?.success || false,
      message: response.data?.message || "Unknown response",
      data: response.data?.data || [],
      errors: response.data?.errors || [], // ✅ ADD THIS LINE
    };
  } catch (error) {
    console.error("API request error:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "API call failed",
      errors: error?.response?.data?.errors || [], // ✅ ADD THIS TOO
      error,
    };
  }
};


//Dependent API
const intakDependentPatientApi = async (formData) => {
  const token = Cookies.get("authToken");
  if (!token) return { success: false, message: "Token missing" };

  try {
    const response = await api.post("/api/Intake/IntakeDependentPatient", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message || "Unknown response",
      data: response.data?.data || [],
      errors: response.data?.errors || [], // ✅ Include errors if present
    };
  } catch (error) {
    console.error("API request error:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "API call failed",
      errors: error?.response?.data?.errors || [], // ✅ Get errors here too
    };
  }
};


//divorce api 


export const uploadDivorceApi = async (base64Data) => {
  console.log("Payload to upload:", { data: base64Data }); // should log { data: "data:image/png;base64,..." }
  const token = Cookies.get("authToken");

  try {
    const response = await api.post(
      "/api/Intake/IntakeDivorceCertificate",
      { data: base64Data }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Upload failed",
      errors: error?.response?.data?.errors || [],
    };
  }
};


// Driving License Api
const uploadDrivingLicenseApi = async (formData) => {
  const token = Cookies.get("authToken");
  if (!token) {
    return { success: false, message: "Token missing" };
  }

  try {
    const response = await api.post("/api/Intake/IntakeDrivingImages", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Raw response from API:", response);

    return {
      success: response.data?.success || false,
      message: response.data?.message || "Unknown response",
      data: response.data?.data || null,
    };
  } catch (error) {
    console.error("API request error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "API call failed",
      error,
    };
  }
};

// Driving License skip api
 const skipDrivingLicenseApi = async () => {
     const token = Cookies.get("authToken");
  try {
    const response = await fetch("/api/Intake/IntakeSkipDrivingImages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      credentials: "include", // Important to send cookies
      body: JSON.stringify({ Skip: "Skip" }), // Assuming API expects this
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to skip");
    }

    return await response.json();
  } catch (error) {
    console.error("Skip API Error:", error.message);
    return { success: false, message: error.message };
  }
};
//intake medication prescribe

const intakeMedicationPrecscribeApi = async (isAccept) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error("Auth token is missing");

  try {
    const response = await api.post(`/api/Intake/IntakeMedicationPrescribe?MedicationPrescribe=${isAccept}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// fetch Pharmacies

export const fetchPharmacies = async ({ q = "", city = "", zipCode = "", page = 1 }) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token missing");

  const response = await api.post(
    "/api/DropDown/GetPharmacies",
    {}, // empty POST body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q,
        city,
        zipCode,
        page,
      },
    }
  );

  const data = response?.data?.data;

  return {
    results: data?.results || [],
    hasMore: data?.pagination?.more || false,
  };
};



//submit select pharmacy 
export const submitSelectedPharmacy = async ({ taskId, name, address, IsNotApplicable = false }) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token missing");

  const url = IsNotApplicable
    ? "/api/Intake/IntakePatientPharmacy?param=not_applicable"
    : "/api/Intake/IntakePatientPharmacy";

  const body = IsNotApplicable
    ? {} // Send empty JSON body instead of undefined
    : {
        taskId: Number(taskId),
        name,
        address,
      };

  return api.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // ⬅️ Important fix
    },
  });
};


//fetch medication
export const fetchMedications = async (q = "", page = 1) => {
  const token = Cookies.get("authToken");

  const response = await api.post(
    `/api/DropDown/GetMedications?q=${q}&page=${page}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const results = response?.data?.data?.results || [];

  return results.map((item) => ({
    label: item.text, // show name in dropdown
    value: item.text, // used in selection
  }));
};

// current medication
export const submitCurrentMedications = async (medications, IsNotApplicable) => {
  const token = Cookies.get("authToken");
var data = [];
if(IsNotApplicable){
  data.push('not_applicable');
}else{
  data= medications;
}
  await api.post("/api/Intake/IntakeCurrentMedication", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};











//intake allergies
export const intakeAllergyApi = async (allergies, IsNotApplicable) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('Auth token is missing');

  let data = '';

  if (!IsNotApplicable) {
    data = allergies.join(',');
  } else {
    data = 'not_applicable';
  }

  try {
    const response = await api.post(
      `/api/Intake/IntakePatientAllergies?allergy=${data}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};


//social history
// social history
export const submitSocialHistory = async ({ socialHistory }) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.post(
      "/api/Intake/IntakePatientSocialHistory",
      { socialHistory },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // ✅ RETURN the result
  } catch (error) {
    console.error("Social history submission failed:", error);
    return { success: false, errors: ["Something went wrong."] }; // ✅ fallback for error
  }
};



//Family history

export const submitFamilyHistory = async (familyHistory) => {
  try {
    const token = Cookies.get("authToken");
    const response = await fetch("/api/Intake/IntakePatientFamilyHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(familyHistory),
    });

    if (!response.ok) {
      throw new Error("Failed to submit family history");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

//patient hospitalization
export const intakeHospitalizationApi = async (hospitalizationArray) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  try {
    const response = await api.post(
      "/api/Intake/IntakePatientHospitalizationHistory",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          Patienthospitalization: hospitalizationArray.join(","),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// smoking and alcohal

export const submitAlcoholSmoking = async ({ alcohol, smoking }) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Missing auth token");

  try {
    const response = await api.post(
      "/api/Intake/IntakePatienAlcoholSmoking",
      { alcohol, smoking },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Intake Patient Legal Matter Status

export const PatientLegalMatterStatus = async (isLegalMatter) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  try {
    const response = await api.post(
       `/api/Intake/IntakePatienLegal?legalMatter=${isLegalMatter}`,
      {}, // empty body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//legal matter discription

export const PatientLegalMatterDiscription = async (legalMatterText) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  try {
    console.log("Sending legal matter:", legalMatterText);

    const encodedText = encodeURIComponent(legalMatterText);

    const response = await api.post(
     `/api/Intake/IntakePatienLegalmatter?Legalmatter=${encodedText}`,
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

//deseases API
export const submitMedicalConditions = async (conditions) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  const body = {
    seizures: conditions.SeizuresDisease,
    longQTSyndrome: conditions.Lqt,
    liverDisease: conditions.LD,
    kidneyDisease: conditions.KD,
  };

  const response = await api.post(
    "/api/Intake/IntakeDiseases",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

 //schizophrenia Psychosis Detected

export const submitSchizophreniaStatus = async (status) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  const response = await api.post(
    "/api/Intake/IntakeSchizophreniaPsychosisDetected",
    {}, // empty body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        SchizophreniaPsychosisDetected: status,
      },
    }
  );

  return response.data;
};

// suicide attempt
export const submitSuicideAttemt = async (status) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  const response = await api.post(
    "/api/Intake/IntakeSuicideAttempt",
    {}, // empty body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        suicideAttempt: status,
      },
    }
  );

  return response.data;
};

//Intake Services 
export const submitServices = async (conditions) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  const body = {
    Anxiety: conditions.Anxiety,
    Depression: conditions.Depression,
    Insomnia: conditions.Insomnia,
    Bipolar: conditions.Bipolar,
    Psychosis: conditions.Psychosis,
    Schizophrenia: conditions.Schizophrenia,
  };

  const response = await api.post(
    "/api/Intake/IntakeServices",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Hear about us 
export const submitHearAboutUs = async (hearAboutUsAnswers, otherAboutUsText) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  const body = {
    searchOnInternet: hearAboutUsAnswers.Internet || false,
    googleAds: hearAboutUsAnswers.Google || false,
    yelpPage: hearAboutUsAnswers.Yelp || false,
    facebook: hearAboutUsAnswers.Facebook || false,
    familymemberorfriend: hearAboutUsAnswers.Family || false,
    other: hearAboutUsAnswers.Other || false,
    otherAboutUs: otherAboutUsText || "", // text field only if "Other" is checked
  };

  const response = await api.post("/api/Intake/IntakeHearAboutUs", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};  
//consents
export const submitConsents = async (consents) => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Auth token is missing");

  const response = await api.post(
    "/api/Intake/IntakeConsents",
    consents,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

//fetch intake task view 
export const fetchIntakeTaskView = async () => {
  const token = Cookies.get("authToken");
  console.log("Token:", token); // <-- log it

  if (!token) throw new Error("Auth token is missing");

  try {
    const response = await api.post(
      "/api/Intake/IntakeTaskView",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response received:", response);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};



export {
    loginApi,
    registrationApi,
    verificationCodeApi,
    verifyCode, forgotPassword,
    resetPassword,
    checkUSer,
    getWellnessGuide,
    getAllPatientTask,
    getCareManagerDetails,
    getPatientAppointment,
    intakePatientStatusApi,
    intakeIndependentPatientApi,
    intakDependentPatientApi,
    uploadDrivingLicenseApi,
    skipDrivingLicenseApi,
    intakeMedicationPrecscribeApi,
};
