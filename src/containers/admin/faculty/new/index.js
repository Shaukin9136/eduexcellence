import React, { useRef, useEffect, Fragment, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../../../../css/adminpages.css";
import { validateIntegers, validateCharecters, validateEmail } from "../../../../libs/validations";
import { createData, getUser, updateData } from "../../../actions/user-actions";
import Loading from "../../../common/loading";
import { useHistory } from "react-router-dom";
import swal from '@sweetalert/with-react';
const queryString = require('query-string');

export default (props) => {
  const default_state = {
    name: "John snow",
    qualification: "Phd",
    experiance: "13",
    university: "University of oxford",
    designation: "Professor",
    intrest: "Material science",
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    mobile: "+91 888-444-2222",
    email: "Eduexcellence@gmail.com"
  }
  const parsed = queryString.parse(props.location.search);
  const [user, setUser] = useState({ name: "", qualification: "", experiance: "", university: "", designation: "", intrest: "", about: "", mobile: "", email: '' })
  const [flag, setFlag] = useState(parsed.edit ? true : false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const nameEl = useRef(null);
  const qulfEl = useRef(null);
  const expEl = useRef(null);
  const univEl = useRef(null);
  const descEl = useRef(null);
  const intEl = useRef(null);
  const abtEl = useRef(null);
  const mobEl = useRef(null);
  const emailEl = useRef(null);


  useEffect(() => {
    let params = props.match.params;
    console.log(props.match);
    if (params && params.id !== "new") {
      getUser(params.id).then(res => {
        // console.log(res);
        if (res.data) {
          let name = res.data.firstName ? res.data.firstName : '';
          name += res.data.lastName ? " " + res.data.lastName : ''
          setUser({
            name: name,
            qualification: res.data.qualification ? res.data.qualification : '',
            experiance: res.data.experiance ? res.data.experiance : '',
            university: res.data.institute ? res.data.institute : '',
            designation: res.data.designation ? res.data.designation : '',
            intrest: res.data.intrest ? res.data.intrest : '',
            about: res.data.about ? res.data.about : '',
            mobile: res.data.mobileNumber ? res.data.mobileNumber : '',
            email: res.data.email ? res.data.email : ''
          });
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      setUser(default_state);
    }
  }, []);

  const handleEdit = () => {
    let params = props.match.params;
    if (params && params.id === "new") {
      setUser({ name: "", qualification: "", experiance: "", university: "", designation: "", intrest: "", about: "", mobile: "", email: "" })
    }
    setFlag(true);
  }

  const handleCancel = () => {
    let params = props.match.params;
    if (params && params.id === "new") {
      setUser(default_state)
    } else {
      setUser({ name: user.name, qualification: user.qualification, experiance: user.experiance, university: user.university, designation: user.designation, intrest: user.intrest, about: user.about, mobile: user.mobile, email: user.email });
    }
  }

  const handleSave = () => {
    let params = props.match.params;
    
    let _name = nameEl.current.textContent;
    let _qual = qulfEl.current.textContent;
    let _exp = expEl.current.textContent;
    let _univ = univEl.current.textContent;
    let _desc = descEl.current.textContent;
    let _inte = intEl.current.textContent;
    let _about = abtEl.current.textContent;
    let _mob = mobEl.current.textContent;
    let _email = emailEl.current.textContent;
    let obj = {};
    if (_name === "") {
      swal("Please Enter Name");
      return;
    } else if (!validateCharecters(_name)) {
      swal("Please Enter Valid Name");
      return;
    } else {
      let _i = _name.indexOf(" ");
      let firstName = _name.substr(0, _i);
      let lastName = _name.substr(_i + 1);
      if (lastName === "") {
        swal("Please Enter Full Name");
        return;
      } else {
        obj['firstName'] = firstName;
        obj['lastName'] = lastName;
      }
      
    }

    if (_email === "") {
      swal("Please Enter Email");
      return;
    } else if (!validateEmail(_email)) {
      swal("Please Enter Valid Email");
      return;
    } else {
      obj['email'] = _email;
    }

    if (_qual !== "") {
      obj['qualifications'] = _qual;
    }

    if (_exp !== "") {
      if (!validateIntegers(_exp)) {
        swal("Please Enter Valid Experince in Years");
        return;
      } else {
        obj['experience'] = _exp;
      }
    }

    if (_univ !== "") {
      obj['institute'] = _univ;
    }

    if (_desc !== "") {
      obj['designation'] = _desc;
    }

    if (_inte !== "") {
      obj['intrest'] = _inte;
    }

    if (_about !== "") {
      obj['about'] = _about;
    }

    if (_mob !== "") {
      obj['mobileNumber'] = _mob;
    }
    obj['password'] = "Education@123";
    obj['role'] = 'faculty';

    // console.log("obj === ", obj);
    setLoading(true);
    if (params && params.id !== "new") {
      updateData(params.id, obj).then(res => {
        // console.log("res === ", res);
        let name = obj.firstName ? obj.firstName : '';
        name += obj.lastName ? " " + obj.lastName : ''
        setUser({
          name: name,
          qualification: obj.qualification ? obj.qualification : '',
          experiance: obj.experiance ? obj.experiance : '',
          university: obj.institute ? obj.institute : '',
          designation: obj.designation ? obj.designation : '',
          intrest: obj.intrest ? obj.intrest : '',
          about: obj.about ? obj.about : '',
          mobile: obj.mobileNumber ? obj.mobileNumber : '',
          email: obj.email ? obj.email : ''
        });
        setFlag(false);
        setLoading(false);
      }).catch(err => {
        console.log("err in update faculty === ", err);
        swal("Error", err.result.message, "error");
        setLoading(false);
      })
    } else {
      createData(obj).then(res => {
        // console.log(res);
        let name = obj.firstName ? obj.firstName : '';
        name += obj.lastName ? " " + obj.lastName : ''
        setUser({
          name: name,
          qualification: obj.qualification ? obj.qualification : '',
          experiance: obj.experiance ? obj.experiance : '',
          university: obj.institute ? obj.institute : '',
          designation: obj.designation ? obj.designation : '',
          intrest: obj.intrest ? obj.intrest : '',
          about: obj.about ? obj.about : '',
          mobile: obj.mobileNumber ? obj.mobileNumber : '',
          email: obj.email ? obj.email : ''
        });
        setFlag(false);
        setLoading(false);
        history.push('/admin/faculty/'+res._id);
      }).catch(err => {
        console.log(err)
        swal("Error", err.result.message, "error");
        setLoading(false);
      });
    }
  }

  const handleList = (e) => {
    history.push('/admin/faculty');
  }


  return <div className="dash-data">
    <div className="courses-strip">
      <div className="flexible">
        <div className="course-side">
          <img src="/images/icons/faculty-icon2.png" /> Faculty detail
        </div>
        <div className="addnew">
          <button onClick={handleList}><i className="fa fa-plus"></i>Faculty List</button>
        </div>
      </div>
    </div>
    {loading && <Loading/>}
    {/*<a href="javascript: void(0);"></a>*/}
    <div className="faculty-detail" id="faculty-detail">
      <div className="row">
        <div className="col-lg-3">
          <div className="faculty-img" contentEditable={false}>
            <img src="/images/faculty-detail.png" />
            <span className="upload-icon"><img src="/images/icons/upload-img.png" /></span>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="content-faculty">
            <h2 className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={nameEl}>{user.name ? user.name : ''}</h2>
            <div className="flexible">
              <div className="cf-box">
                <h5 className="aftclc">Qualification</h5>
                <h4 className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={qulfEl}>{user.qualification ? user.qualification : ''}</h4>
              </div>
              <div className="cf-box">
                <h5 className="aftclc">Experience</h5>
                <h4 className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={expEl}>{user.experiance ? user.experiance : ''}</h4>
              </div>
              <div className="cf-box">
                <h5 className="aftclc">University</h5>
                <h4 className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={univEl}>{user.university ? user.university : ''}</h4>
              </div>
              <div className="cf-box">
                <h5 className="aftclc">Designation</h5>
                <h4 className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={descEl}>{user.designation ? user.designation : ''}</h4>
              </div>
              <div className="cf-box">
                <h5 className="aftclc">Area of intrest</h5>
                <h4 className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={intEl}>{user.intrest ? user.intrest : ''}</h4>
              </div>
            </div>
          </div>
          <div className="cf-about">
            <h4 className="aftclc">About</h4>
            <p className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={abtEl}>{user.about ? user.about : ''}</p>
            <br />
            {flag ?
              <Fragment>
                <h4 className="aftclc">Mobile</h4>
                <p className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={mobEl}>{user.mobile ? user.mobile : ''}</p>
                <h4 className="aftclc">Email</h4>
                <p className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={emailEl}>{user.email ? user.email : ''}</p>

              </Fragment>
            :
              <p className={flag ? "aftclc outline" : "aftclc"} contentEditable={flag} ref={mobEl}>{"Mob:" + user.mobile ? user.mobile : '' + " | " + user.email ? user.email : ''}</p>
            }
          </div>
        </div>
      </div>
      {flag === true ?
        <Fragment>
          <div className="save-btn" style={{ "display": "block" }}>
            <a onClick={(e) => handleSave(e)}>Save</a>
          </div>
          <div className="edit-btn">
            <a onClick={(e) => setFlag(false)}>Cancel</a>
          </div>
        </Fragment>
        : <div className="edit-btn">
          <a onClick={(e) => handleEdit()}>Edit</a>
        </div>}
    </div>
  </div>

}


