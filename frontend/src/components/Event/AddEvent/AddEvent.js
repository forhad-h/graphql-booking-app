import React from "react";

import AuthContext from "../../../context/authContext";
import Modal from "../../Modal/Modal";
import Backdrop from "../../Backdrop/Backdrop";
import createEvent from "../../../graphql/createEvent";

import "./AddEvents.scss";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false
    };
    this.titleElm = React.createRef();
    this.priceElm = React.createRef();
    this.dateElm = React.createRef();
    this.descElm = React.createRef();
  }

  static contextType = AuthContext;

  modalOpenHandler = () => {
    this.setState({ creating: true });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  modalConfirmHandler = () => {
    const title = this.titleElm.current.value;
    const price = +this.priceElm.current.value;
    const date = this.dateElm.current.value;
    const description = this.descElm.current.value;

    //more validation should be implemented
    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    const token = this.context.token;
    const userId = this.context.userId;
    const event = { token, userId, title, price, date, description };
    createEvent(this.props.parent, event);
    this.setState({ creating: false });
  };
  render() {
    const addEventForm = (
      <form>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            ref={this.titleElm}
            placeholder="Add title"
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            ref={this.priceElm}
            placeholder="Add price"
          />
        </div>

        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            ref={this.dateElm}
            placeholder="Add date"
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            type="number"
            rows="4"
            id="description"
            ref={this.descElm}
            placeholder="Add description"
          />
        </div>
      </form>
    );
    return (
      <>
        {this.state.creating && (
          <>
            <Backdrop clickHandler={this.modalCancelHandler} />
            <Modal
              title="Create Event"
              canCancel
              canConfirm
              confirmText="Confirm"
              onCancel={this.modalCancelHandler}
              onConfirm={this.modalConfirmHandler}
            >
              {addEventForm}
            </Modal>
          </>
        )}
        {this.context.isLoggedIn && (
          <div className="events-control">
            <h3>Share your own events</h3>
            <button
              type="button"
              className="btn primary"
              onClick={this.modalOpenHandler}
            >
              Create Event
            </button>
          </div>
        )}
      </>
    );
  }
}
export default AddEvent;
