import React, { useState, Fragment, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from '@sweetalert/with-react';
var moment = require('moment');

const time_slots = [
    { key: "00:00", value: "12:00 PM" },
    { key: "01:00", value: "01:00 PM" },
    { key: "02:00", value: "02:00 PM" },
    { key: "03:00", value: "03:30 PM" },
    { key: "04:00", value: "04:00 PM" },
    { key: "05:00", value: "05:00 PM" },
    { key: "06:00", value: "06:00 PM" },
    { key: "07:00", value: "07:00 PM" },
    { key: "08:00", value: "08:00 PM" },
    { key: "09:00", value: "09:00 PM" },
    { key: "10:00", value: "10:00 PM" },
    { key: "11:00", value: "11:00 PM" },
    { key: "12:00", value: "12:00 AM" },
    { key: "13:00", value: "01:00 AM" },
    { key: "14:00", value: "02:00 AM" },
    { key: "15:00", value: "03:00 AM" },
    { key: "16:00", value: "04:00 AM" },
    { key: "17:00", value: "05:00 AM" },
    { key: "18:00", value: "06:00 AM" },
    { key: "19:00", value: "07:00 AM" },
    { key: "20:00", value: "08:00 AM" },
    { key: "21:00", value: "09:00 AM" },
    { key: "22:00", value: "10:00 AM" },
    { key: "23:00", value: "11:00 AM" },


]

export default (props) => {
    const [data, setData] = useState({ title: "", description: "", mode: "offline", source: "", notes: "", assignment: "", isActive: true })
    const [event, setEvent] = useState({ type: "single" });
    const [livedate, setLiveDate] = useState(new Date());
    const [multidate, setMultiDate] = useState(new Date());
    const [liveTime, setLiveTime] = useState({ st: "", ed: "" });
    const [multiTime, setMultiTime] = useState({ st: "", ed: "" });
    const [resources, setResources] = useState(null);
    const [chapterImage, setImage] = useState(null);

    const modes = [
        { key: "offline", value: "Offline" },
        { key: "live", value: "Live" },
        { key: "event", value: "Event" }
    ]

    useEffect(() => {
        if (props.item) {
            const { item } = props;
            let obj = {
                title: item.title ? item.title : '',
                description: item.description ? item.description : '',
                mode: item.mode ? item.mode : '',
                source: item.source ? item.source : '',
                notes: item.notes ? item.notes : '',
                assignment: item.assignment ? item.assignment : '',
            }
            setEvent(prevState => { return {type: item.type} });
            setData(obj);
        }
        setResources(null);
        setImage(null);
    }, [props.item]);

    const handleChange = (name, value) => {
        setData(prevState => { return { ...prevState, [name]: value } });
    };

    const handleEvent = (name, value) => {
        setEvent(prevState => { return { ...prevState, [name]: value } });
    }

    // const handleRadio = (name, value) => {
    //     event.stopPropagation();
    //     setData(prevState => {return {...prevState, [event.currentTarget.name]: event.currentTarget.value }});
    // };

    const handleLiveTime = (name, value) => {
        setLiveTime(prevState => { return { ...prevState, [name]: value } });
    }

    const handleMultiTime = (name, value) => {
        setMultiTime(prevState => { return { ...prevState, [name]: value } });
    }

    const handleSave = () => {
        let _data = {};
        for (let key in data) {
            if (data[key] !== "") {
                _data[key] = data[key];
            }
        }
        _data['schedule'] = [];
        if (data.mode === "live" || data.mode === "event") {
            if (liveTime.st !== "" && liveTime.ed !== "") {
                // console.log("liveTime === ", liveTime);
                let date = moment(livedate).format("mm/dd/yyyy");
                _data['schedule'].push({
                    startTime: moment(date + " " + liveTime.st, "mm/dd/yyyy HH:mm").valueOf(),
                    endTime: moment(date + " " + liveTime.ed, "mm/dd/yyyy HH:mm").valueOf()
                })
            }

            if (data.mode === "event" && event.type === "multiple" && multiTime.st !== "" && multiTime.ed !== "") {
                let date = moment(multidate).format("mm/dd/yyyy");
                _data['schedule'].push({
                    startTime: moment(date + " " + multiTime.st, "mm/dd/yyyy HH:mm").valueOf(),
                    endTime: moment(date + " " + multiTime.ed, "mm/dd/yyyy HH:mm").valueOf()
                })
            }
        }

        if (data.mode === "event") {
            _data['type'] = event.type;
        }
        props.saveCallback(_data, resources, chapterImage);
    }

    const handleResourseFiles = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let files = e.target.files;
            let _files = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    if (!(/\.(exe|html)$/i.test(files[i].name))) {
                        _files.push(files[i]);
                    }
                }
            }
            setResources(_files);
        }
    }

    const handleChapterFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            if (!(/\.(exe|html)$/i.test(file.name)) && (/\.(jpe?g|png|gif)$/i.test(file.name))) {
                setImage(file);
            } else {
                // alert("Invalid File Format")
                swal("Warning", "Invalid File Format", "error")
            }
        }
    }

    return (<Fragment>
        <div className="row padd-020">
            <div className="col-lg-6">
                <p className="user-label">Chapter Name</p>
                <input type="text" className="course-search" placeholder="Type chapter name here" name="title" onChange={(e) => handleChange('title', e.target.value)} value={data.title} />
                <p className="user-label mt-22">Mode</p>
                <div className="mycheck">
                    <ul className="list">
                        {modes.map(item => <li className="list__item" key={item.key}>
                            <label className="label--radio off-rti">
                                <input type="radio" className="radio" value={item.key} name="mode" onChange={(e) => handleChange('mode', e.target.value)} checked={item.key === data.mode} />
                                {item.value}
                            </label>
                        </li>)}
                    </ul>
                </div>
                <input type="text" className="course-search" placeholder="Enter vimeo link here" name="link" onChange={(e) => handleChange('source', e.target.value)} value={data.link} />
            </div>
            <div className="col-lg-6">
                <p className="user-label">Description</p>
                <textarea className="form-control mt-10" placeholder="Type description here" name="description" onChange={(e) => handleChange('description', e.target.value)} value={data.description}></textarea>
            </div>
        </div>
        <div className="padd-020 offline-sec">
            {data.mode === "live" || data.mode === "event" ? <Fragment>
                {data.mode === "event" && <div className="event-sec">
                    <div className={event.type === "multiple" ? "taeb-switch right text-center" : "taeb-switch left text-center"}>
                        <div className={event.type === "single" ? "taeb single-day active" : "taeb multi-day"} taeb-direction="left" onClick={() => handleEvent('type', 'single')}>Single Day</div>
                        <div className={event.type === "multiple" ? "taeb single-day active" : "taeb multi-day"} taeb-direction="right" onClick={() => handleEvent('type', 'multiple')}>Multiple Day</div>
                    </div>
                    <p className="user-label">Venue</p>
                    <input type="text" className="course-search" placeholder="Shahdra near metro abc" />
                    <br />
                </div>}
                <div className="resec" >
                    <br />
                    {props.item && props.item.image && props.item.image !== '' ?
                        <p>{props.item.image}</p>
                    : null}
                    <p className="user-label">Upload image</p>
                    <input type="file" id="file" onChange={handleChapterFile} />
                    <label htmlFor="file" className="btn-2"></label>
                    <div className="flexible" style={{ "justifyContent": "flex-start" }}>
                        <div style={{ marginRight: "27px" }}>
                            <p className="user-label">Date</p>
                            <DatePicker
                                dateFormat="MM/dd/yy"
                                minDate={new Date()}
                                selected={livedate}
                                onChange={(date) => setLiveDate(date)}
                                className="datepic"
                            />
                            {/* <p style="position: relative;">
                                <input type="text" className="datepic" id="datepicker2" placeholder="MM / DD / YY" />
                                <i className="fa fa-calendar"></i>
                            </p> */}
                        </div>
                        <div>
                            <p className="user-label">Start Time</p>
                            <select className="nice-select" onChange={(e) => handleLiveTime("st", e.target.value)}>
                                <option data-display="Select" value="" className="option selected focus">Nothing</option>
                                {time_slots.map((item, index) => <option key={"st" + index} value={item.key} className="option focus">{item.value}</option>)}
                            </select>
                        </div>
                        <div>
                            <p className="user-label">End Time</p>
                            <select className="nice-select" onChange={(e) => handleLiveTime("ed", e.target.value)}>
                                <option data-display="Select" value="" className="option selected focus">Nothing</option>
                                {time_slots.map((item, index) => <option key={"ed" + index} value={item.key} className="option focus">{item.value}</option>)}
                            </select>
                        </div>
                    </div>
                    {data.mode === "event" && event.type === "multiple" && <Fragment>
                        <br />
                        <div className="flexible" style={{ "justifyContent": "flex-start" }}>
                            <div>
                                <p className="user-label">Date</p>
                                <DatePicker
                                    dateFormat="MM/dd/yy"
                                    minDate={new Date()}
                                    selected={multidate}
                                    onChange={(date) => setMultiDate(date)}
                                    className="datepic"
                                />
                                {/* <p style="position: relative;"><input type="text" className="datepic" id="datepicker4" placeholder="MM / DD / YY" />
                                    <i className="fa fa-calendar"></i>
                                </p> */}
                            </div>
                            <div>
                                <p className="user-label">Start Time</p>
                                <select className="nice-select" onChange={(e) => handleMultiTime("st", e.target.value)}>
                                    <option data-display="Select" value="" className="option selected focus">Nothing</option>
                                    {time_slots.map((item, index) => <option key={"st" + index} value={item.key} className="option focus">{item.value}</option>)}
                                </select>
                            </div>
                            <div>
                                <p className="user-label">End Time</p>
                                <select className="nice-select" onChange={(e) => handleMultiTime("ed", e.target.value)}>
                                    <option data-display="Select" value="" className="option selected focus">Nothing</option>
                                    {time_slots.map((item, index) => <option key={"ed" + index} value={item.key} className="option focus">{item.value}</option>)}
                                </select>
                            </div>
                        </div>
                    </Fragment>
                    }
                </div>
            </Fragment> : null}

            <br />
            <p className="user-label">Notes</p>
            <textarea className="form-control mt-10" placeholder="Course notes" name="notes" onChange={(e) => handleChange('notes', e.target.value)} value={data.notes}></textarea>
            <br />
            <p className="user-label">Resources</p>
            {props.item && props.item.documents ?
                props.item.documents.map(doc => <p key={doc._id}>{doc.name}</p>)
            : null}
            <input type="file" id="file" onChange={handleResourseFiles} multiple />
            <label htmlFor="file" className="btn-2">upload</label>
            <br />
            <p className="user-label">Assignment</p>
            <textarea className="form-control mt-10" placeholder="Assignment" name="assignment" onChange={(e) => handleChange('assignment', e.target.value)} value={data.assignment}></textarea>
        </div>

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

    )
}