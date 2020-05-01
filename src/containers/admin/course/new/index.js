import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import BasicDetails from "./components/basicDetails";
import Curriculum from "./components/curriculum";
import Dates from "./components/dates";
import Media from "./components/media";
import Price from "./components/price";
import Seo from "./components/seo";
import "../../../../css/adminpages.css"
import swal from '@sweetalert/with-react';
import { createCourse, updateCourse, saveCourse, saveThumb, getCourse } from "../actions";

const NewCourse = (props) => {
    const [current, setTab] = useState('basic');
    const [courseData, setCourse] = useState(null);
    // const [thumbFile, setThumbFile] = useState(null);
    // const [teaser, setTeaser] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const tabs = [
        { key: 'basic', value: 'Basic Detail', prev: null, next: 'curriculum' },
        { key: 'curriculum', value: 'Curriculum', prev: 'basic', next: 'dates' },
        { key: 'dates', value: 'Important Dates', prev: 'curriculum', next: 'media' },
        { key: 'media', value: 'Media', prev: 'dates', next: 'price' },
        { key: 'price', value: 'Price', prev: 'media', next: 'seo' },
        { key: 'seo', value: 'Seo', prev: 'price', next: null }
    ];

    useEffect(() => {
        let params = props.match.params;
        if (params && params.id !== "new") {
            setLoading(true);
            props.getCourse(params.id).then(res => {
                setCourse(res.result.data);
                setLoading(false);
            }).catch(err => {
                swal("Invalid Course");
                history.push("/admin/course");
            });
        }
    }, []);

    const handleBack = () => {
        history.push("/admin/course");
    }

    const handleSave = (obj, status=false) => {
        const { course } = props;
        let next = tabs.filter(i => i.key === current);
        if (course) {
            props.updateCourse(obj, course._id).then(res => {
                swal("Saved", "Updated Successfully", "success");
                if (status) {
                    if (next && next[0] && next[0].next) {
                        setTab(next[0].next);
                    } else {
                        handleBack();
                    }
                }
            }).catch(err => {
                console.log("err === ", err);
            })
        } else {
            // if (teaser) obj['teaser'] = teaser;
            props.createCourse(obj).then(res => {
                // setTeaser(null);
                // if (thumbFile) {
                //     saveThumbFile(res.result.data, thumbFile);
                // }
                swal("Saved", "Created Successfully", "success");
                if (status) {
                    if (next && next[0] && next[0].next) {
                        setTab(next[0].next);
                    } else {
                        handleBack();
                    }
                }
            }).catch(err => {
                console.log("err === ", err);
            })
        }
    }

    const saveThumbFile = (obj, file) => {
        props.saveThumb(file, obj).then(res => {
            // setThumbFile(null);
        }).catch(err => {
            console.log("err === ", err);
            // setThumbFile(null);
            swal("Please Try Again")
        })
    }

    const handleThumbFile = (file) => {
        const { course } = props;
        if (course) {
            saveThumbFile(course, file);
        }
        // else {
        //     setThumbFile(file);
        // }
    }

    const handleTeaser = (url) => {
        const { course } = props;
        if (course) {
            handleSave({ teaser: url });
        }
        // else {
        //     setTeaser(url);
        // }
    }

    const handleUpdate = (obj) => {
        const { course } = props;
        // if (thumbFile && obj.thumbnail) {
        //     setThumbFile(null);
        // } else if (teaser && obj.teaser) {
        //     setTeaser(null);
        // }
        if (course) {
            props.updateCourse(obj, course._id).then(res => {
                swal("Success", "Updated Successfully", "success");
            }).catch(err => {
                console.log("err === ", err);
            })
        }
    }

    return <div className="dash-data">
        <div className="courses-strip">
            <div className="flexible">
                <div className="course-side">
                    <img src="/images/icons/course-icon.png" /> Add new courses
          </div>
                <div className="addnew">
                    <button onClick={handleBack}><i className="fa fa-plus"></i> Back to courses list</button>
                </div>
            </div>
        </div>
        <div className="course-title">

            <ul className="tab-nav">
                {/*<span className="bottom-border"></span>*/}
                {tabs.map(item => <li key={item.key} className={current === item.key ? "tab-nav__item active" : "tab-nav__item"}><a onClick={() => setTab(item.key)}>{item.value}</a></li>)}
            </ul>
            <div className="form-sec">

                {current === "basic" && <BasicDetails saveCallback={handleSave} course={props.course ? props.course : courseData} />}

                {current === "curriculum" && <Curriculum setTab={(value) => setTab(value)} />}

                {current === "dates" && <Dates />}

                {current === "media" && <Media thumbFileUpload={handleThumbFile} teaserUpload={handleTeaser} course={props.course} nextCallback={(value) => setTab(value)} updateDetails={handleUpdate} />}

                {current === "price" && <Price saveCallback={handleSave} course={props.course} nextCallback={(value) => setTab(value)} />}

                {current === "seo" && <Seo saveCallback={handleSave} course={props.course} />}

            </div>
        </div>
    </div>

}

const mapStateToProps = (state) => {
    return { course: state.admincourse.courseData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCourse: (obj) => (dispatch(createCourse(obj))),
        updateCourse: (obj, id) => (dispatch(updateCourse(obj, id))),
        saveThumb: (file, obj) => (dispatch(saveThumb(file, obj))),
        getCourse: (id) => (dispatch(getCourse(id)))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCourse);