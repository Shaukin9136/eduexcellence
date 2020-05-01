import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../../css/adminpages.css";
import BasicInfo from "./components/basicInfo";
import Education from "./components/education";
import Qualification from "./components/qualification";
import Skill from "./components/skill";
import Address from "./components/address";

export default (props) => {
  const [current, setTab] = useState("basic");
  const history = useHistory();
  const tabs = [
    { key: "basic", value: "Basic Info", prev: null, next: "curriculum" },
    { key: "education", value: "Education", prev: "basic", next: "dates" },

    { key: "qualification", value: "Qualification", prev: "dates", next: "price" },
    { key: "skill", value: "Skill", prev: "media", next: "seo" },
    { key: "address", value: "Address", prev: "price", next: null },
  ];

  const handleBack = () => {
    history.push("/admin/teacher");
  };

  return (
    <div className="dash-data">
      <div className="courses-strip">
        <div className="flexible">
          <div className="course-side">
            <img src="/images/icons/teachers-icon.png" /> Add teachers
          </div>
          <div className="addnew">
            <button onClick={handleBack}>
              <i className="fa fa-plus"></i> Back to teachers list
            </button>
          </div>
        </div>
      </div>
      <div className="course-title">

        <ul className="tab-nav">
          {/*<span className="bottom-border"></span>*/}
          {tabs.map(item => <li key={item.key} className={current === item.key ? "tab-nav__item active" : "tab-nav__item"}><a onClick={() => setTab(item.key)}>{item.value}</a></li>)}
        </ul>
        <div className="form-sec">

          {current === "basic" && <BasicInfo />}

          {current === "education" && <Education />}

          {current === "qualification" && <Qualification />}

          {current === "skill" && <Skill />}

          {current === "address" && <Address />}

        </div>


        {/*<div className="form-sec">
          <div className="tabdb active" data-tab="#basicInfo">
            <BasicInfo />
          </div>
          <div className="tabdb" data-tab="#education">
            <Education />
          </div>
          <div className="tabdb" data-tab="#qualification">
            <Qualification />
          </div>
          <div className="tabdb" data-tab="#skill">
            <Skill />
          </div>
          <div className="tabdb" data-tab="#address">
            <Address />
          </div>
  </div>*/}
      </div>
    </div>
  );
};
