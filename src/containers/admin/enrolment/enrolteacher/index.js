import React, { useState, useEffect, Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../../../../libs/pagination/index";
import "../../../../css/adminpages.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCourseList, saveEnrol, getUsersList } from "../actions";
import {categories, subcategories} from "../../../../data/course_config";
import moment from "moment";
import swal from '@sweetalert/with-react';

export default (props) => {
  const userEl = useRef(null);
  const history = useHistory();
  const [courses, setCourse] = useState([]);
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubCategory] = useState('');
  const [data, setData] = useState({course: '', mode: '', date: new Date(), isDiscounted: false, price: 0, userid: '' })

  useEffect(() => {
    getCourseList(0, 100).then(res => setCourse(res)).catch(err => console.log("err === ", err));
    getUsersList(0, 1000).then(res => setUsers(res)).catch(err => console.log("err === ", err));
  }, []);

  useEffect(() => {
    getCourseList(0, 100, [category], [subcategory]).then(res => setCourse(res)).catch(err => console.log("err === ", err));
  }, [category, subcategory]);

  const handleNew = () => {
    history.push("/admin/teacher/new");
  };

  const handleSearch = (e) => {
		let filter = e.target.value.toUpperCase();
		let li = userEl.current.getElementsByTagName('li');
		for (let i = 0; i < li.length; i++) {
			let txtValue = li[i].textContent || li[i].innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
			  li[i].style.display = "";
			} else {
			  li[i].style.display = "none";
			}
		}
	}

  const handleSave = () => {
    let course_data;
    let obj = {
      // transectionId: "1111",
      isDiscounted: data.isDiscounted,
      enrolByAdmin: true,
      paymentDate: moment(data.date).valueOf(),
      isActive: true
    };

    if (data.userid && data.userid !== "") {
      obj['userid'] = data.userid;
    } else {
      swal("Please select the Teacher");
      return;
    }

    if (data.course && data.course !== "") {
      obj['courseid'] = data.course;
      course_data = courses.filter(item => item._id = data.course);
    } else {
      swal("Please select the course");
      return;
    }
    obj['price'] = data.isDiscounted ? course_data[0].pricing.price - Number(data.price) : course_data[0].pricing.price;

    if (data.mode && data.mode !== "") {
      obj['paymentMode'] = data.mode;
    } else {
      swal("Please select the payment mode");
      return;
    }
    
    saveEnrol(obj).then(res => {
      // console.log("res ==== ", res);
      history.push("/admin/enrolment/history");
    }).catch(err => console.log("err === ", err));

  }

  const handleChange = (name, value) => {
    setData(prevState => {return {...prevState, [name]: value }});
  }

  return (
    <div className="dash-data">
      <div className="courses-strip">
        <div className="flexible">
          <div className="course-side">
            <img src="/images/icons/teachers-icon.png" /> Enrol a Teacher
          </div>
          <div className="addnew">
            <button onClick={handleNew}>
              <i className="fa fa-plus"></i> Add new teacher
            </button>
          </div>
        </div>
      </div>
      <div className="teacher">
        <div className="row">
          <div className="col-lg-4 search_bar">
            <div style={{ borderRight: "1px solid #ddd" }}>
              <p id="select">Select User</p>
              <input type="search" placeholder="Search" id="search" onChange={handleSearch}/>
              <ul ref={userEl}>
                {users.map(record => <li key={record._id} className={record._id === data.userid ? "active" : ""} onClick={(e) => handleChange("userid", record._id)}>{record.fullName ? record.fullName : record.email}</li>)}
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="teach-cont">
              <div className="row drop_list">
                <div className="col-lg-4">
                  <p>Category</p>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option data-display="Select" className="list option">Select Category</option>
                    {categories.map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                  </select>
                </div>
                <div className="col-lg-4">
                  <p>Sub-Category</p>
                  <select value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>
                  <option data-display="Select" className="list option">Select Sub-category</option>
                    {subcategories.filter(i => i.c_id.indexOf(category) > -1).map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                  </select>
                </div>
                <div className="col-lg-4">
                  <p>Course Name</p>
                  <select value={data.course} onChange={(e) => handleChange("course", e.target.value)}>
                    <option value="">Select Course Name</option>
                    {courses.map(item => <option key={item._id} value={item._id}>{item.title}</option>)}
                  </select>
                </div>
              </div>
              {/*<!-- <div className="taeb-switch left text-center"> -->*/}
              {/*<!-- <div className="taeb trri1 active" taeb-direction="left">Full</div> -->*/}

              {/*<!-- <div className="taeb trri2" taeb-direction="right">Discounted</div> -->*/}
              {/*<!-- </div> -->*/}
              <div className={data.isDiscounted === false ? "taeb-switch left text-center" : "taeb-switch right text-center"}>
                <div className={data.isDiscounted === false ? "taeb trri1 active" : "taeb trri1"} taeb-direction="left" onClick={(e) => setData(prevState => {return {...prevState, isDiscounted: false}})}>
                  Full
                </div>
                {/*<!--
                            -->*/}
                <div className={data.isDiscounted === true ? "taeb trri2 active" : "taeb trri2"} taeb-direction="right" onClick={(e) => setData(prevState => {return {...prevState, isDiscounted: true}})}>
                  Discounted
                </div>
              </div>

              {data.isDiscounted === true &&
                <Fragment>
                  <p>Discounted Price</p>
                  <input type="text" className="dis-p" placeholder="$799" onClick={(e) => handleChange('price', e.target.value)}/>
                </Fragment>}

              <div className="full">
                <div className="row">
                  <div className="col-lg-4">
                    <p>Payment Mode</p>
                    <select value={data.mode} onChange={(e) => handleChange("mode", e.target.value)}>
                      <option value="">Select Payment Mode</option>
                      <option value="paypal">Paypal</option>
                      <option value="card">Card</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  <div className="col-lg-4 calender">
                    <p>Payment Date</p>
                    <DatePicker
                      dateFormat="MM/dd/yy"
                      maxDate={new Date()}
                      selected={data.date}
                      onChange={(date) => setData(prevState => {return {...prevState, date: date}})}
                      className="datepic hasDatepicker"
                    />
                    {/* <i className="fa fa-calendar" aria-hidden="true"></i> */}
                  </div>
                </div>
              </div>
              <div className="row padd-020-2">
                <div className="col-lg-6 col-md-6">
                  <button className="savebtn">Cancel</button>
                </div>
                <div className="col-lg-6 col-md-6 text-right">
                  <button className="nxtbtn" onClick={handleSave}>Allocate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
