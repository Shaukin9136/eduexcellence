import React, { Fragment, useState, useEffect } from 'react';
import Login from './login';
import SignUp from './signup';
import ResetPassword from "../resetPassword";
import "../../../../css/header.css"
import { useHistory } from "react-router-dom";
const queryString = require('query-string');


const Header = (props) => {
    const [showModal, setModal] = useState(false);
    const parsed = queryString.parse(props.location.search);
    useEffect(() => {
        if (parsed.token) {
            setModal("RESET");
        }
    }, []);
    return <Fragment>
        {showModal === "IN" ? <Login close={() => setModal(false)} signup={() => setModal("UP")} /> :
        showModal === "UP" ? <SignUp signin={() => setModal("IN")} close={() => setModal(false)}/> : 
        showModal === "RESET" ? <ResetPassword token={parsed.token} close={() => setModal(false)} signin={() => setModal("IN")}/> : null}
        <section className="topbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <p>
                                    <img src="/images/icons/sent.png" alt="send-icon" />
                                    <a href="mailto:shweta@eduexcellence.org">shweta@eduexcellence.org</a>
                                </p>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <p>
                                    <img src="/images/icons/phone.png" alt="phone-icon" />
                                    <a href="tel:8448187401">+91-8448187401</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right">
                        <div className="top-social">
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-youtube-play"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Hrader Top Nav */}
        <header id="myHeader">
            <div className="container flexible">
                <div className="logo-part">
                    <p>
                        <a href="/">
                            <img src="/images/logo.png" alt="logo" />
                        </a>
                    </p>
                </div>
                <div className="menubar">
                    <ul id="inline-popups">
                        <li>
                            <a href="#">
                                <i className="fa fa-search"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-bars"></i>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => setModal("IN")} data-effect="mfp-zoom-out">
                                <button className="loginbtn">Login</button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    </Fragment>
}


export default Header;