import React from "react";

import "./Modal.scss";

const modal = props => {
  return (
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal__content">{props.children}</section>
      <footer className="modal__actions">
        {props.canCancel && (
          <button type="button" className="btn small" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button
            type="button"
            className="btn primary small"
            onClick={props.onConfirm}
          >
            {props.confirmText}
          </button>
        )}
      </footer>
    </div>
  );
};

export default modal;
