import React from "react";

import "./BookingsControl.scss";

const bookingsControl = props => {
  return (
    <div className="bookings-control">
      <button
        className={props.activeOutputType === "list" ? "active" : ""}
        type="button"
        onClick={props.outputTypeHandler.bind(this, "list")}
      >
        List
      </button>
      <button
        className={props.activeOutputType === "chart" ? "active" : ""}
        type="button"
        onClick={props.outputTypeHandler.bind(this, "chart")}
      >
        Chart
      </button>
    </div>
  );
};

export default bookingsControl;
