import React from "react";
import { Modal } from "react-bootstrap";
import licenseFront from "../../../../../../src/assests/images/license-front.png";
import licenseBack from "../../../../../../src/assests/images/licenseback.png";

const InstructionModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Uploading Photo Instructions</Modal.Title>
      </Modal.Header>

      <Modal.Body className="liscense-body-main px-3">
        <div className="read-inst">
          <div className="row gx-4">
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-between mb-3 mb-md-0">
              <div className="inst-des mb-3">
                <p>
                  Please take photo of your card like it is shown in the examples below
                </p>
              </div>
              <div className="instruction-image">
                <img
                  src={licenseFront}
                  alt="Front Side"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="inst-des mb-3">
                <p>
                  Use landscape orientation and ensure your card is clearly readable
                </p>
              </div>
              <div className="instruction-image">
                <img
                  src={licenseBack}
                  alt="Back Side"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn-modal btn btn-primary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstructionModal;
