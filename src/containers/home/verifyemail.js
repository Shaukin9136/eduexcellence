import React, { useEffect } from 'react';
import {verifyEmailAction} from "../actions/user-actions";
import { useHistory } from "react-router-dom";
const queryString = require('query-string');

const VerifyEmail = (props) => {
    const history = useHistory();
    
    useEffect(() => {
        verifyUser();
    }, []);

    const verifyUser = () => {
        const parsed = queryString.parse(props.location.search);
        verifyEmailAction(parsed.token).then(res => {
            console.log("res === ", res)
            alert("Your Account is verified successfully, Please login");
            history.push("/");
        }).catch(err => {
            console.log("err === ", err);
            alert(err.message);
        });
    }

    return <div>
        Loading...
    </div>
}

export default VerifyEmail;