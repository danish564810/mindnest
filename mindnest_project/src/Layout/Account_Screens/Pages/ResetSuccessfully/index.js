import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Components/AccountHeader/Header'

function ResetSuccessfully() {
    return (
        <div>
           <Header/>
            <div className='page-content'>
                <div className='login-form-inner'>
                    <div className='log-main'>
                        <div className='log-inner'>
                            <div className="log-header varification-heading">
                                <h1>Reset Password</h1>
                            </div>
                            <div className="confirmation-text text-center">
                                <p>Congratulations! You have successfully changed your account password.</p>
                            </div>
                            <div className='submit-btn d-flex'>
                                        <Link type='submit' 
                                        to="/Login"
                                        className='btn-account fn-btn-submit text-center align-items-center d-flex justify-content-center text-decoration-none'
                                        >Return to Login</Link>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ResetSuccessfully