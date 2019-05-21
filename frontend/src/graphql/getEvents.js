import { GRAPHQL_END_POINT } from "../aux/config";

export default _this => {
  _this.setState({ isLoading: true });
  const requestBody = {
    query: `
            query {
                events{
                    _id
                    title
                    description
                    price
                    date
                    creator {
                        _id
                        email
                    }
                }
            }
        `
  };

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch(GRAPHQL_END_POINT, fetchOptions)
    .then(res => {
      if (res.status !== 200 && res.status !== 201) throw new Error("Failed");
      return res.json();
    })
    .then(resData => {
      const events = resData.data.events;
      if (_this.isActive) {
        _this.setState({ events: events, isLoading: false });
      }
    })
    .catch(err => {
      console.log(err);
      if (_this.isActive) {
        _this.setState({ isLoading: true });
      }
    });
};
