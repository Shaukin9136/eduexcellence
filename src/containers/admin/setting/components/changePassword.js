import React, {useState} from "react";
import { validatePassword } from "../../../../libs/validations";
import { changePassword } from "../actions";
import swal from '@sweetalert/with-react';

export default (props) => {
  const [pass, setPass] = useState({ old: '', new: '', confirm: '' });
  
  const handlePassword = (name, value) => {
    setPass(prevState => { return { ...prevState, [name]: value } });
  }

  const handleSave = (event) => {
    event.preventDefault();
    let obj = {};
    if (pass.old !== '') {
      obj['currentPassword'] = pass.old;
    } else {
      swal("Please enter the Old Password");
      return;
    }

    if (pass.new === '' && !validatePassword(pass.new)) {
      swal("Please enter the New Password");
      return;
    }

    if (pass.new === pass.confirm) {
      obj['newPassword'] = pass.confirm;
    } else {
      swal("Both new and confirm password should be same");
      return;
    }

    changePassword(obj).then(res => {
      // console.log("res === ", res);
      setPass({old: '', new: '', confirm: ''})
      swal("Success", res, "success");
    }).catch(err => {
      console.log("err === ", err)
      swal("Error", err.message, "error");
    });
  }

  return (
    <div className="tabdb active">
      <p className="profile_p">
        Change password{" "}
        <i
          style={{ color: "#989898", fontSize: "17px" }}
          className="fa fa-pencil"
        ></i>
      </p>
      <form onSubmit={handleSave}>
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <input type="password" required="required" value={pass.old} onChange={(e) => handlePassword('old', e.target.value)} />
              <label htmlFor="input" className="control-label">
                Old password
              </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="password" required="required" value={pass.new} onChange={(e) => handlePassword('new', e.target.value)} />
              <label htmlFor="input" className="control-label">
                New password
              </label>
              <i className="bar"></i>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <input type="password" required="required" value={pass.confirm} onChange={(e) => handlePassword('confirm', e.target.value)} />
              <label htmlFor="input" className="control-label">
                Confirm password
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
    </div>
  );
};
