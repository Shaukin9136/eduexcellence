import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import AddChapter from "./addchapter";
import Lodaing from "../../../../common/loading";
import NoData from "../../../../common/nodata";
import { getList, createData, updateChapter, saveResourceFile, saveChapterImgFile, deleteChapter } from "../../actions";
import swal from '@sweetalert/with-react';

const Curricum = (props) => {
    const [open, setNew] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        if (props.course) {
            getList(`chapters?courseid=${props.course._id}`).then(res => {
                setData(res);
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }

    const handleSave = (obj, resources, chaperImage) => {
        if (props.course) {
            obj['courseid'] = props.course._id
            setLoading(true);
            if (item) {
                updateChapter(item._id, obj).then(res => {
                    if (resources !== null || chaperImage !== null) {
                        saveResources(resources, chaperImage, res._id);
                    } else {
                        setNew(false);
                        setLoading(false);
                        let _data = data.filter(i => i._id !== item._id);
                        setData([..._data, res])
                    }
                }).catch(err => {
                    setLoading(false);
                })
            } else {
                createData("chapters", obj).then(res => {
                    if (resources !== null || chaperImage !== null) {
                        saveResources(resources, chaperImage, res._id);
                    } else {
                        setNew(false);
                        setLoading(false);
                        setData(prevState => [...prevState, res])
                    }
                }).catch(err => {
                    setLoading(false);
                })
            }
        } else {
            swal("warning", "Create Course First", "info");
            props.setTab('basic');
        }
    }

    const addNew = () => {
        // if (props.course) {
            setItem(null);
            setNew(!open);
        // } else {
        //     alert("Create Course First");
        //     props.setTab('basic');
        // }
    }

    const handleEdit = (item) => {
        setItem(item);
        setNew(true);
    }

    const handleDelete = (item) => {
        var r = window.confirm("Do You want to delete the chapter :: "+ item.title);
        if (r == true) {
            deleteChapter(item._id).then(res => {
                let _data = data.filter(i => i._id !== item._id);
                setData([..._data])
            }).catch(err => {
                console.log("err in delete chapter === ", err);
            })
        }
    }

    const saveResources = (resources, chaperImage, id) => {
        let promises = [];
        if (resources !== null) {
            for (let i = 0; i < resources.length; i++) {
                promises.push(saveResourceFile(resources[i], id));
            }
        }
        if (chaperImage !== null) {
            promises.push(saveChapterImgFile(chaperImage, id));
        }
        Promise.all(promises).then(res => {
            getData();
            setNew(false);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    }

    console.log(data);
    return <div className="tabdb active" data-tab="#curriculum" style={{ "padding": "0" }}>
        {loading && <Lodaing />}
        <div className="curriculum-section">
            {data && data.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Mode</th>
                            <th>Source/Venue</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {data.map(item =>
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.mode}</td>
                                <td>{item.source}</td>
                                <td>{item.description}</td>
                                <td>
                                    <i className="fa fa-eye"></i> 
                                    <i className="fa fa-pencil" onClick={() => handleEdit(item)}></i> 
                                    <i className="fa fa-trash" onClick={() => handleDelete(item)}></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                : <NoData />}
            <div className="addchap">
                <p><button onClick={() => addNew()}><i className="fa fa-plus"></i> Add chapter</button></p>
            </div>
            {open && <AddChapter saveCallback={handleSave} item={item}/>}
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return { course: state.admincourse.courseData };
}

export default connect(
    mapStateToProps
)(Curricum);