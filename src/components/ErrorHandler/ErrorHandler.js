import React, { Fragment } from "react";

import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";

const errorHandler = (props) => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="Ein Fehler aufgetreten"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p>{props.error.message}</p>
      </Modal>
    )}
  </Fragment>
);

export default errorHandler;
