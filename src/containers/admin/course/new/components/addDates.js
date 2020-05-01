import React, { useState, Fragment, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from '@sweetalert/with-react';
var moment = require('moment');

export default (props) => {
    const [data, setData] = useState({ name: "", startDate: new Date(), endDate: new Date(), mode: "event", location: "" })

    useEffect(() => {
        if (props.data) {
            let obj = {
                name: props.data.name,
                startDate: new Date(props.data.startDate),
                endDate: new Date(props.data.endDate),
                mode: props.data.mode ? props.data.mode : 'event',
                location: props.data.location
            }
            setData(obj);
        }
    }, [props.data])

    const handleChange = (name, value) => {
        setData(prevState => { return { ...prevState, [name]: value } });
    };

    const handleSave = () => {
        let _data = {
            mode: data.mode
        };

        if (data.name !== "") {
            _data['name'] = data.name;
        } else {
            swal("Please Enter the Name");
            return;
        }

        if (data.startDate !== "") {
            _data['startDate'] = moment(data.startDate).valueOf();
        } else {
            swal("Please Select the Start Date");
            return;
        }

        if (data.endDate !== "") {
            _data['endDate'] = moment(data.endDate).valueOf();
        } else {
            swal("Please Select the End Date");
            return;
        }

        if (data.location !== "") {
            _data['location'] = data.location;
        } else {
            swal("Please Enter the Location");
            return;
        }
        props.saveCallback(_data);
    }

    return <Fragment>
        <div className="row padd-020">
            <div className="col-lg-6">
                <p className="user-label">Phase Name</p>
                <input type="text" className="course-search" placeholder="Type phase name here" value={data.name} onChange={(e) => handleChange('name', e.target.value)} />
                <br /><br />
                <div className="flexible emc">
                    <div>
                        <p className="user-label">Start Date</p>
                        <DatePicker
                            showTimeSelect
                            timeFormat="hh:mm"
                            timeCaption="time"
                            dateFormat="MM/dd/yy hh:mm aa"
                            minDate={new Date()}
                            selected={data.startDate}
                            onChange={(date) => handleChange("startDate", date)}
                            className="datepic hasDatepicker"
                        />
                        {/* <p style="position: relative;"><input type="text" className="datepic hasDatepicker" id="datepicker11" placeholder="MM / DD / YY" />
                            <i className="fa fa-calendar"></i>
                        </p> */}
                    </div>
                    <div>
                        <p className="user-label">End Date</p>
                        <DatePicker
                            showTimeSelect
                            timeFormat="hh:mm"
                            timeCaption="time"
                            dateFormat="MM/dd/yy hh:mm aa"
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
                <br /><br />
                <p className="user-label">Mode</p>
                <div className="mycheck">
                    <ul className="list">
                        <li className="list__item">
                            <label className="label--radio">
                                <input type="radio" className="radio" name="foo" value="event" onChange={(e) => handleChange('mode', e.target.value)} checked={data.mode === "event"} />
                                Event
                            </label>
                        </li>
                        <li className="list__item">
                            <label className="label--radio">
                                <input type="radio" className="radio" name="foo" value="live" onChange={(e) => handleChange('mode', e.target.value)} checked={data.mode === "live"} />
                                Live
                            </label>
                        </li>
                    </ul>
                </div>
                <p className="user-label mt-22">Location</p>
                <input type="text" className="course-search" placeholder="Type address / online here" value={data.location} onChange={(e) => handleChange('location', e.target.value)} />
            </div>
        </div>
        <br /><br />
        <hr />
        <div className="row padd-020">
            <div className="col-lg-6 col-md-6">
                <button className="savebtn" onClick={handleSave}>Save</button>
            </div>
            <div className="col-lg-6 col-md-6 text-right">
                <button className="nxtbtn" onClick={handleSave}>Next</button>
            </div>
        </div>
    </Fragment>
}