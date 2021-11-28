import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Register Process
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Verifying Details....Please wait
          </p>
        </Modal.Body>
      </Modal>
    );
}

export default CustomModal;