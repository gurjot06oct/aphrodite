import React from "react";
import { router } from "../App";

const TabBar = () => {
  const [activeTab, setActiveTab] = React.useState(window.location.pathname);

  const handleTabClick = (tab: string) => {
    router.navigate(tab);
    setActiveTab(tab);
  };

  return (
    <div className="tab-bar">
      <div className="navigation">
        <div
          className={`tab ${activeTab === "/" ? "active" : ""}`}
          onClick={() => handleTabClick("/")}
        >
          Analytics
        </div>
        <div
          className={`tab ${activeTab === "/Problems" ? "active" : ""}`}
          onClick={() => handleTabClick("/Problems")}
        >
          Problems
        </div>
        <div
          className={`tab ${activeTab === "/Schedule" ? "active" : ""}`}
          onClick={() => handleTabClick("/Schedule")}
        >
          Schedule
        </div>
        <div
          className={`tab ${activeTab === "/Learning" ? "active" : ""}`}
          onClick={() => handleTabClick("/Learning")}
        >
          Learning
        </div>
      </div>
    </div>
  );
};

export default TabBar;
