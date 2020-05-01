import React from 'react';
import "../../../../css/header.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const AdminHeader = (props) => {
    const {userDetails} = props;
    // const history = useHistory();
    // if (!userDetails) {
    //     history.push("/");
    // }

    return <div className="dash-header">
    <div className="flexible">
       <div className="logo-side">
          <img src="/images/logo.png" alt="Logo" />
       </div>
       <div className="pro-side">
          <ul>
             <li><i className="fa fa-search"></i></li>
             <li data-toggle="modal" data-target="#adminlogin"><img src="/images/profile-pic.png" alt="Profile Pic" /></li>
          </ul>
       </div>
    </div>
 </div>
}

const mapStateToProps = (state) => {
    return { userDetails: state.app.userData };
}

export default connect(mapStateToProps, null)(AdminHeader);