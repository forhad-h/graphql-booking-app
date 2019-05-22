import { GRAPHQL_END_POINT } from "../aux/config";

export default (_this, data) => {
  _this.setState({ isLoading: true });
  const requestBody = {
    query: `
            query {
                bookings{
                    _id
                    createdAt
                    event {
                        _id
                        title
                        date
                        price
                    }
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
      const bookings = resData.data.bookings;
      if (_this.isActive) {
        _this.setState({ bookings, isLoading: false });
      }
    })
    .catch(err => {
      console.log(err);
      if (_this.isActive) {
        _this.setState({ isLoading: true });
      }
    });
};
