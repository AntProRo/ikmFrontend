import { useEffect, useRef, useState } from "react";
import { Button, Modal, Row, Form, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getSkills,
  restoreSkills,
  restoreStatus200,
  createSkill,
  deleteSkill,
  updateSkill,
} from "../../actions/uploadPDF";
import Swal from "sweetalert2";
import { spinnerLoading } from "../../actions/auth";
import Loading from "../LoadingElement/Loading";

const Skill = ({
  show,
  onHide,
  idToFind,
  getSkills,
  skillsPerSubject,
  restoreSkills,
  restoreStatus200,
  createSkill,
  deleteSkill,
  updateSkill,
  statusResult,
  loading,
}) => {
  const nameSkill = useRef(null);
  const updateNameSkill = useRef(null);
  const [enableInput, setEnableInput] = useState(null);

  const activateAlert = (title, message, typeIcon, timerToFinish) => {
    Swal.fire({
      title: `${title}!!!`,
      text: `${message}`,
      icon: `${typeIcon}`,
      timer: `${timerToFinish}`,
    });
  };

  useEffect(() => {
    if (idToFind) {
      getSkills(idToFind);
    }
    if (statusResult === "Saved_skill") {
      activateAlert("Skill saved!!!", "", "success", 1500);
    }
    if (statusResult === "Updated_skill") {
      activateAlert("Skill updated!!!", "", "success", 1500);
    }
    if (statusResult === "deleted_skill") {
      activateAlert("Skill deleted!!!", "", "success", 1500);
    }
    if (statusResult === "fail_post_skill") {
      activateAlert(
        "Something was wrong!!!",
        "try with another name",
        "error",
        1500
      );
    }

    restoreStatus200(null);
  }, [statusResult, restoreStatus200, idToFind, getSkills]);

  const handleClose = () => {
    onHide();
    setEnableInput(null);
    restoreSkills([])
 
    /* delete this code  restoreSkills(null) */
  };

  const submitDeleteSkill = (id) => {
    deleteSkill(id);
  };

  const saveSkillPerSubject = () => {
    const body = {
      nameSubSkill: nameSkill.current.value,
    };
    createSkill(body, idToFind);
  };

  const updateSkillPerSubject = (idSkill) => {
    const body = {
      nameSubSkill: updateNameSkill.current.value,
      idSkill: idSkill,
    };
    updateSkill(body, idToFind);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Footer>
          <Modal.Body>
            {loading.spinnerActivated ? (
              <div className="loading-position">
                <Loading />
              </div>
            ) : (
              <>
                <Row>
                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>
                      <b>Skill Name: </b>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Update this practice name"
                      ref={nameSkill}
                    />
                  </Form.Group>
                </Row>
              </>
            )}
            <br />

            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {skillsPerSubject?.map((value, index) => {
                  return (
                    <tr key={value?.id}>
                      <td>
                        {enableInput === value?.name ? (
                          <>
                            <Row>
                              <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                              >
                                <Form.Label>
                                  <b>Update this skill:</b>
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Type your new practice name"
                                  ref={updateNameSkill}
                                  defaultValue={value?.name}
                                />
                              </Form.Group>
                            </Row>
                          </>
                        ) : (
                          value?.name
                        )}
                      </td>
                      <td>
                        <Button
                          className="btn-danger"
                          onClick={() => {
                            submitDeleteSkill(value?.id);
                          }}
                        >
                          Delete
                        </Button>
                        &nbsp;
                        {enableInput === value?.name ? (
                          <>
                            <Button
                              className="btn-success"
                              onClick={() => {
                                updateSkillPerSubject(value.id);
                              }}
                            >
                              Save changes
                            </Button>
                            &nbsp;
                            <Button
                              className="btn-secondary"
                              onClick={() => {
                                setEnableInput(null);
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              className="btn-warning"
                              onClick={() => {
                                setEnableInput(value?.name);
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
          </Modal.Body>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveSkillPerSubject}>
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  skillsPerSubject: state?.uploadDocument?.skillList,
  loading: state?.loadingSpinner,
  statusResult: state?.uploadDocument?.res,
});
export default connect(mapStateToProps, {
  getSkills,
  restoreSkills,
  restoreStatus200,
  createSkill,
  deleteSkill,
  updateSkill,
  spinnerLoading,
})(Skill);
