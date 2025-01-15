import React, { useState } from 'react';
import { useAuth } from '../../../../../useAuth/useAuth';
import { useLoading } from '../../../../../context/LoadingContext';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { useNavigate, Link } from "react-router-dom";
import Header from '../../../Components/AccountHeader/Header';
import MaskedInput from "react-text-mask";
import { forgotPassword } from '../../../../../Api';
import '../../../../Account_Screens/account_styles/Account.css'

const PhoneNumber = () => {
    const navigate = useNavigate();
    const { setUserPhoneOrEmail } = useAuth();
    const {startLoading, stopLoading, isLoading} = useLoading();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const phoneClean = emailOrPhone.replace(/\D/g, '');
        setUserPhoneOrEmail(phoneClean);
        try {

            const response = await forgotPassword(phoneClean);
            navigate('/Verification');
            if (response && response.success) {
             setErrorMessage(null);
            } else {
                // Handle the case where the response is unsuccessful (e.g., show an error message)
                setErrorMessage(response.message || 'Failed to process request.');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Email-failed');
        }

    }
  
    return (
        <>
            <Header />
            {isLoading && <LoadingSpinner />}
            <div className='page-content'>
                <div className='login-form-inner'>
                    <div className='log-main'>
                        <div className='log-inner'>
                            <div className="log-header varification-heading">
                                <h1>Forget Password</h1>
                            </div>
                            <div className="forgot-text">
                                <p>Enter your phone number to continue</p>
                            </div>
                            <div className='forgot-pass'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group login-text'>
                                        <MaskedInput
                                            className='form-control'
                                            type='text'
                                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            autoComplete="off"
                                            placeholder='Phone Number'
                                            onChange={(e) => setEmailOrPhone(e.target.value)}
                                        />
                                    </div>
                                    {errorMessage && <p className='error-message text-denger' style={{ color: 'red' }} >{errorMessage}</p>}
                                    <div className='submit-btn d-flex'>
                                        <button type='submit' 
                                        className='btn-account fn-btn-submit'
                                       >Continue</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center d-flex flex-column resetPass">
                                <Link to="/Email">Reset through email address </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PhoneNumber;