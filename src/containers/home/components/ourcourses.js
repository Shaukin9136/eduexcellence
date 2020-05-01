import React, { useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const types = [
    { value: "Teacher", path: "#" },
    { value: "Student", path: "#" }
]

const courses = [
    { value: "Pre School", path: "preschool" },
    { value: "Junior", path: "junior" },
    { value: "Middle", path: "middle" },
    { value: "Senior", path: "senior" }
]

const preschools = [
    { value: "All", path: "all" },
    { value: "Social Science", path: "sscience" },
    { value: "Mathematics", path: "mathematics" },
    { value: "Art", path: "art" },
    { value: "Science", path: "science" },
    { value: "Music", path: "music" },
    { value: "Technology", path: "technology" }
]

export default (props) => {
    const [type, setType] = useState("Teacher");
    const [course, setCourse] = useState("preschool");
    const [preschool, setPreSchool] = useState("all");


    return <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <div className="ourcourses-head">
                    <h3>Our Courses</h3>
                    <ul className="pull-right">
                        {types.map(item => <li key={"types" + item.value}>
                            <a className={item.value === type ? "active" : ""} href="#">{item.value}</a>
                        </li>)}
                    </ul>
                </div>
            </div>
            <div className="col-lg-9">
                <div className="ourcourses-cont">
                    <ul>
                        {courses.map(item => <li key={"courses" + item.value}>
                            <a className={item.path === course ? "active" : ""} data-toggle="tab" href={"#" + item.path}>{item.value}</a>
                        </li>)}
                    </ul>

                    <div className="tab-content">
                        <div id={course} className="container tab-pane active tabbing1">

                            <ul className="innerul">
                                {preschools.map(item => <li className={item.path === preschool ? "active" : ""} key={course+item.path}>
                                    <a data-toggle="tab" href={"#" + item.path}>{item.value}</a>
                                </li>)}
                            </ul>
                            {/* Tab panes */}
                            <div className="tab-content">
                                <div id={preschool} className="container tab-pane active">
                                    <div className="carousel-wrap2">
                                        <div className="courses-slider">
                                            <OwlCarousel
                                                className="owl-carousel"
                                                items={3}
                                                loop={true}
                                                margin={10}
                                                nav
                                                autoplay={true}
                                            >
                                        
                                            {[1, 2, 3].map(item => <div className="item" key={preschool + item}>
                                                <div className="course-card">
                                                    <div className="card-img">
                                                        <img src="images/course1.png" />
                                                        <div className="card-overlay">
                                                            <div className="strip">Senior Section</div>
                                                            <p>
                                                                <button className="detailbtn">View Detail</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="course-card-body">
                                                        <button className="basicbtn">Social</button>
                                                        <h4>Political Science</h4>
                                                        <p>The lysine contingency it’s intended to prevent the <a href="#">Read More</a></p>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <p>
                                                                    <i className="fa fa-user"></i> 22 &nbsp; &nbsp;
                                                                    <i className="fa fa-star"></i> 5
                                                                </p>
                                                                <small>For Teachers</small>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <button className="inr">
                                                                    <i className="fa fa-inr"></i> 599</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                            </OwlCarousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Tab content end --> */}
                </div>
            </div>
        </div>
    </div>

}