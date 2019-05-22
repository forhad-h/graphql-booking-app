import React from "react";

import "./BookingList.scss";

const bookingList = props => {
  const bookingList = props.bookings.map(booking => {
    return (
      <li key={booking._id} className="bookings__item">
        <div className="bookings__item-data">
          {booking.event.title} -{" "}
          {new Date(booking.createdAt).toLocaleDateString()}
        </div>
        <div className="bookings__item-actions">
          <button
            type="button"
            className="btn small"
            onClick={props.cancelBooking.bind(this, booking._id)}
          >
            Cancel
          </button>
        </div>
      </li>
    );
  });
  return <ul className="bookings__list">{bookingList}</ul>;
};

export default bookingList;
