import React from "react";

import AuthContext from "../context/authContext";
import getBookings from "../graphql/getBookings";
import cancelBooking from "../graphql/cancelBooking";
import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components/Booking/BookingList/BookingList";
import BookingsControl from "../components/Booking/BookingsControl/BookingsControl";
import BookingChart from "../components/Booking/BookingChart/BookingChart";

class BookingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookings: [],
      outputType: "list"
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

  outputTypeHandler = outputType => this.setState({ outputType });

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <>
          <BookingsControl
            outputTypeHandler={this.outputTypeHandler}
            activeOutputType={this.state.outputType}
          />
          <div>
            {this.state.outputType === "list" ? (
              <BookingList
                bookings={this.state.bookings}
                cancelBooking={this.cancelBookingHandler}
              />
            ) : (
              <BookingChart bookings={this.state.bookings} />
            )}
          </div>
        </>
      );
    }

    return <>{content}</>;
  }
}

export default BookingPage;
