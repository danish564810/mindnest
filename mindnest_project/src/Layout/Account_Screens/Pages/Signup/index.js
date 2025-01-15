import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../context/LoadingContext";
import MaskedInput from "react-text-mask";
import { useAuth } from "../../../../useAuth/useAuth";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { format } from "date-fns";
import Header from "../../Components/AccountHeader/Header";
import vector from '../../../../assests/images/Vector-arrow.png';
import eyeopen from '../../../../assests/images/eye-open-pass.png';
import eyeclose from '../../../../assests/images/Eye-close.png';
import googleicon from '../../../../assests/images/google-icon.png';
import DateTimePicker from "../../../../Plugins/DateTimePicker/DateTimePicker";
import CustomSelect from "../../../../Plugins/Select2/CustomSelect";
import { toast } from 'react-toastify'; 
import { registrationApi } from "../../../../Api";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import '../../account_styles/Account.css'


const Signup = () => {
    const navigate = useNavigate();
    const { onLogin, updateFlowType, setUserPhoneOrEmail } = useAuth();
    const { startLoading, stopLoading, isLoading } = useLoading(); 
    //validation for the fields
    const [pass, setPass] = useState(true);
    const [emailPhone, setEmailPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(null);
    const [consent, setConsent] = useState(true);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [touchedFields, setTouchedFields] = useState({ email: false, password: false, });

    //seclect 2 options
    const genderOption = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ]

    //get today date set as max date
    const today = new Date();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    // Handle phone number input changes
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setEmailPhone(value);
        setIsPhoneValid(value.length === 10);
    };

    // Handle when the input loses focus
    const handlePhoneBlur = () => {
        if (!isPhoneValid) {
            setEmailPhone(''); // Clear the phone number if it's not valid (less than 10 digits)
        }
    };

    const validateField = (fieldName, value) => {
        const currentErrors = { ...errors }; // Keep previous errors

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                if (!value || !/^[a-zA-Z]+$/.test(value)) {
                    currentErrors[fieldName] = `${fieldName === 'firstName' ? 'First' : 'Last'} name is invalid;`
                } else {
                    delete currentErrors[fieldName]; // Clear the error if valid
                }
                if (fieldName === 'firstName') setFirstName(capitalizedValue);
                if (fieldName === 'lastName') setLastName(capitalizedValue);
                break;

            case 'dob':
                if (!value) {
                    currentErrors.dob = 'Date of birth is required.';
                } else {
                    const today = new Date();
                    const age = today.getFullYear() - value.getFullYear();
                    const isOldEnough = age > 5 || (age === 5 && today >= new Date(value.getFullYear() + 5, value.getMonth(), value.getDate()));
                    if (!isOldEnough) {
                        currentErrors.dob = 'Age must be at least 5 years old.';
                    } else {
                        delete currentErrors.dob; // Clear the error if valid
                    }
                }
                break;

            case 'gender':
                if (!value) {
                    currentErrors.gender = 'Gender is required'
                }
                else {
                    delete currentErrors.gender;
                }
                break;
            case 'email':
                if (!value) {
                    currentErrors.email = 'email is required';
                }
                else if (!emailRegex.test(value)) {
                    currentErrors.email = 'Please enter a valid email'
                }
                else {
                    delete currentErrors.email;
                }
                break;
            case 'password':
                if (!value) {
                    currentErrors.password = 'Password is required';
                } else if (!passwordRegex.test(value)) {
                    currentErrors.password = (
                        '1. Minimum 6 characters <br />' +
                        '2. Should have at least one number <br />' +
                        '3. Should have at least one uppercase letter <br />' +
                        '4. Should have at least one lowercase letter <br />' +
                        '5. Should have at least one special character'
                    );
                } else {
                    delete currentErrors.password;
                }
                break;
            default:
                break;
        }

        setErrors(currentErrors);
    };

    const handleInputChange = (field, value) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
        if (field === 'email') setEmail(value);
        if (field === 'password') setPassword(value);
        validateField(field, value);
    };
    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
    };

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();
        setIsSubmitted(true);
        setErrors({});
        let currentErrors = {};

        //validation
        if (!emailPhone) currentErrors.emailPhone = 'Eamil or Phone is required';
        if (!firstName) currentErrors.firstName = 'First name is required';
        if (!lastName) currentErrors.lastName = 'Last name is required';
        if (!password || password.trim() === '') {
            currentErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) currentErrors.password = '1. Minimum 6 characters\n' +
            '2. Should have at least one number\n' +
            '3. Should have at least one uppercase letter\n' +
            '4. Should have at least one lowercase letter\n' +
            '5. Should have at least one special character (@$!%*?&)';
        if (!gender) currentErrors.gender = 'Gender is required';
        if (!dob) currentErrors.dob = 'Date of birth is required';
        if (!consent) currentErrors.consent = "You must consent to receive SMS messages"

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
        }
        else {
            const phoneClean = emailPhone.replace(/\D/g, '');
            const phoneEmail = phoneClean;
            setUserPhoneOrEmail(phoneEmail)
            const formattedDob = dob ? format(dob, 'MM/dd/yyyy') : '';
            const userData = {

                phoneEmail: phoneEmail,
                password: password,
                smsNotification: consent,
                firstName,
                lastName,
                dob: formattedDob,
                gender: gender ? gender.value : '',
                email,
            };
           try {
                const response = await registrationApi(
                    userData.phoneEmail,
                    userData.firstName,
                    userData.lastName,
                    userData.dob,
                    userData.gender,
                    userData.email,
                    userData.password,
                    userData.smsNotification,
                );
                const { token } = response;
                console.log(token, userData);
                Cookies.set('authToken', userData);
                Cookies.set('userData', userData);
                onLogin(token, userData);
                updateFlowType("register");
                navigate('/Verification', { state: { flowType: 'registration' } });

            } catch (error) {
                setErrors({ apiError: error.message });
                toast.error(error.message || "Registration failed");
            }
            stopLoading();

        }
    }

    //check forn field is valid to enable or disable submit button 
    const isFormValid = firstName && lastName && email && emailPhone && password && gender && dob && consent

    return (
        <>
            <Header />
            {isLoading && <LoadingSpinner />}
            <div className="page-content">
                <div className="login-form-inner">
                    <div className="login-page">
                        <div className="login-page-inner">
                            <div className="vector-signin d-flex justify-content-center">
                                <div className="account-sign">
                                    <h1 className="text-center login-headings">Create <span className="account-txt">account</span></h1>
                                    <div className="create-accoutn-new justify-content-center">
                                        <div className="txt-account">
                                            <h5 className="mb-0">Already have an account? </h5>
                                        </div>
                                        <div className="sign-up-btn">
                                            <Link className="new-aacount-btn" to="/Login"> Sign in</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="vector-arrow ">
                                    <img src={vector} alt="" />
                                </div>
                            </div>
                            <form id="loginform" method="post" autoComplete="off" onSubmit={handleSubmit}>
                                <div className="login-fields">
                                    <div className="form-group login-text">
                                        <div className="col-md-12">
                                            <MaskedInput
                                                className="form-control user-email"
                                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                placeholder="Phone Number"
                                                type="text"
                                                autoComplete="off"
                                                value={emailPhone}
                                                onChange={handlePhoneChange}
                                                onBlur={handlePhoneBlur}
                                            />

                                            {errors.emailPhone && <p className="error-message text-danger" >{errors.emailPhone}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group fl-name d-flex ">
                                        <div className="col-md-6 f-na f-fields">
                                            <input autoComplete="off"
                                                className="cap-first-letter f-name"
                                                id="SignUpFirstName"
                                                placeholder="First Name"
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFirstName(value);
                                                    validateField('firstName', value); // Validate real-time
                                                }}
                                            />
                                            {errors.firstName && <p className="error-message text-danger" >{errors.firstName}</p>}
                                        </div>
                                        <div className="col-md-6 l-na f-fields">
                                            <input autoComplete="off"
                                                className="cap-first-letter l-name"
                                                id="SignUpLastName"
                                                placeholder="Last Name"
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setLastName(value);
                                                    validateField('lastName', value); // Validate real-time
                                                }}
                                            />
                                            {errors.lastName && <p className="error-message text-danger" >{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div className="dob-gender fl-name d-flex">
                                        <div className="col-md-6 f-na f-fields">
                                            <div className="user-dob">
                                                <DateTimePicker
                                                    selected={dob}
                                                    onChange={(date) => {
                                                        setDob(date);
                                                        validateField('dob', date); // Validate real-time
                                                    }}
                                                    minDate={new Date('1900-01-01')}
                                                    maxDate={today}
                                                    layout="account"

                                                />
                                                {errors.dob && <p className="error-message text-danger">{errors.dob}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 f-na f-fields">
                                            <div className="gender">
                                                <CustomSelect
                                                    options={genderOption}
                                                    placeholder="Select Gender"
                                                    onChange={(e) => setGender(e)}
                                                    value={gender}
                                                    layout="account"
                                                    style={{ height: '60px' }}
                                                />
                                            </div>
                                            {errors.gender && <p className="error-message text-danger">{errors.gender}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group lg_email">
                                        <input className="user-email"
                                            id="SignUpEmail"
                                            placeholder="E-mail"
                                            type="text" autoComplete="off"
                                            value={email}
                                            onBlur={() => handleBlur('email')}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                    </div>
                                    {errors.email && <p className="text-danger" >{errors.email}</p>}
                                    <div className="form-group login-pass fn_password">
                                        <div className="passField">
                                            <input autoComplete="new-password"
                                                className="form-control user-pass"
                                                placeholder="Password"
                                                type={pass ? 'password' : 'text'}
                                                value={password}
                                                onBlur={() => setTouchedFields({ ...touchedFields, password: true })}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                            />
                                            <div className="eye-icons">
                                                <img src={pass ? eyeclose : eyeopen} onClick={() => setPass(!pass)} />
                                            </div>
                                        </div>
                                        {touchedFields.password && errors.password && (
                                            <div className="error-message text-danger" dangerouslySetInnerHTML={{ __html: errors.password }}  />
                                        )}
                                    </div>
                                </div>

                                <div className="submit-btn d-flex">
                                    <button type="submit"
                                        id="submitForm"
                                        className="btn-account fn-btn-submit"
                                        disabled={!isFormValid}
                                    >
                                        Sign up
                                        <div className="icon-arrow-right3"></div>
                                    </button>

                                </div>
                            </form>
                            <div className="check-ic">
                                <span htmlFor="SignUpSmsNotification" className="d-flex align-items-center">
                                    <div className="check-box-main">
                                        <input type="checkbox"
                                            className="form-check-input"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                        />
                                    </div>
                                    <p>I consent to receive SMS messages regarding my treatment plan, as well as updates regarding Mindnest’s products and services (message and data rates may apply)</p>
                                </span>
                                <span className="text-danger field-validation-valid" data-valmsg-for="Input.PatientSignUp.SmsNotification" data-valmsg-replace="true"></span>
                            </div>
                            <div className="c-horizontal_content_rule margin_top_150 margin_bottom_150">
                                <hr className="c-horizontal_content_rule__leftrule" />
                                <div className="c-horizontal_content_rule__content">or</div>
                                <hr className="c-horizontal_content_rule__rightrule" />
                            </div>
                            <section id="socialLoginForm">


                                <div id="socialLoginList">
                                    <p>
                                        <button type="submit" className="btn-anchar google-signin d-flex justify-content-around align-items-center" name="provider" value="Google" title="Sign in using your Google account">
                                            <img src={googleicon} alt="" />
                                            <h5 className="mb-0 w-100 text-center">Sign In with Google</h5>
                                        </button>
                                        
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div >
            
        </>


    )
}
export default Signup;