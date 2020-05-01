import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { ForgotPasswordAction } from "../actions";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./signup.css";
import "../../../../css/modal.css";

const ForgotPassword = (props) => {
  const [mobile, setmobile] = useState("");
  const email = useRef(null);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = (event) => {
    
  //   const phoneNumber = parsePhoneNumber(mobile);
  //   console.log(phoneNumber);
  //   if (!isValidPhoneNumber(mobile)) {
  //     alert("Please Enter a Valid Phone Number");
  //   } else {
  //     ForgotPasswordAction(phoneNumber.nationalNumber).then((res) => props.showLogin("")).catch(err => {
  //       console.log("err in forget Password === ", err)
  //       if (err.result && err.result.code === "SCHEMA_VALIDATION_FAILED") {
  //         alert("Please enter Valid Data");
  //       }
  //     });
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let val = email.current.value;
    ForgotPasswordAction(val).then((res) => {
      setLoading(false);
      props.showLogin("")
    });
  };

  return (
    <div className="content-part default">
      <h3>Forgot Your Password?</h3>
      {/*} <h3 className="mb-28">Welcome Back</h3>*/}
      <p className="mb-28">
        please confirm your email/mobile below and we will send you a
        verification code.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
                      <input
                        type="text"
                        ref={email}
                        required={true}
                      />
                      <label htmlFor="input" className="control-label">
                        Enter Email/Mobile number
                  </label>
                      <i className="bar"></i>
          
          {/* <PhoneInput defaultCountry="IN" value={mobile} onChange={setmobile} />
          <label htmlFor="mobile" className={mobile && mobile.length > 0 ? "control-label label-focus" : "control-label"}>
            Enter Mobile number
          </label>
          <i className={mobile && mobile.length > 0 ? "bar bar-focus" : "bar"}></i> */}
        </div>

        <div className="clearfix"></div>
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            {/* className="btn btn-primary btn-lg btn-block" */}
            <Button size="lg" type="submit" block disabled={loading}>
              Reset Password
          </Button>
          </div>
          <div className="col-lg-3"></div>
          {/*<div className="col-lg-6">
          <button
            className="btn otpbtn btn-lg btn-block"
            onClick={() => props.showLogin("")}
          >
            Login
          </button>
        </div>*/}
        </div>
      </form>
      <div id="inline-popups3">
        <p className="member signbtn">
          Already have an account ? &nbsp;{" "}
          <a
            onClick={props.showLogin}
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
  );
};

export default ForgotPassword;
