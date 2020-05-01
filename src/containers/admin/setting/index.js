import React, { useState } from "react";
import "../../../css/adminpages.css";
import Profile from "./components/profile";
import ChangePassword from "./components/changePassword";

const Settings = (props) => {
  const [current, setTab] = useState("profile");
  const tabs = [
    { key: "profile", value: "Profile", prev: null, next: "password" },
    { key: "password", value: "Change Password", prev: "profile", next: null },
  ];

  return (
    <div className="dash-data">
      <div className="courses-strip">
        <div className="flexible">
          <div className="course-side">
            {/*<img src="/images/icons/setting-icon.png" />*/}
            <img src="/images/icons/teachers-icon.png" />
            Setting
          </div>
        </div>
      </div>

      <div className="setting">
        <ul className="tab-nav custom-tab">
          {/*<span className="bottom-border"></span>*/}
          {tabs.map(item => <li key={item.key} className={current === item.key ? "tab-nav__item active" : "tab-nav__item"}><a onClick={() => setTab(item.key)}>{item.value}</a></li>)}
        </ul>
        <div className="form-sec">

          {current === "profile" && <Profile />}

          {current === "password" && <ChangePassword />}

        </div>
      </div>
    </div>
  );
};

export default Settings;
