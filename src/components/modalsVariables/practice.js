import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";

import {
  createPractice,
  restoreStatus200,
} from "../../actions/uploadPDF";
import { spinnerLoading } from "../../actions/auth";
import Loading from "../LoadingElement/Loading";
import {GlobalSweetAlert} from "../Alert/SweetAlert";

const Practice = ({
  show,
  onHide,
  createPractice,
  saveResult,
  spinnerLoading,
  loading,
  restoreStatus200,
}) => {
  const namePractice = useRef(null);
  const handleClose = () => {
    onHide();
  };

  const savePractice = () => {
    const body = {
      namePractice: namePractice.current.value,
    };
    createPractice(body);
    spinnerLoading(true);
  };

  useEffect(() => {
    if (saveResult === "Saved_practice") {
      spinnerLoading(false);
      const alertActive = {
      title:"Practice saved!!!",
      message:"",
      typeIcon:"success",
      timerToFinish:1500,
      
      } 
      GlobalSweetAlert(alertActive)
    
    }
    if (saveResult === "fail_post_practice") {
      spinnerLoading(false);
      const alertActive = {
        title:"Something was wrong!!!",
        message:"try with another name",
        typeIcon:"error",
        timerToFinish:1500
        } 
        GlobalSweetAlert(alertActive)
    }
    restoreStatus200(null);
  }, [saveResult, spinnerLoading, restoreStatus200]);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          {
          loading.spinnerActivated ? (
            <div className="loading-position">
              <Loading />
            </div>
          ) : (
            <>
              <Row>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>
                    <b>Practice Name: </b>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Type your new practice name"
                    ref={namePractice}
                  />
                </Form.Group>
              </Row>
            </>
          )
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={savePractice}>
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state?.loadingSpinner,
  saveResult: state?.uploadDocument?.res,
});

export default connect(mapStateToProps, {
  createPractice,
  restoreStatus200,
  spinnerLoading,
})(Practice);
