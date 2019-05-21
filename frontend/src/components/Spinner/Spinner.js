import React from "react";

import "./Spinner.scss";

const spinner = () => {
  return (
    <div className="spinner">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
};

export default spinner;
