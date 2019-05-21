import React from "react";

import "./Backdrop.scss";

const backdrop = props => {
  return <div className="backdrop" onClick={props.clickHandler} />;
};

export default backdrop;
