import { useEffect, useRef, useState } from "react";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";

import { createSubject, restoreStatus200 } from "../../actions/uploadPDF";
import Swal from "sweetalert2";
import { spinnerLoading } from "../../actions/auth";
import Loading from "../LoadingElement/Loading";

const Subject = ({
  show,
  onHide,
  createSubject,

  saveResult,
  spinnerLoading,
  loading,
  restoreStatus200,
  SubjectsAndPractice,
}) => {
  const nameSubject = useRef(null);
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const handleClose = () => {
    onHide();
    setId("");
  };

  useEffect(() => {
    if (saveResult === "Saved_subject") {
      spinnerLoading(false);
      Swal.fire({
        title: "Subject saved!!!",
        text: ``,
        icon: "success",
        timer: "1500",
      });
    }
    if (saveResult === "fail_post_subject") {
      spinnerLoading(false);
      Swal.fire({
        title: "Something was wrong!!!",
        text: `try with another name or select a practice`,
        icon: "error",
      });
    }

    restoreStatus200(null);

    const optionsOPT = SubjectsAndPractice?.map((item, index) => {
      return {
        value: item.idPractice,
        label: item.namePractice,
      };
    });
    setData(optionsOPT);
  }, [saveResult, spinnerLoading, restoreStatus200, SubjectsAndPractice]);

  const saveSubject = () => {
    const body = {
      nameSubject: nameSubject.current.value,
    };

    createSubject(body, id);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>
              <b>What practice does it belong to?: </b>
            </Form.Label>

            <Select
              className="basic-single"
              classNamePrefix="select"
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="color"
              options={data}
              onChange={(selected) => {
                setId(selected.value);
              }}
            />
          </Form.Group>

          {loading.spinnerActivated ? (
            <div className="loading-position">
              <Loading />
            </div>
          ) : (
            <>
              <Row>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>
                    <b>Subject Name: </b>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Type your new subject name"
                    ref={nameSubject}
                  />
                </Form.Group>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveSubject}>
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
  loading: state?.loadingSpinner,
  saveResult: state?.uploadDocument?.res,
});

export default connect(mapStateToProps, {
  createSubject,
  restoreStatus200,
  spinnerLoading,
})(Subject);
