import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "./signup.css";
import "react-phone-number-input/style.css";
import { VerifyNumberAction, VerifyOTPAction } from "../actions";

const VerifyNumber = (props) => {
  const int1 = useRef(null);
  const int2 = useRef(null);
  const int3 = useRef(null);
  const int4 = useRef(null);
  const int5 = useRef(null);
  const int6 = useRef(null);
  const [sent, setsent] = useState(false);
  const [mobile, setmobile] = useState("");
  const [loading, setLoading] = useState(false);
  const phno = useRef("");

  const handleSend = () => {
    if (!isValidPhoneNumber(mobile)) {
      alert("Please Enter a Valid Phone Number");
    } else {
      setLoading(true);
      const phoneNumber = parsePhoneNumber(mobile);
      phno.current = phoneNumber.nationalNumber;
      VerifyNumberAction(phno.current)
        .then((res) => {
          setsent(true);
          setLoading(false);
          int1.current.focus();
        })
        .catch((err) => {
          setLoading(false);
          alert(err.result.message);
        });
    }
  };

  const handleVerify = () => {
    let otp = "";
    let error = false;
    int1.current.value === "" ? (error = true) : (otp += int1.current.value);
    int2.current.value === "" ? (error = true) : (otp += int2.current.value);
    int3.current.value === "" ? (error = true) : (otp += int3.current.value);
    int4.current.value === "" ? (error = true) : (otp += int4.current.value);
    int5.current.value === "" ? (error = true) : (otp += int5.current.value);
    int6.current.value === "" ? (error = true) : (otp += int6.current.value);
    if (error) {
      alert("Please enter the OTP");
    } else {
      setLoading(true);
      let obj = {
        mobile: phno.current,
        otp: otp,
      };
      VerifyOTPAction(obj)
        .then((res) => {
          setLoading(false);
          props.successCallback();
        })
        .catch((err) => {
          setLoading(false);
          alert(err.result.message);
        });
    }
  };
  const handleKey = (event, c, p) => {
    let val = c.current.value;
    if (event.keyCode === 8) {
      if (val === "") {
        p && p.current.focus();
      }
    }
  };

  const handleChange = (p, c, n) => {
    let val = c.current.value;
    if (val === "") {
      p && p.current.focus();
    } else {
      n && n.current.focus();
    }
  };

  const resendOTP = () => {
    setLoading(true);
    VerifyNumberAction(phno.current)
      .then((res) => {
        setLoading(false);
        int1.current.value = "";
        int2.current.value = "";
        int3.current.value = "";
        int4.current.value = "";
        int5.current.value = "";
        int6.current.value = "";
        int1.current.focus();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.result.message);
      });
  };

  return (
    <div className="content-part default">
      <h3>Good Evening!</h3>
      <h3 className="mb-28">Welcome Back</h3>

      <div className="form-group">
        <PhoneInput defaultCountry="IN" value={mobile} onChange={setmobile} />
        <label htmlFor="mobile" className={mobile && mobile.length > 0 ? "control-label label-focus" : "control-label"}>
          Enter Your Registered Phone Number
        </label>
        <i className={mobile && mobile.length > 0 ? "bar bar-focus" : "bar"}></i>
      </div>

      <div className="clearfix"></div>
      {
        sent && (
          <div className="row">
            <div className="col-lg-6">
              <br />
              {/* <p className="resend-text">Waiting for OTP 6 sec</p> */}
              <p className="resend-text">
                Not received your code? &nbsp;{" "}
                <a
                  onClick={resendOTP}
                  className="show-cursor"
                  style={{ color: "#ff8a00" }}
                >
                  {" "}
                resend code
              </a>
              </p>
            </div>
            <div className="col-lg-6">
              <div className="otp-sec">
                {/* <form> */}
                <input
                  id="codeBox1"
                  type="text"
                  tabIndex="-1"
                  maxLength="1"
                  ref={int1}
                  onChange={() => handleChange(null, int1, int2)}
                  onKeyUp={(e) => handleKey(e, int1, null)}
                />
                <input
                  id="codeBox2"
                  type="text"
                  tabIndex="-1"
                  maxLength="1"
                  ref={int2}
                  onChange={() => handleChange(int1, int2, int3)}
                  onKeyUp={(e) => handleKey(e, int2, int1)}
                />
                <input
                  id="codeBox3"
                  type="text"
                  tabIndex="-1"
                  maxLength="1"
                  ref={int3}
                  onChange={() => handleChange(int2, int3, int4)}
                  onKeyUp={(e) => handleKey(e, int3, int2)}
                />
                <input
                  id="codeBox4"
                  type="text"
                  tabIndex="-1"
                  maxLength="1"
                  ref={int4}
                  onChange={() => handleChange(int3, int4, int5)}
                  onKeyUp={(e) => handleKey(e, int4, int3)}
                />
                <input
                  id="codeBox5"
                  type="text"
                  tabIndex="-1"
                  maxLength="1"
                  ref={int5}
                  onChange={() => handleChange(int4, int5, int6)}
                  onKeyUp={(e) => handleKey(e, int5, int4)}
                />
                <input
                  id="codeBox6"
                  type="text"
                  tabIndex="-1"
                  maxLength="1"
                  ref={int6}
                  onChange={() => handleChange(int5, int6, null)}
                  onKeyUp={(e) => handleKey(e, int6, int5)}
                />
                {/* </form> */}
              </div>
            </div>
          </div>
        )
      }
      <div className="row">
        {sent ? (
          <div className="col-lg-6">
            <Button size="lg" onClick={handleVerify} block>
              Verify
            </Button>
          </div>
        ) : (
            <div className="col-lg-6">
              <Button size="lg" onClick={handleSend} block>
                Send OTP
            </Button>
            </div>
          )}
        <div className="col-lg-6">
          <button
            className="btn otpbtn btn-lg btn-block"
            onClick={() => props.showLogin("")}
          >
            Login with Password
          </button>
        </div>
      </div>
    </div >
  );
};

export default VerifyNumber;
