import React, { useRef, useEffect, useState, Fragment } from "react";
import ReactPlayer from 'react-player'
import swal from '@sweetalert/with-react';

export default (props) => {

    const thumbEl = useRef(null);
    const [teaser, setTeaser] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {

        if (props.course) {
            const { course } = props;
            if (course.thumbnail && course.thumbnail !== '') {
                thumbEl.current.src = course.thumbnail;
            } else {
                thumbEl.current.src = "/images/upload-thumb.png";
            }
            if (course.teaser && course.teaser !== '') {
                setTeaser(course.teaser);
            }
        }
    }, [props.course]);

    // const handleSaveTeaser = () => {
    //     let myurl = urlEl.current.value;
    //     console.log("myurl === ", myurl);
    //     if (/https:\/\/vimeo.com\/\d{8,9}(?=\b|\/)/.test(myurl)) {
    //         setTeaser(myurl);
    //     } else {
    //         alert("Invalid URL");
    //     };
    // }

    const onSelectFile = (e) => {
        /*e.preventDefault();*/
        if (e.target.files && e.target.files.length > 0) {
            let _file = e.target.files[0];
            // console.log("file === ", file);
            if (_file) {
                if (!(/\.(exe|html)$/i.test(_file.name)) && (/\.(jpe?g|png|gif)$/i.test(_file.name))) {
                    // if (file.size > 104857600) {
                    //     this.container.warning(`File upto 100MB allowed`, ``);
                    // } else {

                    let reader = new FileReader();
                    reader.onloadend = (e) => {
                        thumbEl.current.src = reader.result;
                        setFile(_file);
                    }
                    reader.readAsDataURL(_file);
                    // }
                } else {
                    swal("Error", "Invalid file format", "error");
                }
            }
        }
    }

    const handleSave = () => {
        if (props.course) {
            if (teaser && teaser !== '') {
                if (/https:\/\/vimeo.com\/\d{8,9}(?=\b|\/)/.test(teaser)) {
                    props.teaserUpload(teaser);
                } else {
                    swal("Error", "Invalid URL", "error");
                    return;
                };
            }
            if (file) {
                props.thumbFileUpload(file);
            }
        } else {
            swal("warning", "Create Course First", "info");
        }
    }

    const handleTeaserDel = () => {
        let obj = {
            teaser: ""
        }
        props.updateDetails(obj);
    }

    const handleTumbDel = () => {
        let obj = {
            thumbnail: ""
        }
        props.updateDetails(obj);
    }

    return <div className="tabdb active" data-tab="#media">
        <div className="media-sec">
            <div className="row">
                <div className="col-lg-6">
                    <div className="upload-thumb">
                        <p className="heading">Upload Thumb</p>
                        <input type="file" id="file" onChange={onSelectFile} />
                        <label htmlFor="file" className="btn-2">upload</label>
                        <img ref={thumbEl} src="/images/upload-thumb.png" alt="icon" />
                        {props.course && props.course.thumbnail && props.course.thumbnail !== '' && <p><a href="#">Change</a> &nbsp; | &nbsp; <a onClick={handleTumbDel}>Delete</a></p>}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="upload-thumb">
                        <p className="heading">Upload Teaser</p>
                        <div className="media-teaser-btn">
                            <input type="text" className="course-price-input" placeholder="Vimeo url" onChange={(e) => setTeaser(e.target.value)}/>
                            {/* <button className="savebtn" onClick={handleSaveTeaser}>Save</button> */}
                        </div>

                        {/*<input type="file" id="file" />
                        <label htmlFor="file" className="btn-2">upload</label>*/}
                        {teaser ?
                            <Fragment>
                                <ReactPlayer
                                    url={teaser}
                                    // config={{
                                    //     youtube: {
                                    //         playerVars: { showinfo: 1 }
                                    //     },
                                    //     facebook: {
                                    //         appId: '12345'
                                    //     }
                                    // }}
                                    width={418}
                                    height={209}
                                    controls
                                />
                                <p><a href="#">Change</a> &nbsp; | &nbsp; <a onClick={handleTeaserDel}>Delete</a></p>
                            </Fragment>
                            : <img src="/images/video-img.png" alt="video" />}
                    </div>
                </div>
            </div>
        </div>
        <br />
        <br />
        <hr />
        <div className="row padd-020">
            <div className="col-lg-6 col-md-6">
                <button className="savebtn" onClick={() => handleSave(false)}>Save</button>
            </div>
            <div className="col-lg-6 col-md-6 text-right">
                <button className="nxtbtn" onClick={() => handleSave(true)}>Next</button>
            </div>
        </div>
    </div>
}