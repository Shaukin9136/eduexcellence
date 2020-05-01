import React, {useState, useEffect} from "react";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import { validateCharecters, validateEmail } from "../../../../libs/validations";
import { updateProfile } from "../actions";
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react';

const Profile = (props) => {
  const [userData, setuser] = useState({ firstName: '', lastName: '', email: '', mobileNumber: '', gender: '' });

  useEffect(() => {
    if (props.user) {
      const { user } = props;
      setuser({
        firstName: user.firstName ? user.firstName : '',
        lastName: user.lastName ? user.lastName : '',
        email: user.email ? user.email : '',
        mobileNumber: user.mobileNumber ? !/^[+]/.test(user.mobileNumber) ? "+91" + user.mobileNumber : user.mobileNumber  : '',
        gender: user.gender ? user.gender : ''
      });
    }
  }, [props.user]);

  const handleChange = (name, value) => {
    setuser(prevState => { return { ...prevState, [name]: value } });
  }

  const handleSave = (event) => {
    event.preventDefault();
    let obj = {};
    const phoneNumber = parsePhoneNumber(userData.mobileNumber);
    if (userData.firstName !== '' && validateCharecters(userData.firstName)) {
      obj['firstName'] = userData.firstName;
    } else {
      swal("Please enter the First Name");
      return;
    }

    if (userData.lastName !== '' && validateCharecters(userData.lastName)) {
      obj['lastName'] = userData.lastName;
    } else {
      swal("Please enter the Last Name");
      return;
    }

    if (userData.gender !== '' && validateCharecters(userData.gender)) {
      obj['gender'] = userData.gender;
    } else {
      swal("Please enter the Gender");
      return;
    }

    if (userData.mobileNumber !== '') {
      obj['mobileNumber'] = phoneNumber.nationalNumber;
      obj['countryCode'] = "+" + phoneNumber.countryCallingCode;
    } else {
      swal("Please enter the Mobile Number");
      return;
    }

    if (userData.email !== '' && validateEmail(userData.email)) {
      obj['email'] = userData.email;
    } else {
      swal("Please enter the Email");
      return;
    }
    props.updateProfile(obj, props.user._id).then(res => {
      console.log(res)
      swal("Success", "Profile Updated Successfully", "success");
    }).catch(err => {
      console.log("err === ", err);
    })
  }

  return (
    <div className="tabdb active">
      <p className="profile_p">
        Profile{" "}
        <i
          style={{ color: "#989898", fontSize: "17px" }}
          className="fa fa-pencil"
        ></i>
      </p>
      <form onSubmit={handleSave}>
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={userData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
              <label htmlFor="input" className="control-label">
                First Name
              </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={userData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
              <label htmlFor="input" className="control-label">
                Last Name
              </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="text" required="required" value={userData.gender} onChange={(e) => handleChange('gender', e.target.value)} />
              <label htmlFor="input" className="control-label">
                Gender
              </label>
              <i className="bar"></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <PhoneInput
                // placeholder="Enter phone number"
                defaultCountry="IN"
                country="IN"
                value={userData.mobileNumber}
                onChange={(num) => handleChange('mobileNumber', num)}
                tabIndex={4}
              />
              {/* <input type="text" required="required" value={user.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} /> */}
              <label htmlFor="mobile" className={userData.mobileNumber && userData.mobileNumber.length > 0 ? "control-label label-focus" : "control-label"}>
                Mobile*
                  </label>
              <i className={userData.mobileNumber && userData.mobileNumber.length > 0 ? "bar bar-focus" : "bar"}></i>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input type="text" required="required" value={userData.email} onChange={(e) => handleChange('email', e.target.value)} />
              <label htmlFor="input" className="control-label">
                Email Id
              </label>
              <i className="bar"></i>
            </div>
          </div>
        </div>
        <br />
        <br />
        <p className="center">
          <button type="submit" className="btnsave">Save</button>
        </p>
      </form>
    </div >
  );
};

const mapStateToProps = (state) => {
  return { user: state.app.userData };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (obj, id) => (dispatch(updateProfile(obj, id)))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);