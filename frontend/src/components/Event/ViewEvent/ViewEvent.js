import React from "react";

import Modal from "../../Modal/Modal";
import Backdrop from "../../Backdrop/Backdrop";

const viewEvent = props => {
  return (
    <>
      <Backdrop clickHandler={props.onCancel} />
      <Modal
        title="Event Details"
        canCancel
        canConfirm={props.isLoggedIn}
        confirmText="Book"
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
      >
        <div>
          <h2>{props.selectedEvent.title}</h2>
          <h3>
            ${props.selectedEvent.price} -{" "}
            {new Date(props.selectedEvent.date).toLocaleDateString()}
          </h3>
          <p>{props.selectedEvent.description}</p>
        </div>
      </Modal>
    </>
  );
};

export default viewEvent;
