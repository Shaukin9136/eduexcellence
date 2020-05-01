
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./components/signup.css";
import "../../../css/modal.css";
import {validatePassword} from "../../validations";
import {resetPassword} from "../../../containers/actions/user-actions";

const ResetPassword = (props) => {

    const [password, setPass] = useState('');
    const [confirm, setConf] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePassword(password)) {
            alert("Password length should be more than 6, should contains atleast one Capital Letter, one Small Letter, one Nummeric Value and one Special Character");
        } else if (password !== confirm) {
            alert("Password and Confirm password should be same");
        } else {
            let obj = {
                password: password,
                confirmPassword: confirm,
                token: props.token
            }
            resetPassword(obj).then(res => {
                alert("Password Updated Successfully, Please Login");
                props.close();
                history.push("/");
            }).catch(err => {
                console.log("err === ", err);
            })
        }
    }
    return (
        <Modal show={true} onHide={props.close} className="custom-modal">
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
                        <div className="content-part default">
                            <h3>Reset Your Password?</h3>
                            <p className="mb-28">
                                please enter password and confirm password.
                        </p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        required={true}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <label htmlFor="input" className="control-label">
                                        Password
                                </label>
                                    <i className="bar"></i>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        required={true}
                                        onChange={(e) => setConf(e.target.value)}
                                    />
                                    <label htmlFor="input" className="control-label">
                                        Confirm Password
                                </label>
                                    <i className="bar"></i>
                                </div>

                                <div className="clearfix"></div>
                                <div className="row">
                                    <div className="col-lg-3"></div>
                                    <div className="col-lg-6">
                                        <Button size="lg" type="submit" block disabled={loading}>
                                            Submit
                                    </Button>
                                    </div>
                                    <div className="col-lg-3"></div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>)
}

export default ResetPassword;