import { GRAPHQL_END_POINT } from "../aux/config";

export default (_this, data) => {
  _this.setState({ isLoading: true });
  const requestBody = {
    query: `
            mutation {
                cancelBooking(bookingId: "${data.id}"){
                    _id
                    title
                }
            }
        `
  };

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token
    }
  };
  fetch(GRAPHQL_END_POINT, fetchOptions)
    .then(res => {
      if (res.status !== 200 && res.status !== 201) throw new Error("Failed");
      return res.json();
    })
    .then(resData => {
      if (_this.isActive) {
        _this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== data.id;
          });
          return {
            ...prevState,
            bookings: updatedBookings,
            isLoading: false
          };
        });
      }
    })
    .catch(err => {
      console.log(err);
      if (_this.isActive) {
        _this.setState({ isLoading: true });
      }
    });
};
