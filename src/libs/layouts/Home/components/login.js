import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { loginAction, getUserDetails } from "../actions";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { config } from "../../../../config";

import ForgotPassword from "./forgotPassword";
import VerifyNumber from "./verifyNumber";
import "../../../../css/modal.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState("");
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && email !== "" && pwd && pwd !== "") {
      let obj = {
        username: email.trim(),
        password: pwd.trim(),
      };
      handleLoginAction(obj);
    } else {
      alert("Please Enter Email and Password");
    }
  };

  const handleLoginAction = (obj) => {
    loginAction(obj)
      .then((res) => {
        // console.log("res === ", res);
        if (res.status) {
          getProfileData();
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log("err === ", err);
        alert(err.result.message);
        // alert("Internal Server Error, Please Try Again");
      });
  };

  const getProfileData = () => {
    props
      .getUserDetails()
      .then((response) => {
        console.log(response);
        localStorage.setItem("userRole", response.role);
        history.push("/admin/dashboard");
      })
      .catch((error) => {
        console.log("error in getuserdetails === ", error);
        alert("Please Try Again");
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
    if (response && response.profileObj && response.profileObj.googleId) {
      // success
      let obj = {
        username: response.profileObj.email,
        googleid: response.profileObj.googleId,
      };
      handleLoginAction(obj);
    } else {
      // error
      console.log("error ==== ", response.error);
      alert("Please Try Again");
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
    if (response && response.id) {
      let obj = {
        username: response.email,
        fbid: response.id,
      };
      handleLoginAction(obj);
    } else {
      alert("Please Try Again");
    }
  };

  const errorResponse = (err) => {

  }

  const componentClicked = () => { };

  const showLogin = (status) => {
    setShow(status);
  };

  return (
    <Modal show={true} onHide={props.close}>
      <Modal.Body>
        <p className="close-modal" data-dismiss="modal" onClick={props.close}>
          x
        </p>
        <div className="modal-body white-popupp">
          <div className="flexible login-wrap">
            <div className="image-part">
              <img src="/images/login_bg.jpg" alt="Background Logo" />
              <img className="login-logo" src="/images/logo.png" alt="Logo" />
            </div>
            {show === "FORGOT" ? (
              <ForgotPassword showLogin={showLogin} />
            ) : show === "VERIFY" ? (
              <VerifyNumber
                showLogin={showLogin}
                successCallback={getProfileData}
              />
            ) : (
                  <div className="content-part default">
                    <h3>Good Evening!</h3>
                    <h3 className="mb-28">Welcome Back</h3>
                    <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                      />
                      <label htmlFor="input" className="control-label">
                        Enter Email/Mobile number
                      </label>
                      <i className="bar"></i>
                      <img
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          width: "13px",
                        }}
                        src="/images/icons/user.png"
                        alt="icon"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required={true}
                      />
                      <label htmlFor="input" className="control-label">
                        Please enter your password
                  </label>
                      <i className="bar"></i>
                      <img
                        style={{
                          position: "absolute",
                          top: "6px",
                          left: "5px",
                          width: "15px",
                        }}
                        src="/images/icons/password.png"
                        alt="icon"
                      />
                    </div>

                    <p className="pull-right">
                      <a
                        onClick={() => showLogin("FORGOT")}
                        className="show-cursor"
                      >
                        Forgot Password ?
                  </a>
                    </p>
                    <div className="clearfix"></div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* className="btn btn-primary btn-lg btn-block" */}
                        <Button size="lg" type="submit" block>
                          Login
                    </Button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn otpbtn btn-lg btn-block"
                          onClick={() => showLogin("VERIFY")}
                        >
                          Login via OTP
                    </button>
                      </div>
                    </div>
                    </form>
                    <div className="login-or">
                      <hr className="hr-or" />
                      <span className="span-or">or</span>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <GoogleLogin
                          clientId={config.google_client_id}
                          buttonText="Login with Google"
                          onSuccess={responseGoogle}
                          onFailure={errorResponse}
                          cookiePolicy={"single_host_origin"}
                          className="btn btn-second btn-lg btn-block gf-btn"
                        />
                      </div>
                      <div className="col-lg-6">
                        <FacebookLogin
                          appId={config.facebook_app_id}
                          autoLoad={false}
                          textButton=" Login with Facebook"
                          fields="email"
                          onClick={componentClicked}
                          callback={responseFacebook}
                          cssClass="btn btn-second btn-lg btn-block gf-btn"
                          icon="fa-facebook"
                        />
                      </div>
                    </div>

                    <div id="inline-popups2">
                      <p className="member">
                        Not a member yet ? &nbsp;{" "}
                        <a
                          onClick={props.signup}
                          data-toggle="modal"
                          data-target="#basicModal2"
                          data-dismiss="modal"
                          className="show-cursor"
                        >
                          Sign up
                    </a>
                      </p>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: () => dispatch(getUserDetails()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
