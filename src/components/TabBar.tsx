import React from "react";
import { router } from "../App";

const TabBar = () => {
  const [activeTab, setActiveTab] = React.useState(window.location.pathname);
  const [theme, settheme] = React.useState<string | null>("");
  const ToogleTheme = () => {
    if (localStorage.getItem("theme") == "dark") {
      localStorage.setItem("theme", "light");
      settheme("light");
      document.body.setAttribute("data-theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
      settheme("dark");
      document.body.setAttribute("data-theme", "dark");
    }
  };
  React.useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    }
    settheme(localStorage.getItem("theme"));
    document.body.setAttribute(
      "data-theme",
      `${localStorage.getItem("theme")}`
    );
  }, []);
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
          className={`tab ${activeTab === "/Learning" ? "active" : ""}`}
          onClick={() => handleTabClick("/Learning")}
        >
          Learning
        </div>
        <div className="toogle" onClick={ToogleTheme}>
          <div className={`inner ${theme}`}></div>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
