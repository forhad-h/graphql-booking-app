import React from "react";

import AuthContext from "../context/authContext";
import getBookings from "../graphql/getBookings";
import cancelBooking from "../graphql/cancelBooking";
import Spinner from "../components/Spinner/Spinner";
import "./Bookings.scss";

class BookingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookings: []
    };
  }

  isActive = true;
  static contextType = AuthContext;

  componentDidMount = () => {
    getBookings(this, { token: this.context.token });
  };

  componentWillUnmount = () => {
    this.isActive = false;
  };

  cancelBookingHandler = bookingId => {
    cancelBooking(this, {
      id: bookingId,
      token: this.context.token
    });
  };

  render() {
    const bookingList = this.state.bookings.map(booking => {
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
              onClick={this.cancelBookingHandler.bind(this, booking._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      );
    });
    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <ul className="bookings__list">{bookingList}</ul>
    );
  }
}

export default BookingPage;
