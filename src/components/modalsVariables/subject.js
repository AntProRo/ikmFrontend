import { Button, Modal } from "react-bootstrap";

const Subject = ({ show, onHide }) => {
  const handleClose = () => {
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Subject;
