import React from "react";
import "../../../css/adminpages.css";

export default props => {
  return (
    <div className="dash-data">
      <div className="dash-heading">
        <div className="row">
          <div className="col-lg-6">
            <h1>Welcome himanshu</h1>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <div className="dash-count">
                  <ul>
                    <li>
                      <a href="#" className="active">
                        1 month
                      </a>
                    </li>
                    <li>
                      <a href="#">2 month</a>
                    </li>
                    <li>
                      <a href="#">3 month</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash-calen">
                  <ul>
                    <li>
                      <a href="#">
                        <p className="user-label"></p>
                        <p style={{ position: "relative" }}>
                          <input
                            type="text"
                            className="datepic"
                            id="datepicker7"
                            placeholder="MM / DD / YY"
                          />
                          <i className="fa fa-calendar"></i>
                          <i className="fa fa-angle-down"></i>
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <p className="user-label"></p>
                        <p style={{ position: "relative" }}>
                          <input
                            type="text"
                            className="datepic"
                            id="datepicker8"
                            placeholder="MM / DD / YY"
                          />
                          <i className="fa fa-calendar"></i>
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="dash-boxes">
        <div className="row">
          <div className="col-lg-3">
            <div className="dash-box">
              <h5>Number of courses</h5>
              <h3>157</h3>
              <img className="dash-icon" src="/images/icons/dash-icon1.png" />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-box">
              <h5>Number of Category</h5>
              <h3>135</h3>
              <img className="dash-icon" src="/images/icons/dash-icon2.png" />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-box">
              <h5>Number of enrolments</h5>
              <h3>135</h3>
              <img className="dash-icon" src="/images/icons/dash-icon3.png" />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-box">
              <h5>Total revenue</h5>
              <h3>
                <a href="#">Click to view/hide</a>
              </h3>
              <img className="dash-icon" src="/images/icons/dash-icon4.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="recent-sec">
        <div className="row">
          <div className="col-lg-7">
            <div className="recent-box">
              <div className="row">
                <div className="col-lg-6">
                  <h3 className="recent-head">Recent orders</h3>
                </div>
                <div className="col-lg-6 text-right">
                  <button className="viewallbtn">View all</button>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order by</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Avinash verma</td>
                    <td>152.77</td>
                    <td>20-04-2020</td>
                    <td>view</td>
                  </tr>
                  <tr>
                    <td>Avinash verma</td>
                    <td>152.77</td>
                    <td>20-04-2020</td>
                    <td>view</td>
                  </tr>
                  <tr>
                    <td>Avinash verma</td>
                    <td>152.77</td>
                    <td>20-04-2020</td>
                    <td>view</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="recent-view">
              <h3 className="recent-head1">Recent reviews</h3>
              <div className="row">
                <div className="col-lg-6">
                  <img src="/images/profile-pic.png" />
                  <h3>Avinash verma</h3>
                  <p>
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star-half"></i>{" "}
                  </p>
                </div>
                <div className="col-lg-6 text-right">
                  <p>02-09-2020 04:15 PM</p>
                  <button className="gobtn">Go to courses</button>
                </div>
              </div>
              <h3>Social Science</h3>
              <p className="view-descrip">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <hr />
              <div className="row">
                <div className="col-lg-6">
                  <img src="/images/profile-pic.png" />
                  <h3>Avinash verma</h3>
                  <p>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half"></i>
                  </p>
                </div>
                <div className="col-lg-6 text-right">
                  <p>02-09-2020 04:15 PM</p>
                  <button className="gobtn">Go to courses</button>
                </div>
              </div>
              <h3>Social Science</h3>
              <p className="view-descrip">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
