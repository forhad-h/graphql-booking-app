import { GRAPHQL_END_POINT } from "../aux/config";

export default data => {
  const requestBody = {
    query: `
            mutation BookEvent($eventId: ID!) {
                bookEvent(eventId: $eventId){
                    _id
                    createdAt
                    updatedAt
                }
            }
        `,
    variables: {
      eventId: data.eventId
    }
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
      /*       _this.setState(prevState => {
        const updatedBookings = [...prevState.bookings];
        const booking = {
          _id: resData.data.bookEvent._id,
          title: resData.data.bookEvent.title,
          price: resData.data.bookEvent.price,
          date: resData.data.bookEvent.date,
          description: resData.data.bookEvent.description,
          creator: {
            _id: data.userId
          }
        };
          updatedBookings.push(booking);
        return {
          ...prevState,
            events: updatedBookings
        };
      }); */
    })
    .catch(err => {
      console.log(err);
    });
};
