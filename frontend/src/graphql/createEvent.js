import { GRAPHQL_END_POINT } from "../aux/config";

export default (_parent, data) => {
  const requestBody = {
    query: `
            mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){
                createEvent(eventInput: {
                    title: $title,
                    description: $description,
                    price: $price,
                    date: $date
                }){
                    _id
                    title
                    description
                    price
                    date
                    creator {
                        _id
                    }
                }
            }
        `,
    variables: {
      title: data.title,
      description: data.description,
      price: data.price,
      date: data.date
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
      _parent.setState(prevState => {
        const updatedEvents = [...prevState.events];
        const event = {
          _id: resData.data.createEvent._id,
          title: resData.data.createEvent.title,
          price: resData.data.createEvent.price,
          date: resData.data.createEvent.date,
          description: resData.data.createEvent.description,
          creator: {
            _id: data.userId
          }
        };
        updatedEvents.push(event);
        return {
          ...prevState,
          events: updatedEvents
        };
      });
    })
    .catch(err => {
      console.log(err);
    });
};
