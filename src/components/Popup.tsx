import React from "react";

const Popup = ({
  children,
  state = false,
  onclose = () => {},
}: {
  children?: React.ReactNode;
  state?: boolean;
  onclose?: () => void;
}) => {
  return (
    <div className={`popup-container ${state ? "active" : ""}`}>
      <div className="closure" onClick={onclose}></div>
      <div className="popup-wrapper">{children}</div>
    </div>
  );
};

export default Popup;
