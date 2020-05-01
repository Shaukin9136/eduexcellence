import React, { Fragment } from "react";
import BannerCarousel from './components/bannercarousel';
import Achieves from './components/achieves';
import TeachStu from './components/teachstu';
import OurCourses from './components/ourcourses';
import Events from './components/events';
import Testimonial from './components/testimonial';
import StripCarousel from './components/stripcarousel';
import SchoolPartners from './components/schoolpartners';
import "../../css/landingpage.css"


export default (props) => {

    return <Fragment>
        <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <h1>Built your future.
                                <br /> join us today
                            </h1>
                            <p>With over 200 courses in 14 subjects, you're guaranteed to find something that's right for you.</p>
                            <div className="button-wrapper flexible2">
                                <p>
                                    <button className="all-courses">View All Courses</button>
                                </p>
                                <a href="#videoss" className="video-play-button">
                                    <span></span>
                                    <small className="work">How It Work</small>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="owl-slider">
                            <BannerCarousel />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="achieve">
            <div className="container">
                <Achieves />
            </div>
        </section>

        <section className="teach-stu">
            <div className="container">
                <h5>We have courses for everyone</h5>
                <h3>Please identify yourself</h3>
                <TeachStu />
            </div>
        </section>

        <section className="ourcourses">
            <OurCourses />
        </section>

        <section className="event">
            <div className="container">
                <h5>Events</h5>
                <h3>Upcoming Education Events to feed your brain</h3>
                <Events />
            </div>
        </section>

        <section className="uniqueness">
            <div className="container">
                <h5>UNIQUENESS</h5>
                <h3>Why eduExcellence?</h3>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="uniqe-img">
                            <img src="images/unique-img.png" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="ub">
                            <li>
                                <div className="unique-box">
                                    <p>
                                        <img src="images/icons/u1.png" alt="" />
                                    </p>
                                    <h4>Unlimited Access</h4>
                                    <p>The lysine contingency it’s intended to prevent the spread of the animals is case they ever</p>
                                </div>
                            </li>
                            <li>
                                <div className="unique-box">
                                    <p>
                                        <img src="images/icons/u2.png" alt="" />
                                    </p>
                                    <h4>Unlimited Access</h4>
                                    <p>The lysine contingency it’s intended to prevent the spread of the animals is case they ever</p>
                                </div>
                            </li>
                            <center>
                                <li>
                                    <div className="unique-box">
                                        <p>
                                            <img src="images/icons/u3.png" alt="" />
                                        </p>
                                        <h4>Unlimited Access</h4>
                                        <p>The lysine contingency it’s intended to prevent the spread of the animals is case they ever</p>
                                    </div>
                                </li>
                            </center>
                        </ul>
                    </div>
                </div>
                <p>
                    <button className="become-part" id="videoss">Become a Member</button>
                </p>

                <div className="guid">
                    <h5>GUIDE</h5>
                    <h3>How It Work</h3>
                    <ul>
                        <li>
                            <h6>Coursework</h6>
                            <span>The lysine contingency it’s intended to prevent the pread of the animals is case they ever got off the island.
              Dr. Wu inserted.</span>
                        </li>
                        <li>
                            <h6>Help & Support</h6>
                            <span>The lysine contingency it’s intended to prevent the pread of the animals is case they ever got off the island.
              Dr. Wu inserted.</span>
                        </li>
                        <li>
                            <h6>Certificates</h6>
                            <span>The lysine contingency it’s intended to prevent the pread of the animals is case they ever got off the island.
              Dr. Wu inserted.</span>
                        </li>
                    </ul>

                    <div className="video-part">
                        <img src="images/vdeo-img.png" alt="" />
                    </div>

                </div>

            </div>
        </section>

        <section className="testimonial">
            <div className="container">
                <div className="hero is-info">
                    <div className="hero-body">
                        <div className="container">
                            <h5>The Best In Our</h5>
                            <h3>Our Testimonials</h3>
                            <div id="customers-testimonials">
                                <Testimonial />
                            </div>
                        </div>
                    </div>
                    <div className="hero-foot">
                    </div>
                </div>
            </div>
        </section>

        <section className="reach">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">

                        <div className="tab-content">
                            <div id="world" className="container tab-pane active">
                                <img className="world-map mt-86" src="images/world-map.png" width="100%" alt="" />
                            </div>
                            <div id="india" className="container tab-pane fade">
                                <img className="india-map mt-86" src="images/india-map.png" width="100%" alt="" />
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3">
                        <div className="ourreach">
                            <h3>Our Reach</h3>
                            <div className="reach-box">
                                <ul>
                                    <li>
                                        <a data-toggle="tab" href="#india">National</a>
                                    </li>
                                    <li className="active">
                                        <a data-toggle="tab" href="#world">International</a>
                                    </li>
                                </ul>
                                <p>
                                    <img src="images/icons/reach1.png" alt="" />
                                    <big>180+</big>
                                    <span>Schools</span>
                                </p>
                                <p>
                                    <img src="images/icons/reach2.png" alt="" />
                                    <big>8</big>
                                    <span>Countries</span>
                                </p>
                                <p>
                                    <img src="images/icons/reach3.png" alt="" />
                                    <big>15</big>
                                    <span>International Cities</span>
                                </p>
                                <p>
                                    <img style={{ "paddingBottom": "20px" }} src="images/icons/reach4.png" alt="" />
                                    <big>10</big>
                                    <span>Inter. study visits for school leaders</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="strip-slider">
            <div className="container">

                <div id="strip-carousel">
                    <StripCarousel />
                </div>
            </div>
        </section>

        <section className="blog-sec">
            <div className="container">
                <h3>Our School Partners</h3>
                <div id="blog-carousel">
                    <SchoolPartners />
                    {/* <div className="item">
                        <div className="blog-card">
                            <img src="images/blog1.png" alt="" />
                            <h4>Acharya Narendra Dev College</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="blog-card">
                            <img src="images/blog2.png" alt="" />
                            <h4>Delhi College of Arts & Commerce</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="blog-card">
                            <img src="images/blog3.png" alt="" />
                            <h4>Atma Ram Sanatan Dharma College</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="blog-card">
                            <img src="images/blog4.png" alt="" />
                            <h4>Aditi Mahavidyalaya</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="blog-card">
                            <img src="images/blog1.png" alt="" />
                            <h4>Acharya Narendra Dev College</h4>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
    </Fragment>
}
