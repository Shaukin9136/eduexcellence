import React, {useState, useEffect} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Loading from "../../../../common/loading";
import {target_user, target_sub_user, boards, age_level, categories, subcategories} from "../../../../../data/course_config";
import {getFacultyList} from "../../../../actions/user-actions"
import swal from '@sweetalert/with-react';
export default (props) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [benefits, setBenefits] = useState('');
    const [loading, setLoading] = useState(true);
    const [targetUser, setTarUser] = useState('');
    const [targetSubUser, setTarSubUser] = useState('');
    const [board, setBoard] = useState('');
    const [ageLevel, setAge] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [faculty, setFaculty] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [data, setData] = useState({dummyLayerOne: '', dummyLayerTwo: ''});

    useEffect(() => {
        const {course} = props;
        console.log("course === ", course);
        getFacultyList(0, 100).then(res => {
            console.log("res === ", res);
            setFacultyList([...res.data]);
        }).catch(err => {
            console.log("err === ", err);
        })
        if (course) {
            course.title && setName(course.title);
            course.description && setDesc(course.description);
            course.benefits && setBenefits(course.benefits);
            course.targetUser && setTarUser(course.targetUser);
            course.targetSubUser && course.targetSubUser[0] && setTarSubUser(course.targetSubUser[0]);
            course.board && course.board[0] && setBoard(course.board[0]);
            course.ageLevel && course.ageLevel[0] && setAge(course.ageLevel[0]);
            course.category && course.category[0] && setCategory(course.category[0]);
            course.subCategory && course.subCategory[0] && setSubCategory(course.subCategory[0]);
            course.faculty && course.faculty[0] && setFaculty(course.faculty[0]);
            let keys = Object.keys(data);
            let obj = {};
            for(let i in keys) {
                obj[keys[i]] = course[keys[i]] && course[keys[i]][0] ? course[keys[i]][0] : '';
            }
            console.log("obj === ", obj);
            setData(prevState => obj);
            setLoading(false);
        } else {
            setLoading(false); 
        }
    }, [props.course]);

    const handleChange = (name, value) => {
        setData(prevState => {return {...prevState, [name]: value }});
    };

    useEffect(() => {
        const {course} = props;
        (!course || (course && course.targetUser !== targetUser)) && setTarSubUser('');
    }, [targetUser]);

    useEffect(() => {
        const {course} = props;
        (!course || (course && course.targetSubUser && course.targetSubUser[0] !== targetSubUser)) && setBoard('');
    }, [targetSubUser]);

    useEffect(() => {
        const {course} = props;
        (!course || (course && course.board && course.board[0] !== board)) && setAge('');
    }, [board]);

    useEffect(() => {
        const {course} = props;
        (!course || (course && course.ageLevel && course.ageLevel[0] !== ageLevel)) && setCategory('');
    }, [ageLevel]);

    useEffect(() => {
        const {course} = props;
        (!course || (course && course.category && course.category[0] !== category)) && setSubCategory('');
    }, [category]);

    const handleSave = (status) => {
        const {course} = props;
        setLoading(true);
        let obj = {};
        if (name && name !== "") {
            obj['title'] = name;
        } else {
            swal("Please enter Name");
            setLoading(false);
            return;
        }
        if (desc && desc !== "") {
            obj['description'] = desc;
        } else {
            swal("Please enter Course description");
            setLoading(false);
            return;
        }
        if (benefits && benefits !== "") {
            obj['benefits'] = benefits;
        } else {
            swal("Please enter Benefits");
            setLoading(false);
            return;
        }


        obj['targetUser'] = targetUser && targetUser !== "" ? targetUser : '';
        obj['targetSubUser'] = targetSubUser && targetSubUser !== "" ? [targetSubUser] : [];
        obj['board'] = board && board !== "" ? [board] : [];
        obj['ageLevel'] = ageLevel && ageLevel !== "" ? [ageLevel] : [];
        obj['category'] = category && category !== "" ? [category] : [];
        obj['subCategory'] = subCategory && subCategory !== "" ? [subCategory] : [];
        obj['faculty'] = faculty && faculty !== "" ? [faculty] : [];
        for (let i in data) {
            if (data[i] !== "") obj[i] = [data[i]];
            else obj[i] = [];
        }

        props.saveCallback(obj, status);
    }

    console.log(targetUser, targetSubUser, board, ageLevel, category, subCategory);

    return <div className="tabdb active">
        {loading && <Loading />}
        <h5>Basic Detail</h5>
        <input type="text" className="course-search" placeholder="Type course name here" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="form-select">
            <div className="row">
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Target user</p>
                    <select className="nice-select" name="targetUser" onChange={(e) => setTarUser(e.target.value)} value={targetUser}>
                        <option value="" data-display="Select" className="list option">Select Target</option>
                        {target_user.map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                    </select>
                </div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Target sub-user</p>
                    <select className="nice-select" name="targetSubUser" onChange={(e) => setTarSubUser(e.target.value)} value={targetSubUser}>
                        <option data-display="Select" className="list option">Select Sub Target</option>
                        {target_sub_user.filter(i => i.t_id === targetUser).map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                    </select>
                </div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Dummy Layer</p>
                    <select className="nice-select" name="dummyLayerOne" onChange={(e) => handleChange("dummyLayerOne", e.target.value)}>
                        <option data-display="Select" className="list option selected focus">Nothing</option>
                        <option value="1" className="list option">Layer</option>
                        <option value="2" className="list option">Layer 2</option>
                        <option value="4" className="list option">Layer 3</option>
                    </select>
                </div>
                <div className="clearfix"></div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Board</p>
                    <select className="nice-select" name="board" onChange={(e) => setBoard(e.target.value)} value={board}>
                        <option data-display="Select" className="list option">Select Board</option>
                        {boards.filter(i => i.st_id.indexOf(targetSubUser) > -1).map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                    </select>
                </div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Age Level</p>
                    <select className="nice-select" name="ageLevel" onChange={(e) => setAge(e.target.value)} value={ageLevel}>
                        <option data-display="Select" className="list option">Select Age Level</option>
                        {age_level.filter(i => i.b_id.indexOf(board) > -1).map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                    </select>
                </div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Dummy Layer</p>
                    <select className="nice-select" name="dummyLayerTwo" onChange={(e) => handleChange("dummyLayerTwo", e.target.value)}>
                        <option data-display="Select" className="list option selected focus">Nothing</option>
                        <option value="1" className="list option">Layer</option>
                        <option value="2" className="list option">Layer 2</option>
                        <option value="4" className="list option">Layer 3</option>
                    </select>
                </div>
                <div className="clearfix"></div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Category <span className="pull-right"><a className="addcat" href="#">Add</a></span></p>
                    <select className="nice-select" name="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option data-display="Select" className="list option">Select Category</option>
                        {categories.filter(i => i.a_id.indexOf(ageLevel) > -1).map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                    </select>
                </div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Sub-category <span className="pull-right"><a className="addcat" href="#">Add</a></span></p>
                    <select className="nice-select" name="subCategory" onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                        <option data-display="Select" className="list option">Select Sub-category</option>
                        {subcategories.filter(i => i.c_id.indexOf(category) > -1).map(item => <option key={item.id} value={item.id} className="list option">{item.value}</option>)}
                    </select>
                </div>
                <div className="col-lg-4 mb-20">
                    <p className="user-label">Faculty</p>
                    <select className="nice-select" name="faculty" onChange={(e) => setFaculty(e.target.value)} value={faculty}>
                        <option data-display="Select" className="list option">Select Faculty</option>
                        {facultyList.map(item => <option key={item._id} value={item._id} className="list option">{item.firstName} {item.lastName}</option>)}
                    </select>
                </div>
            </div>
            <p className="user-label">Course Description</p>
            <textarea className="form-control" placeholder="Course Introduction" value={desc}  onChange={(e) => setDesc(e.target.value)} ></textarea>
            <br />
            <p className="user-label">Course Benefits</p>
            <textarea className="form-control" placeholder="Benefits"  value={benefits} onChange={(e) => setBenefits(e.target.value)} ></textarea>
            <hr />
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <button className="savebtn"  onClick={(e) => handleSave(false)}>Save</button>
                </div>
                <div className="col-lg-6 col-md-6 text-right">
                    <button className="nxtbtn" onClick={(e) => handleSave(true)}>Next</button>
                </div>
            </div>
        </div>
    </div>

}

