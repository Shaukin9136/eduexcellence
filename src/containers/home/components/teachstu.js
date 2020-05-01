import React from "react";

export default (props) => {

    const myFunction2 = () => {


    }

    const myFunction = () => {

    }

    return <div className="row">
        <div className="col-lg-6">
            <div className="teach-stu-box stu-trri" onClick={myFunction}>
                <img src="images/student.png" alt="" />
                <div className="overlay-stu" id="myAnchor2">
                    <div className="selected">
                        <p>
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </p>
                        <h3>I am Student</h3>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="teach-stu-box teach-trri" onClick={myFunction2}>
                <img src="images/teacher.png" alt="" />
                <div className="overlay-teach" id="myAnchor">
                    <div className="selected">
                        <p>
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </p>
                        <h3>I am Teacher</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

}