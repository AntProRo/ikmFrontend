import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Table, Form, Col, Button,Row } from "react-bootstrap";
import {
  getPracticesAndSubjects,
  restoreSkills,
  deletePractice,
  restoreStatus200,
  updatePractice
} from "../../actions/uploadPDF";

import Swal from "sweetalert2";
import Practice from "../modalsVariables/practice";

const PracticeTable = ({
  restoreStatus200,
  getPracticesAndSubjects,
  restoreSkills,
  deletePractice,
  SubjectsAndPractice,
  statusResultHTTP,
  updatePractice
}) => {
  const [modalShowPractice, setModalShowPractice] = useState(false);
  const [enableInputPractice, setEnableInputPractice] = useState(null);
  const updateNamePractice = useRef(null);

  const activateAlert = (title, message, typeIcon, timerToFinish) => {
    Swal.fire({
      title: `${title}!!!`,
      text: `${message}`,
      icon: `${typeIcon}`,
      timer: `${timerToFinish}`,
    });
  };

  useEffect(() => {
    getPracticesAndSubjects();
    if (statusResultHTTP === "deleted_practice") {
      activateAlert("Practice deleted!!!", "", "success", 1500);
    }
    if (statusResultHTTP === "fail_delete_practice") {
      activateAlert("Something was wrong!!!", "", "error", 1500);
    }
    restoreStatus200(null);
  }, [
    getPracticesAndSubjects,
    restoreSkills,
    restoreStatus200,
    statusResultHTTP,
  ]);

  const submitDeletePractice = (value) => {
    /* restoreSkills([]); */
    deletePractice(value);
  };

  const submitUpdatePractice = (idPractice) => {
    const body = {
      namePractice: updateNamePractice.current.value,
    };
    updatePractice(body, idPractice);
  };

  return (
    <>
      <Form.Group as={Col} md="12" controlId="validationCustom02">
        <Practice
          show={modalShowPractice}
          onHide={() => setModalShowPractice(false)}
        />
        <Button
          className="btn-success"
          onClick={() => setModalShowPractice(true)}
        >
          Create a new practice
        </Button>
        <br />
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Practice</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {SubjectsAndPractice?.map((value) => {
              return (
                <tr key={value.idPractice}>
                  <td>
                    {enableInputPractice === value.namePractice ? (
                      <>
                        <Row>
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>
                              <b>Update this Practice:</b>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="update this practice"
                              ref={updateNamePractice}
                              defaultValue={value?.namePractice}
                            />
                          </Form.Group>
                        </Row>
                      </>
                    ) : (
                        value.namePractice
                    )}
                  </td>

                  <td>
                    <Button
                      className="btn-danger"
                      onClick={() => {
                        submitDeletePractice(value.idPractice);
                      }}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    {enableInputPractice === value.namePractice ? (
                      <>
                        <Button
                          className="btn-success"
                          onClick={() => {
                            submitUpdatePractice(value.idPractice);
                          }}
                        >
                          Save changes
                        </Button>
                        &nbsp;
                        <Button
                          className="btn-secondary"
                          onClick={() => {
                            setEnableInputPractice(null);
                          }}
                        >
                          Cancel
                        </Button>&nbsp;
                      </>
                    ) : (
                      <>
                        <Button
                          className="btn-warning"
                          onClick={() => {
                            setEnableInputPractice(value.namePractice);
                          }}
                        >
                          Update
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Form.Group>
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
  statusResultHTTP: state?.uploadDocument?.res,
});

export default connect(mapStateToProps, {
  restoreStatus200,
  getPracticesAndSubjects,
  deletePractice,
  restoreSkills,
  updatePractice,
})(PracticeTable);
