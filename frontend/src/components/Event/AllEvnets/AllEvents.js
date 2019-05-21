import React from "react";

import AuthContext from "../../../context/authContext";
import ViewEvent from "../ViewEvent/ViewEvent";
import bookEvent from "../../../graphql/bookEvent";
import "./AllEvents.scss";

class AllEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: null
    };
  }

  static contextType = AuthContext;

  isCurrentUser = userId => {
    return this.context.userId === userId ? true : false;
  };

  selectedEventHandler = eventId => {
    this.setState({
      selectedEvent: this.props.events.find(e => e._id === eventId)
    });
  };

  viewCancelHandler = () => {
    this.setState({ selectedEvent: null });
  };

  viewConfirmHandler = () => {
    if (this.state.selectedEvent) {
      bookEvent({
        token: this.context.token,
        eventId: this.state.selectedEvent._id
      });
    }
    this.setState({ selectedEvent: null });
  };

  render() {
    const eventList = this.props.events.map(event => {
      return (
        <li key={event._id} className="events__list-item">
          <div>
            <h2>{event.title}</h2>
            <h3>
              ${event.price} - {new Date(event.date).toLocaleDateString()}
            </h3>
          </div>
          <div>
            {!this.isCurrentUser(event.creator._id) ? (
              <button
                type="button"
                className="btn primary small"
                onClick={this.selectedEventHandler.bind(this, event._id)}
              >
                View details
              </button>
            ) : (
              <p>You are the owner of this event.</p>
            )}
          </div>
        </li>
      );
    });
    const viewEvent = (
      <ViewEvent
        selectedEvent={this.state.selectedEvent}
        onCancel={this.viewCancelHandler}
        onConfirm={this.viewConfirmHandler}
        isLoggedIn={this.context.isLoggedIn}
      />
    );
    return (
      <>
        <ul className="events__list">{eventList}</ul>
        {this.state.selectedEvent && viewEvent}
      </>
    );
  }
}
export default AllEvents;
