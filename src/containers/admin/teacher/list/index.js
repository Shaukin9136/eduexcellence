import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../../../../libs/pagination/index";
import "../../../../css/adminpages.css";
import Loading from "../../../common/loading";
import Nodata from "../../../common/nodata";
import { getTeachersList, updateData } from "../../../actions/user-actions";
import swal from '@sweetalert/with-react';
import moment from 'moment';

export default props => {
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
    getTeachersList(page, items, search).then(res => {
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

  const handleNew = () => {
    history.push("/admin/teacher/new");
  };

  const getAge = (dob) => {
    let _s = moment(dob, 'x');
    let d = moment().diff(_s, 'years');
    return d > 0 ? d : 1;
  }

  const handleActive = (record) => {
    let body = {
      isActive: !record.isActive
    }
    updateData(record._id, body).then(res => {
      // console.log("res === ", res);
      let _data = data.map(itm => itm._id === record._id ? res : itm);
      setData([..._data]);
      swal("Success", "Update Successfully", "success");
    }).catch(err => {
      console.log("err === ", err);
    })
  }

  return (
    <div className="dash-data">
      <div className="courses-strip">
        <div className="flexible">
          <div className="course-side">
            <img src="/images/icons/teachers-icon.png" /> Teachers
          </div>
          <div className="addnew">
            <button onClick={handleNew}>
              <i className="fa fa-plus"></i> Add new teacher
            </button>
          </div>
        </div>
      </div>
      <div className="teachers">
        <span className="count-holder">
          Show <input type="number" className="count" value={items} onChange={handleCount} />
        </span>
        <input
          id="myInput"
          className="table-search"
          type="text"
          placeholder="Search.."
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="table-icon">
          Export <img src="/images/icons/table-icon.png" />
        </span>
        {loading && <Loading />}
        {data && data.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Email</th>
                <th>Registered by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="myTable">
              {data.map((record, index) =>
                <tr key={record._id}>
                  <td>{page > 0 ? page * items + index + 1 : index + 1}</td>
                  <td>{record.firstName}</td>
                  <td>{record.gender}</td>
                  <td>{getAge(record.dob)}</td>
                  <td>{record.email}</td>
                  <td>{}</td>
                  <td onClick={() => handleActive(record)}>
                    <img src="/images/icons/user-lock.png" width="20" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          : <Nodata />}
      </div>
      <Pagination
        count={count}
        page={page}
        items={items}
        callback={handlePagination}
      />
    </div>
  );
};
