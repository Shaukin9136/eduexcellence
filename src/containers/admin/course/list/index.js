import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import Count from './components/counts';
import Pagination from "../../../../libs/pagination/index";
import "../../../../css/adminpages.css"
import { getCourseList, saveCourse, deleteCourse } from "../actions";
import {updateCourse} from "../../../actions/course-actions";
import Loading from "../../../common/loading";
import RowData from "./components/courseRow";
import swal from '@sweetalert/with-react';

const CourseList = (props) => {
    const [page, setPage] = useState(0);
    const [items, setItems] = useState(10);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const history = useHistory();

    useEffect(() => {
        getData();
    }, [page, items, search]);

    const getData = () => {
        setLoading(true);
        props.getCourseList(page, items, search).then(res => {
            setLoading(false)
            setCount(res.result.count || 0);
        }).catch(err => setLoading(false));
    }

    const handlePagination = (page) => {
        setPage(page);
    }

    const handleCourse = (obj = null) => {
        console.log("obj ==== ", obj);
        props.storeCourse(obj);
        let path = "/admin/course/";
        path += obj && obj._id ? obj._id : "new";
        history.push(path);
    }

    const handleCount = (e) => {
        setItems(e.target.value);
    }

    const handleCourseDelete = (id) => {
        deleteCourse(id).then(res => {
            console.log("res === ", res);
            getData();
        }).catch(err => {
            console.log("err === ", err);
        })
    }

    const handleActive = (id, body) => {
        updateCourse(id, body).then(res => {
            // alert("Updated Successfully");
            swal("Success", "Updated Successfully", "success")
            getData();
        }).catch(err => {
            console.log("err === ", err);
        });
    }
    return <div className="dash-data">
        <div className="courses-strip">
            <div className="flexible">
                <div className="course-side">
                    <img src="/images/icons/course-icon.png" /> Courses
            </div>
                <div className="addnew">
                    <button onClick={() => handleCourse()}><i className="fa fa-plus"></i> Add new courses</button>
                </div>
            </div>
        </div>

        <Count />

        <div className="table-section">
            <span className="count-holder">Show <input type="number" className="count" value={items} onChange={handleCount} /></span>
            <input id="myInput" className="table-search" type="text" placeholder="Search.." onChange={(e) => setSearch(e.target.value)}/>
            {loading && <Loading />}
            {props.list && props.list.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Sub-category</th>
                            <th>Instructor</th>
                            <th>Enrolled</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {props.list.map((record, index) => <RowData key={record._id} id={page > 0 ? page * items + index + 1 : index + 1} record={record} 
                            editcallback={handleCourse} deleteRecord={handleCourseDelete} updateRecord={handleActive} />)
                            // <tr key={record._id}>
                            //         <td>{page > 0 ? page*items + index + 1 : index +1}</td>
                            //         <td>{record.title}</td>
                            //         <td>{record.category[0] || ''}</td>
                            //         <td>{record.subCategory[0] || ''}</td>
                            //         <td>{'-'}</td>
                            //         <td>{'-'}</td>
                            //         <td><i className="fa fa-inr"></i> {record.pricing && record.pricing.price ? record.pricing.price : '-'}</td>
                            //         <td>{record.isActive ? <button className="activebtn-dash">active</button> : <button className="activebtn-dash">Inactive</button>}</td>
                            //         <td onClick={() => setToggle(!menu)}><i className="fa fa-ellipsis-v"></i>
                            //             {menu && <div className="dropdown-menu">
                            //                 <button className="dropdown-item" onClick={() =>  handleCourse(record)}>Test</button>
                            //                 <a className="dropdown-item" href="#">View</a>
                            //                 <a className="dropdown-item" onClick={() => handleCourse(record)}>Edit</a>
                            //                 <a className="dropdown-item" onClick={() => handleCourseDelete(record)}>Delete</a>
                            //             </div>}
                            //         </td>

                            //     </tr>)
                        }
                    </tbody>
                </table>
                : <p> No Data</p>}
        </div>


        <Pagination count={count} page={page} items={items} callback={handlePagination} />
        <br /><br />

    </div>

}

const mapStateToProps = (state) => {
    return { list: state.admincourse.courseList };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseList: (page, limit) => (dispatch(getCourseList(page, limit))),
        storeCourse: (obj) => (dispatch(saveCourse(obj)))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseList);