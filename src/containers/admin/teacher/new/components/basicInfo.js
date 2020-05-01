import React, { useState } from "react";
import Loading from "../../../../common/loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateCharecters, validateEmail, validateIntegers } from "../../../../../libs/validations";
import { createData } from "../../../../actions/user-actions";
import { useHistory } from "react-router-dom";
import swal from '@sweetalert/with-react';
var moment = require('moment');

export default (props) => {
  const [user, setUser] = useState({ firstName: "", lastName: "", gender: "", dob: new Date(), mobile: "", email: "", designation: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (name, value) => {
    setUser(prevState => { return { ...prevState, [name]: value } });
  }

  const handleSave = () => {
    const { firstName, lastName, gender, dob, mobile, email, designation } = user;
    if (!firstName || (firstName && firstName === '')) {
      swal("Please Enter First Name");
      return;
    } else if (firstName && !validateCharecters(firstName)) {
      swal("Please Enter valid First Name");
      return;
    }

    if (!lastName || (lastName && lastName === '')) {
      swal("Please Enter Last Name");
      return;
    } else if (lastName && !validateCharecters(lastName)) {
      swal("Please Enter valid Last Name");
      return;
    }

    if (!gender || (gender && gender === '')) {
      swal("Please Enter Gender");
      return;
    } else if (gender && !validateCharecters(gender)) {
      swal("Please Enter valid Gender");
      return;
    }

    if (!dob || (dob && dob === '')) {
      swal("Please Select Date of Birth");
      return;
    }

    if (!mobile || (mobile && mobile === '')) {
      swal("Please Enter Mobile Number");
      return;
    } else if (mobile && !validateIntegers(mobile)) {
      swal("Please Enter valid Mobile Number");
      return;
    }

    if (!email || (email && email === '')) {
      swal("Please Enter Email");
      return;
    } else if (email && !validateEmail(email)) {
      swal("Please Enter valid Email");
      return;
    }

    if (!designation || (designation && designation === '')) {
      swal("Please Enter Designation");
      return;
    } else if (designation && !validateCharecters(designation)) {
      swal("Please Enter valid Designation");
      return;
    }

    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      role: "teacher",
      password: "Education@123",
      designation: designation,
      dob: moment(dob).valueOf(),
      mobileNumber: mobile
    }

    createData(obj).then(res => {
      console.log(res)
      history.push('/admin/teacher');
    }).catch(err => {
      console.log(err)
      swal("Error", "Internal Server Error, Please Try Again", "error");
    });
  }

  return (
    <div className="tabdb active">
      <div className="setting">
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={user.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
              <label htmlFor="input" className="control-label">
                First Name
                </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={user.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
              <label htmlFor="input" className="control-label">
                Last Name
                </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={user.gender} onChange={(e) => handleChange("gender", e.target.value)} />
              <label htmlFor="input" className="control-label">
                Gender
                </label>
              <i className="bar"></i>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <DatePicker
                dateFormat="MM/dd/yy"
                maxDate={new Date()}
                selected={user.dob}
                onChange={(date) => handleChange("dob", date)}
                className="datepic hasDatepicker"
              />
              {/* <input type="text" required="required" value={user.dob} onChange={(e) => handleChange("dob", e.target.value)} /> */}
              <label htmlFor="input" className="control-label">
                Dob
                </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={user.mobile} onChange={(e) => handleChange("mobile", e.target.value)} />
              <label htmlFor="input" className="control-label">
                Mobile
                </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={user.email} onChange={(e) => handleChange("email", e.target.value)} />
              <label htmlFor="input" className="control-label">
                Email
                </label>
              <i className="bar"></i>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={user.designation} onChange={(e) => handleChange("designation", e.target.value)} />
              <label htmlFor="input" className="control-label">
                Designation
                </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-4"></div>
        </div>
        <p>
          Role <a href="#">Edit</a>
        </p>
        <br />
        <br />
        <hr />
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <button className="savebtn" onClick={handleSave}>Save</button>
          </div>
          {/* <div className="col-lg-6 col-md-6 text-right">
            <button className="nxtbtn">Next</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
