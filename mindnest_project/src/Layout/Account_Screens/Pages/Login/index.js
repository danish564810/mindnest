import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../useAuth/useAuth";
import { useLoading } from "../../../../context/LoadingContext";
import Cookies from "js-cookie";
import Header from "../../Components/AccountHeader/Header";
import vector from '../../../../assests/images/Vector-arrow.png';
import eyeopen from '../../../../assests/images/eye-open-pass.png';
import eyeclose from '../../../../assests/images/Eye-close.png';
import googleicon from '../../../../assests/images/google-icon.png';
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { checkUSer } from "../../../../Api"; // Import the checkUser function
import '../../account_styles/Account.css';

const Login = () => {
  const { login, updateFlowType } = useAuth();
  const navigate = useNavigate();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [pass, setPass] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [userChecked, setUserChecked] = useState(false); // Track if the user is checked

  const handleEmailPhoneChange = (e) => {
    const value = e.target.value;
    setEmailOrPhone(value);
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    if (!userChecked) {
      // 1. Check if the user exists when the login button is clicked for the first time
      try {
        const userExists = await checkUSer(emailOrPhone);
        
        if(userExists && userExists.accountConfirmation === true){
          Cookies.set("emailOrPhone", emailOrPhone, { expires: 1 });
          navigate('/verification')
        }else if(userExists && userExists.accountConfirmation === false){
          setError(null);
          setShowPasswordField(true);
          setUserChecked(true)
        }
        else{
          setError(userExists.message);
          setShowPasswordField(false);
          setUserChecked(false)
        }
      } catch (err) {
        setError("Invalid credentials");
      }
      stopLoading();
      return; 
    }

    // 2. If the user is checked, proceed with login API
    try {
      const loginResult = await login(emailOrPhone, password);

      if (!loginResult.success) {
        setError(loginResult.message);
      }
      
      else {
        navigate("/");
        setError(null);
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
    stopLoading(); // Stop loading spinner after login
  };

  const handleForgotPassword = () => {
    updateFlowType('passwordReset');
    navigate('/Email');
  };

  const handleSignUp = () => {
    updateFlowType('register');
    navigate('/Signup');
  };
  const handleCheckUser = ()=> {
    updateFlowType('checkUser');
  }

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
                  <h1 className="text-center login-headings">
                    Log in to <br />your <span className="account-txt">account</span>
                  </h1>
                  <div className="create-accoutn-new justify-content-center">
                    <div className="txt-account">
                      <h5 className="mb-0">Don't have an account? </h5>
                    </div>
                    <div className="sign-up-btn">
                      <button className="new-aacount-btn" onClick={handleSignUp}>
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
                <div className="vector-arrow ">
                  <img src={vector} alt="" />
                </div>
              </div>
              <form
                id="loginform"
                method="post"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="login-fields">
                  <div className="form-group login-text">
                    <div className="col-md-12">
                      <input
                        className="form-control user-email"
                        placeholder="Email or Phone Number"
                        autoComplete="off"
                        value={emailOrPhone}
                        onChange={handleEmailPhoneChange}
                      />
                    </div>
                  </div>

                  {showPasswordField && (
                    <div className="form-group login-pass fn_password">
                      <div className="passField">
                        <input
                          autoComplete="new-password"
                          className="form-control user-pass"
                          placeholder="Password"
                          type={pass ? 'password' : 'text'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="eye-icons">
                          <img src={pass ? eyeclose : eyeopen} onClick={() => setPass(!pass)} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="submit-btn d-flex">
                  <button
                    type="submit"
                    className="btn-account fn-btn-submit"
                    onClick={handleCheckUser}
                  >
                    Log In
                    <div className="icon-arrow-right3"></div>
                  </button>
                </div>
              </form>
              <div className="text-center d-flex flex-column align-items-center f-pass-btn">
                <button className="text-forgot btn btn-link" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              </div>
              <div className="c-horizontal_content_rule margin_top_150 margin_bottom_150">
                <hr className="c-horizontal_content_rule__leftrule" />
                <div className="c-horizontal_content_rule__content">or</div>
                <hr className="c-horizontal_content_rule__rightrule" />
              </div>
              <section id="socialLoginForm">
                <div id="socialLoginList">
                  <p>
                    <button
                      type="submit"
                      className="btn-anchar google-signin d-flex justify-content-around align-items-center"
                      name="provider"
                      value="Google"
                      title="Sign in using your Google account"
                    >
                      <img src={googleicon} alt="" />
                      <h5 className="mb-0 w-100 text-center">Sign In with Google</h5>
                    </button>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
