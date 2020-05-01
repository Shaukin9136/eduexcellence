import React, { useState, Fragment, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../css/adminpages.css"
import swal from '@sweetalert/with-react';
var moment = require('moment');

export default (props) => {
    const [type, setType] = useState('');
    const [free, setFree] = useState({ mode: "forever", until: new Date() });
    const [price, setPrice] = useState(0);
    const [discount, setdiscount] = useState({ mode: "upto", discountedPrice: 0, until: new Date() });
    const [perc, setPerc] = useState(0);
    const toggleEl = useRef(null);

    useEffect(() => {
        if (props.course && props.course.pricing) {
            const { pricing } = props.course;
            console.log("pricing === ", pricing);
            let _type = pricing.free ? 'F' : pricing.discount ? 'D' : '';
            setType(_type);
            let free_obj = {};
            let discount_obj = {
                discountedPrice: pricing.discountedPrice || 0
            }
            if (pricing.freeUntil) {
                free_obj["mode"] = "until";
                free_obj["until"] = moment(pricing.freeUntil, "x");
            } else {
                free_obj["mode"] = "forever";
            }

            if (pricing.discountUntil) {
                discount_obj["mode"] = "upto";
                discount_obj["until"] = moment(pricing.discountUntil, "x");
            } else {
                discount_obj["mode"] = "allways";
            }
            console.log(free_obj, discount_obj);

            pricing.price && setPrice(pricing.price);
            setFree(prevState => { return free_obj });
            setdiscount(prevState => { return discount_obj });
        }
    }, [props.course]);

    useEffect(() => {
        handlePercentage();
    }, [price, discount.discountedPrice])

    const handleChange = (name, value) => {
        setdiscount(prevState => { return { ...prevState, [name]: value } })
    }
    const handleSave = () => {
        console.log(moment(free.until).format("mm/dd/yyyy hh:mm A"))
        if (price !== "" && price !== 0 && price !== "0") {
            let obj = {
                free: type === "F",
                discount: type === "D",
                price: Number(price)
            }
            if (type === "F" && free.mode === "until") obj['freeUntil'] = moment(free.until).valueOf();

            if (type === "D") {
                obj['discountedPrice'] = discount.discountedPrice;
                if (discount.mode === "upto") obj['discountUntil'] = moment(discount.until).valueOf();
            }
            props.saveCallback({ pricing: obj });
        } else {
            swal("Please enter Course Price");
        }
    }

    const handleType = (val) => {
        if (type !== val) {
            setType(val);
        } else {
            setType('');
        }
    }

    const handlePercentage = () => {
        if (toggleEl && toggleEl.current && toggleEl.current.checked) {
            if (price > 0 && discount.discountedPrice > 0) {
                let p = ((price - discount.discountedPrice) * 100) / price;
                console.log(p);
                setPerc(p);
            } else {
                setPerc(0);
            }
        } else {
            setPerc(0);
        }
    }

    return <div className="tabdb active" data-tab="#price">
        <div className="price-sec">
            <input type="checkbox" id="box-1" onChange={() => handleType('F')} checked={type === "F"} />
            <label htmlFor="box-1" className="free-course">Check if this is a free course</label>

            {type === "F" && <p>
                <button className={free.mode === "forever" ? "btn btn-success" : "btn btn-default"} onClick={() => setFree(prevState => { return { ...prevState, mode: "forever" } })}>Forever</button> or
                <button className={free.mode === "until" ? "btn btn-success" : "btn btn-default mglt16"} onClick={() => setFree(prevState => { return { ...prevState, mode: "until" } })}>Free till</button>
                {free.mode === "until" && <DatePicker
                    showTimeSelect
                    timeFormat="hh:mm"
                    timeCaption="time"
                    dateFormat="MM/dd/yy hh:mm aa"
                    minDate={new Date()}
                    selected={free.until}
                    onChange={(date) => setFree(prevState => { return { ...prevState, until: date } })}
                    className="datepic"
                />}
            </p>}
            <p className="user-label mt-40">Course Price</p>
            <input type="text" className="course-price-input" placeholder="$1500" value={price} onChange={(e) => setPrice(e.target.value)} />

            <input type="checkbox" id="box-2" onChange={() => handleType('D')} checked={type === "D"} />
            <label className="dis-label" htmlFor="box-2">Check if this is a discounted course</label>
            <p className="user-label mt-40">Discounted Price</p>
            <input type="text" className="course-price-input" placeholder="$700" onChange={(e) => handleChange("discountedPrice", e.target.value)} />
            {type === "D" && <Fragment>
                <div className="yn-toggle">
                    <p className="display-dis">Display <input type="checkbox" className="toggle" id="toggle" ref={toggleEl} onChange={(e) => handlePercentage()} />
                        <label htmlFor="toggle">
                            <span className="on">On</span>
                            <span className="off">Off</span>
                        </label>
                        <small style={{ marginLeft: "6px", marginRight: "6px" }}>this course has <span>{perc.toFixed(2)}%</span> discount</small>
                    </p>
                </div>
                <div className="period">
                    <p className="user-label mt-40">Discounted Price</p>
                    <ul className="list">
                        <li className="list__item">
                            <label className="label--radio">
                                <input type="radio" className="radio" name="discount" onChange={() => setdiscount(prevState => { return { ...prevState, mode: "allways" } })} checked={discount.mode === "allways"} />
                                Always
                            </label>
                        </li>
                        <li className="list__item">
                            <label className="label--radio">
                                <input type="radio" className="radio" name="discount" onChange={() => setdiscount(prevState => { return { ...prevState, mode: "upto" } })} checked={discount.mode === "upto"} />
                                Up to
                            </label>
                        </li>
                        <li>
                            {discount.mode === "upto" && <DatePicker
                                showTimeSelect
                                timeFormat="hh:mm"
                                timeCaption="time"
                                dateFormat="MM/dd/yy hh:mm aa"
                                minDate={new Date()}
                                // minTime={moment().format("hh:mm A")}
                                selected={discount.until}
                                onChange={(date) => setdiscount(prevState => { return { ...prevState, until: date } })}
                                className="datepic"
                            />}
                            {/* <p style={{ "position": "relative" }}><input type="text" className="datepic hasDatepicker" id="datepicker5" placeholder="MM / DD / YY" />
                                <i className="fa fa-calendar"></i>
                            </p> */}
                        </li>
                    </ul>
                </div>
            </Fragment>}
        </div>
        <br />
        <br />
        <hr />
        <div className="row padd-020">
            <div className="col-lg-6 col-md-6">
                <button className="savebtn" onClick={handleSave}>Save</button>
            </div>
            <div className="col-lg-6 col-md-6 text-right">
                <button className="nxtbtn" onClick={() => props.nextCallback('seo')}>Next</button>
            </div>
        </div>
    </div>
}