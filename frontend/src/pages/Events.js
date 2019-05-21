import React from "react";

import AddEvent from "../components/Event/AddEvent/AddEvent";
import getEvents from "../graphql/getEvents";
import AllEvents from "../components/Event/AllEvnets/AllEvents";
import Spinner from "../components/Spinner/Spinner";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: false
    };
  }
  isActive = true;
  componentDidMount = () => {
    getEvents(this);
  };
  componentWillUnmount = () => {
    this.isActive = false;
  };

  render() {
    return (
      <>
        <AddEvent parent={this} />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <AllEvents events={this.state.events} />
        )}
      </>
    );
  }
}

export default Events;
