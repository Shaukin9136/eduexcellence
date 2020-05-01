import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  validateEmail,
  validateCharecters,
  validatePassword,
} from "../../../validations";
import { signupAction } from "../actions";
import "react-phone-number-input/style.css";
import "./signup.css";
import "../../../../css/modal.css";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
// import { config } from "../../../../config";
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

const Signup = (props) => {
  const [firstname, setfname] = useState("");
  const [lastname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [type, settype] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const terms = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneNumber = parsePhoneNumber(mobile);
    if (!validateCharecters(firstname)) {
      alert("Please Enter a Valid First Name");
    } else if (!validateCharecters(lastname)) {
      alert("Please Enter a Valid Last Name");
    } else if (!validateEmail(email)) {
      alert("Please Enter a Valid Email");
    } else if (!isValidPhoneNumber(mobile)) {
      alert("Please Enter a Valid Phone Number");
    } else if (!validatePassword(password)) {
      alert("Password length should be more than 6, should contains atleast one Capital Letter, one Small Letter, one Nummeric Value and one Special Character");
    } else if (type === "") {
      alert("Please Select User Type");
    } else if (!terms.current.checked) {
      alert("Please Select the Terms and Conditions");
    } else {
      setLoading(true);
      let obj = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        mobileNumber: phoneNumber.nationalNumber,
        countryCode: "+" + phoneNumber.countryCallingCode,
        role: type,
        password: password,
      };
      signupAction(obj)
        .then((res) => {
          console.log("res === ", res);
          if (res.status) {
            alert("Your account has been created, Please check your email for activating your account");
            props.close();
          } else {
            if (res.result && res.result.code === "SCHEMA_VALIDATION_FAILED") {
              alert("Please enter Valid Data");
            } else {
              alert("Please Try Again");
            }
          }
        })
        .catch((err) => {
          console.log("err === ", err);
          alert("Internal Server Error, Please Try Again");
        });
    }
  };

  // const responseGoogle = (response) => {
  //     console.log(response);
  //     if (response && response.googleId) {
  //         // success
  //     } else {
  //         // error
  //         console.log("error ==== ", response.error);
  //     }
  // }

  // const responseFacebook = (response) => {
  //     console.log(response);
  // }

  // const componentClicked = () => {

  // }

  return (
    <Modal show={true} onHide={props.close}>
      <Modal.Body>
        <p className="close-modal" data-dismiss="modal" onClick={props.close}>
          x
        </p>
        <div className="modal-body white-popupp">
          <div className="flexible login-wrap">
            <div className="image-part">
              <img src="images/login_bg.jpg" alt="Background Logo" />
              <img className="login-logo" src="images/logo.png" alt="Logo" />
            </div>
            <div className="content-part default">
              <h3 className="mb-28">Welcome to Eduexcellence</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={(e) => setfname(e.target.value)}
                        required={true}
                      />
                      <label for="input" className="control-label">
                        First name*
                    </label>
                      <i className="bar"></i>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={(e) => setlname(e.target.value)}
                        required={true}
                      />
                      <label for="input" className="control-label">
                        Last name*
                    </label>
                      <i className="bar"></i>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={(e) => setemail(e.target.value)}
                        required={true}
                      />
                      <label for="input" className="control-label">
                        Email*
                    </label>
                      <i className="bar"></i>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <PhoneInput
                        // placeholder="Enter phone number"
                        defaultCountry="IN"
                        value={mobile}
                        onChange={setmobile}
                        tabIndex={4}
                      />
                      {/* <input id="mobile" type="text" onChange={(e) => setmobile(e.target.value)} required={true} /> */}
                      <label htmlFor="mobile" className={mobile && mobile.length > 0 ? "control-label label-focus" : "control-label"}>
                        Mobile*
                    </label>
                      <i className={mobile && mobile.length > 0 ? "bar bar-focus" : "bar"}></i>
                    </div>
                  </div>
                </div>

                <div className="iam">
                  <span>I am</span>{" "}
                  <button
                    type="button"
                    className={type === "user" ? "studentbtn" : "teacherbtn"}
                    onClick={(e) => settype("user")}
                  >
                    Student
                </button>{" "}
                  <button
                    type="button"
                    className={type === "teacher" ? "studentbtn" : "teacherbtn"}
                    onClick={(e) => settype("teacher")}
                  >
                    Teacher
                </button>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    required={true}
                  />
                  <label for="input" className="control-label">
                    Password*
                </label>
                  <i className="bar"></i>
                </div>

                {/* <div className="checkbox"> */}
                <label>
                  <input type="checkbox" ref={terms} />
                  <span className="checkbox-material">
                    <span className="check"></span>
                  </span>
                  <span className="check-text">
                    By creating an account you agree to the{" "}
                    <a href="#">Terms of use</a> and our{" "}
                    <a href="#">Privacy policy</a>
                  </span>
                </label>
                {/* </div> */}
                <Button size="lg" block type="submit">
                  Sign up
              </Button>
              </form>
              <div className="login-or">
                <hr className="hr-or" />
                <span className="span-or">or</span>
              </div>
              {/*  <div className="row">
                            <div className="col-lg-6">
                                <GoogleLogin
                                    clientId={config.google_client_id}
                                    buttonText="Signup with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <div className="col-lg-6">
                                <FacebookLogin
                                    appId="1088597931155576"
                                    autoLoad={false}
                                    textButton=" Signup with Facebook"
                                    fields="name,email"
                                    onClick={componentClicked}
                                    callback={responseFacebook}
                                    cssClassName="btn btn-second btn-lg btn-block"
                                    icon="fa-facebook" />
                            </div>
                        </div> */}

              <div id="inline-popups3">
                <p className="member signbtn">
                  Already have an account ? &nbsp;{" "}
                  <a
                    onClick={props.signin}
                    data-toggle="modal"
                    data-target="#basicModal"
                    data-dismiss="modal"
                    className="show-cursor"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
