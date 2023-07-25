import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FollowingList({ user }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <p variant="primary" onClick={() => setShow(true)}>
        Following
      </p>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">{console.log(user.following)}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FollowingList;
