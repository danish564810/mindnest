import { React, useState } from 'react';
import { useAuth } from '../../../../useAuth/useAuth';
import { useNavigate } from "react-router-dom";
import Header from '../../Components/AccountHeader/Header';
import eyeopen from '../../../../assests/images/eye-open-pass.png';
import eyeclose from '../../../../assests/images/Eye-close.png';
import { resetPassword } from '../../../../Api';

const ResetPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const { userId, code, updateFlowType  } = useAuth();
    const [pass, setPass] = useState({ passwordVisible: true, confirmPasswordVisible: true });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
   const validatePassword = (value) => {
   const currentErrors = {...errorMessage};
   if(!value){
    currentErrors.password = "password is required";
   }else if (!passwordRegex.test(value)){
    currentErrors.password = (
        '1. Minimum 6 characters <br />' +
                        '2. Should have at least one number <br />' +
                        '3. Should have at least one uppercase letter <br />' +
                        '4. Should have at least one lowercase letter <br />' +
                        '5. Should have at least one special character'
    );
   }else{
    delete currentErrors.password;
   }
   }

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple password validation
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        if (password === "") {
            setErrorMessage("Password cannot be empty");
            return;
        }
        try {
            // Call the API with the payload
            const response = await resetPassword(userId, code, password);
            updateFlowType ("register");
            navigate('/ResetSuccessfully', { state: { flowType: 'passwordReset' } });
        } catch (error) {
            setErrorMessage(error.message || "An error occurred. Please try again.");
        }
    };

    // Check if the form can be submitted (both passwords must match and not be empty)
    const isFormValid = password && confirmPassword && password === confirmPassword;

    return (
        <div>
            <Header />
            <div className="page-content">
                <div className="login-form-inner">
                    <div className='login-page'>
                        <div className="login-page-inner">
                            <div className="log-header varification-heading">
                                <h1 className="text-center">Reset Password</h1>
                            </div>
                            <div className="forgot-text">
                                <p>Confirm your password change</p>
                            </div>
                            <div className="change-pass">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group login-pass">
                                        <div className='passField'>
                                            <input
                                                type={pass.passwordVisible ? 'password' : 'text'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className='newPassword'
                                                placeholder='New Password'
                                            />
                                             <div className="eye-icons">
                                             <img
                                                    src={pass.passwordVisible ? eyeclose : eyeopen}
                                                    onClick={() =>
                                                        setPass(prev => ({ ...prev, passwordVisible: !prev.passwordVisible }))
                                                    }
                                                    alt="Toggle visibility"
                                                />
                                            </div>
                                        </div>
                                        {errorMessage.password && (
                                            <p className="error-message text-danger">{errorMessage.password}</p>
                                        )}
                                    </div>
                                    <div className="form-group login-pass">
                                        <div className='passField'>
                                            <input
                                               type={pass.confirmPasswordVisible ? 'password' : 'text'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className='confirmPassword'
                                                placeholder='Confirm Password'
                                            />
                                             <div className="eye-icons">
                                             <img
                                                    src={pass.confirmPasswordVisible ? eyeclose : eyeopen}
                                                    onClick={() =>
                                                        setPass(prev => ({ ...prev, confirmPasswordVisible: !prev.confirmPasswordVisible }))
                                                    }
                                                    alt="Toggle visibility"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    {successMessage && <p className="success">{successMessage}</p>}
                                    <div className="submit-btn d-flex">
                                        {/* Only enable the submit button if the form is valid */}
                                        <button type="submit" className="btn-account fn-btn-submit">
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
