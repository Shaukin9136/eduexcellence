import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Pagination from "../../../../libs/pagination/index";
// import "../../../../css/adminpages.css"
import { useHistory } from 'react-router-dom';
import Loading from "../../../common/loading";
import Nodata from "../../../common/nodata";
import {getFacultyList} from "../../../actions/user-actions";

export default (props) => {

  const [page, setPage] = useState(0);
  const [items, setItems] = useState(10);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const history = useHistory();

  useEffect(() => {
    getData();
  }, [page, items, search]);

  const getData = () => {
    setLoading(true);
    getFacultyList(page, items, search).then(res => {
      // console.log(res);
      setCount(res.count || 0);
      setData([...res.data]);
      setLoading(false)
    }).catch(err => setLoading(false));
  }

  const handleCount = (e) => {
    setItems(e.target.value);
  }

  const handlePagination = (page) => {
    setPage(page);
  }

  const handleFaculty = (id, type = null) => {
    let path = "/admin/faculty/"+id;
    path += type !== null ? "?edit=true" : "";
    history.push(path);
  }


  return <div className="dash-data">
    <div className="courses-strip">
      <div className="flexible">
        <div className="course-side">
          <img src="/images/icons/faculty-icon2.png" alt="icon" /> Faculty
            </div>
        <div className="addnew">
          <button onClick={() => handleFaculty('new')}><i className="fa fa-plus"></i> Add new faculty</button>
        </div>
      </div>
    </div>
    <div className="faculty">
      <span className="count-holder">Show <input type="number" className="count" value={items} onChange={(e) => setItems(e.target.value)} /></span>
      <input id="myInput" className="table-search" type="text" placeholder="Search.." onChange={(e) => setSearch(e.target.value)}/>
      <span className="table-icon">Export <img src="/images/icons/table-icon.png" alt="icon" /></span>
      {data && data.length > 0 ?
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Qualification</th>
            <th>University</th>
            <th>Exp</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="myTable">
        {data.map((record, index) => <tr key={record._id}>
            <td>{page > 0 ? page * items + index + 1 : index + 1}</td>
            <td><img src="/images/icons/teacher-icon.png" alt="Profile Pic" /> &nbsp; {record.firstName}</td>
            <td>{record.designation ? record.designation : ''}</td>
            <td>{record.qualifications ? record.qualifications : ''}</td>
            <td>{record.institute ? record.institute : ''}</td>
            <td>{record.experience ? record.experience : ''}</td>
            <td><i className="fa fa-eye" onClick={(e) => handleFaculty(record._id)}></i> <i className="fa fa-pencil" onClick={(e) => handleFaculty(record._id, 'edit')}></i> <i className="fa fa-trash"></i> </td>
          </tr>
        )}
        </tbody>
      </Table>
      : <Nodata />}
    </div>

    <Pagination count={count} page={page} items={items} callback={handlePagination} />
    <br /><br />
  </div>
}


