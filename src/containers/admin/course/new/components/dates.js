import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import AddNewDates from "./addDates";
import Loading from "../../../../common/loading";
import NoData from "../../../../common/nodata";
import {getList, createData, deleteDates, updateData} from "../../actions";
import moment from "moment";
import swal from '@sweetalert/with-react';

const ImportantDates = (props) => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [item, setRecord] = useState(null);

    useEffect(() => {
        if (props.course) {
            getData(props.course._id);
        } else {
            setLoading(false);
        }
    }, [props.course])

    const getData = (id) => {
        getList(`impdates?courseid=${id}`).then(res => {
            setData(res);
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }


    const handleDates = () => {
        setRecord(null);
        setOpen(prevState => !prevState);
    }

    const handleDelete = (record) => {
        var r = window.confirm("Do You want to delete the Dates :: "+ record.name);
        if (r == true) {
            deleteDates(record._id).then(res => {
                let _data = data.filter(i => i._id !== record._id);
                setData([..._data])
            }).catch(err => {
                console.log("err in delete dates === ", err);
            })
        }
    }

    const handleSave = (obj) => {
        if (props.course) {
            obj['courseid'] = props.course._id
            setLoading(true);
            if (item) {
                updateData(`impdates/${item._id}`, obj).then(res => {
                    setOpen(false);
                    setLoading(false);
                    setRecord(null);
                    getData(props.course._id);
                }).catch(err => {
                    setLoading(false);
                })
            } else {
                createData("impdates", obj).then(res => {
                    setOpen(false);
                    setLoading(false);
                    setData(prevState => [...prevState, ...[res]])
                    setRecord(null);
                }).catch(err => {
                    setLoading(false);
                })
            }
        } else {
            swal("Warning", "Create Course First", "info");
            props.setTab('basic');
        }
    }

    const getDays = (start, end) => {
        let _s = moment(start, 'x'); 
        let _e = moment(end, 'x');
        let d = _e.diff(_s, 'days');
        return d > 0 ? d + " Days" : 1 +" Day"; 
    }

    const handleEdit = (record) => {
        setRecord(record);
        setOpen(true);
    }

    return <div className="tabdb active" data-tab="#dates" style={{ "padding": "0" }}>
    {loading && <Loading />}
        <div className="imp-date">
            {data && data.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Dates</th>
                            <th>Days</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {data.map(record => <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{moment(record.startDate, 'x').format("MM/DD/YYYY")}</td>
                            <td>{getDays(record.startDate, record.endDate)}</td>
                            <td>{record.location}</td>
                            <td>
                                <i className="fa fa-pencil" onClick={() => handleEdit(record)}></i> 
                                <i className="fa fa-trash" onClick={() => handleDelete(record)}></i></td>
                        </tr>)}
                    </tbody>
                </table>
            : <NoData />}
        </div>
        <div className="addchap">
            <p><button onClick={() => handleDates()}><i className="fa fa-plus"></i> Add Important Dates</button></p>
        </div>
        {open && <AddNewDates saveCallback={handleSave} data={item}/>}
    </div>
}

const mapStateToProps = (state) => {
    return { course: state.admincourse.courseData };
}

export default connect(
    mapStateToProps
)(ImportantDates);