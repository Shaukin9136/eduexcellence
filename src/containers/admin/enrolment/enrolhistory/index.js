import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../../../../libs/pagination/index";
import Nodata from "../../../common/nodata";
import "../../../../css/adminpages.css";
import {getEnrolList} from "../actions";
import moment from "moment";

export default (props) => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState(10);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  useEffect(() => {
    getData();
}, [page, items, search]);

const getData = () => {
    setLoading(true);
    getEnrolList(page, items, search).then(res => {
        setLoading(false)
        setList(res.data || []);
        setCount(res.count || 0);
    }).catch(err => setLoading(false));
}

  const handlePagination = (page) => {
    setPage(page);
  };

  const handleNew = () => {
    history.push("/admin/teacher/new");
  };

  return (
    <div className="dash-data">
      <div className="courses-strip">
        <div className="flexible">
          <div className="course-side">Enrol History</div>
          {/*<!-- <div className="addnew"> -->
             <!-- <button><i className="fa fa-plus"></i> Add new teacher</button> -->
  <!-- </div> -->*/}
        </div>
      </div>
      <div className="teachers2">
        <span className="count-holder">
          Show <input type="number" className="count" />
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
        <div className="table-responsive">
          {list && list.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Order by</th>
                <th>Purchase courses</th>
                <th>Date & Time</th>
                <th>Payment mode</th>
                <th>Total price</th>
                <th>Transation id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="myTable">
              {list.map(record => <tr key={record._id}>
                <td>{record.userDetails[0].firstName}</td>
                <td>{record.courseDetails[0].title}</td>
                <td>
                  {moment(record.paymentDate, 'x').format('DD-MM-YYYY')}
                  {/* <br />
                  <small style={{ position: "relative", left: "11px" }}>
                    12: 40 PM
                  </small> */}
                </td>
                <td>{record.paymentMode}</td>
                <td>
                  <i className="fa fa-inr"></i> {record.price}
                </td>
                <td>{record.transectionId}</td>
                <td>
                  <button className={record.isActive ? "unallocate active" : "unallocate"}>Unallocate</button>
                </td>
              </tr>
              )}
            </tbody>
          </table>
          : <Nodata />}
        </div>
      </div>
      <Pagination count={count} page={page} items={items} callback={handlePagination}/>
      <br />
      <br />
    </div>
  );
};
