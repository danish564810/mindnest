import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../../../useAuth/useAuth';
import Header from '../../../Components/AccountHeader/Header';
import { forgotPassword } from '../../../../../Api';
import '../../../../Account_Screens/account_styles/Account.css'

const Email = () => {
    const { setUserPhoneOrEmail } = useAuth();
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserPhoneOrEmail(emailOrPhone);
        try {
            const response = await forgotPassword(emailOrPhone);
            navigate('/Verification');
            if (response && response.success) {
                setErrorMessage(null);
             } else {
                // Handle the case where the response is unsuccessful (e.g., show an error message)
                setErrorMessage(response.message || 'Failed to process request.');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Verification failed.');
          }

    }
    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='login-form-inner'>
                    <div className='log-main'>
                        <div className='log-inner'>
                            <div className="log-header varification-heading">
                                <h1>Forget Password</h1>
                            </div>
                            <div className="forgot-text">
                                <p>Enter your email address to continue</p>
                            </div>
                            <div className='forgot-pass'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group login-text'>
                                        <input
                                            className='form-control'
                                            type='text'
                                            autoComplete="off"
                                            placeholder='Email Address'
                                            onChange={(e) => setEmailOrPhone(e.target.value)}
                                        />
                                    </div>
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    <div className='submit-btn d-flex'>
                                        <button type='submit' className='btn-account fn-btn-submit'>Continue</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center d-flex flex-column resetPass">
                                <Link to="/Phone">Reset using cellphone number</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Email;