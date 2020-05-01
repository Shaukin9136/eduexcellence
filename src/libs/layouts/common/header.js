import React, { Fragment } from 'react';
import "../../../css/header.css";

const DashHeader = (props) => {

    return <Fragment>
        <section className="topbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <p>
                                    <img src="images/icons/sent.png" alt="send-icon" />
                                    <a href="mailto:shweta@eduexcellence.org">shweta@eduexcellence.org</a>
                                </p>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <p>
                                    <img src="images/icons/phone.png" alt="phone-icon" />
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

        <header id="myHeader">
            <div className="container flexible">
                <div className="logo-part">
                    <p>
                        <a href="/">
                            <img src="images/logo.png" alt="logo" />
                        </a>
                    </p>
                </div>
                <div className="menubar cat">
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
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <a href="#">My Courses
              <span>
                                    <i className="fa fa-angle-down"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img className="yt-icon" src="images/icons/youtube.svg" width="39" alt="Youtube_logo" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="images/icons/cart.svg" width="25" alt="Cart" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="images/icons/bell.svg" width="23" alt="Bell" />
                            </a>
                        </li>
                        <li className="propic">
                            <a href="#">
                                <img src="images/profile-pic.png" alt="profile pic" />
                            </a>
                        </li>
                    </ul>
                    <div className="profile-block">
                        <ul>
                            <li>
                                <a href="#">
                                    {/* <svg {{"xmlns": dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 125">
                  <g transform="translate(0,-952.36218)" >
                                        <path style="text-indent:0;   text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;"
                                            d="m 50.005052,958.34763 c -13.776,0 -24.9826,11.20639 -24.9826,24.98218 0,9.83528 5.7126,18.36469 13.9941,22.44029 -16.796,4.7856 -29.1183995,20.2611 -29.1183995,38.5781 a 2.0002,2.0002 0 1 0 3.9999995,0 c 0,-19.4525 15.3253,-35.2755 34.5793,-36.0741 0.5055,0.031 1.0145,0.048 1.527601,0.048 0.513,0 1.022,-0.017 1.5274,-0.048 19.253699,0.7985 34.569395,16.6209 34.569395,36.0741 a 2.0002,2.0002 0 1 0 4,0 c 0,-18.3164 -12.315201,-33.7923 -29.108695,-38.5781 8.2817,-4.0755 13.9943,-12.60484 13.9943,-22.44029 0,-13.77579 -11.206501,-24.98218 -24.9824,-24.98218 z m 0,4 c 11.6152,0 20.9824,9.36717 20.9824,20.98218 0,11.11514 -8.5795,20.17999 -19.4962,20.93969 -0.4932,-0.018 -0.9887,-0.028 -1.4862,-0.028 -0.4975,0 -0.9928,0.01 -1.486,0.028 -10.9168,-0.7596 -19.4966,-9.82447 -19.4966,-20.93969 0,-11.61501 9.3673,-20.98218 20.9826,-20.98218 z"
                                            fill="#000000" fill-opacity="1" fill-rule="evenodd" stroke="none" marker="none" visibility="visible"
                                            display="inline" overflow="visible" />
                                    </g>
                            </svg> View Profile</a> */}
                                    View Profile</a>
                            </li>
                            <li>
                                <a href="#">
                                    <svg className="logout-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px">
                                        <title>Computer, IT, Hardware,Power</title>
                                        <g data-name="Layer 53">
                                            <path d="M30,16A14,14,0,1,1,7.38,5L8.62,6.54a12,12,0,1,0,15.05.23L25,5.23A14,14,0,0,1,30,16ZM17,3H15V19h2Z"
                                            />
                                        </g>
                                    </svg> Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    </Fragment >
}


export default DashHeader;