import React, { useState } from "react";
import Loading from "../../../../common/loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default props => {

  const [data, setData] = useState({ name: "", startDate: new Date(), endDate: new Date(), mode: "event", location: "" })

  const handleChange = (name, value) => {
    setData(prevState => { return { ...prevState, [name]: value } });
  };

  return (
    <div className="tabdb active">
      <div className="setting">
        <form>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" required="required" />
                <label for="input" className="control-label">
                  School
            </label>
                <i className="bar"></i>
              </div>
            </div>
            <div className="flexible emc mb-20 col-lg-12">

              <div className="row">
                <div className="col-lg-12">
                  <p className="user-label mt-20">Dates Attented (Optional)</p>
                </div>
                <div className="col-lg-6">
                  <DatePicker
                    dateFormat="MM/dd/yy"
                    minDate={new Date()}
                    selected={data.startDate}
                    onChange={(date) => handleChange("startDate", date)}
                    className="datepic hasDatepicker"
                  />
                  {/* <p style="position: relative;"><input type="text" className="datepic hasDatepicker" id="datepicker11" placeholder="MM / DD / YY" />
                            <i className="fa fa-calendar"></i>
                        </p> */}
                </div>
                <div className="col-lg-6">
                  <DatePicker
                    dateFormat="MM/dd/yy"
                    minDate={new Date()}
                    selected={data.endDate}
                    onChange={(date) => handleChange("endDate", date)}
                    className="datepic hasDatepicker"
                  />
                  {/* <p style="position: relative;"><input type="text" className="datepic hasDatepicker" id="datepicker12" placeholder="MM / DD / YY" />
                            <i className="fa fa-calendar"></i>
                        </p> */}
                </div>
              </div>
            </div>

            <div className="col-lg-12 mb-20">
              <p className="user-label">Degree (Optional)</p>
              <select className="nice-select" name="targetUser">
                <option value="" data-display="Select" className="list option selected focus">Nothing</option>
                <option value="1" className="list option">val 1</option>
                <option value="2" className="list option">val 2</option>
                <option value="4" className="list option">val 3</option>
              </select>
            </div>
            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" required="required" />
                <label for="input" className="control-label">
                  Area of Study (Optional)
            </label>
                <i className="bar"></i>
              </div>
            </div>
            <div className="col-lg-12">
              <p className="user-label">Description (Optional)</p>
              <textarea className="form-control" placeholder="Course Introduction" value="" ></textarea>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <button className="savebtn">Save</button>
            </div>
            <div className="col-lg-6 col-md-6 text-right">
              <button className="nxtbtn">Next</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};
