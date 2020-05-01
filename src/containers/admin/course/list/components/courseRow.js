import React, { useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

export default (props) => {
    const { record, id } = props;
    const [menu, setToggle] = useState(false);

    const handleCourse = (record) => {
        props.editcallback(record);
        setToggle(prevState => !prevState)
    }

    const handleCourseDelete = (record) => {
        var r = window.confirm("Do You want to delete the Course :: "+ record.title);
        if (r == true) {
            props.deleteRecord(record._id);
        }
    }

    const handleCourseActive = (record) => {
        let body = {
            isActive: !record.isActive
        }
        handleMenu();
        props.updateRecord(record._id, body);
        
    }

    const handleMenu = () => {
        setToggle(prevState => !prevState)
    }

    const getFacultyName = (faculty) => {
        let name = "";
        for(let i in faculty) {
            name += name === "" ? faculty[i].firstName : ", " + faculty[i].firstName;
        }
        return name;
    }

    const popover = <Popover id="popover-basic">
        <Popover.Content>
            <a className="dropdown-item" href="#">Preview</a>
            <a className="dropdown-item" onClick={() => handleCourse(record)}>Edit</a>
            {/* <a className="dropdown-item" onClick={() => handleCourseDelete(record)}>Delete</a> */}
            <a className="dropdown-item" onClick={() => handleCourseActive(record)}>{record.isActive ? "Mark Inactive" : "Mark Active"}</a>
        </Popover.Content>
      </Popover>
    return <tr>
        <td>{id}</td>
        <td>{record.title}</td>
        <td>{record.category[0] || ''}</td>
        <td>{record.subCategory[0] || ''}</td>
        <td>{getFacultyName(record.facultyDetails)}</td>
        <td>{'-'}</td>
        <td><i className="fa fa-inr"></i> {record.pricing && record.pricing.price ? record.pricing.price : '-'}</td>
        <td>{record.isActive ? <button className="activebtn-dash">active</button> : <button className="activebtn-dash">Inactive</button>}</td>
        <td onClick={handleMenu}>
            <OverlayTrigger trigger="click" placement="bottom" flip={false} show={menu} overlay={popover}>
                <i className="fa fa-ellipsis-v"></i>
            </OverlayTrigger>
            
            {/* <div className={`dropdown-menu ${menu ? 'show' : ''}`}>
                <button className="dropdown-item" onClick={() => handleCourse(record)}>Test</button>
                <a className="dropdown-item" href="#">View</a>
                <a className="dropdown-item" onClick={() => handleCourse(record)}>Edit</a>
                <a className="dropdown-item" onClick={() => handleCourseDelete(record)}>Delete</a>
            </div> */}
        </td>

    </tr>
}