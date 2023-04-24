import { useEffect, useRef, useState } from "react";
import { deleteSubject, updateSubject } from "../../actions/uploadPDF";
import { Table, Form, Col, Button,Row} from "react-bootstrap";
import { connect } from "react-redux";
import Skills from "../modalsVariables/skills";
import Subject from "../modalsVariables/subject";

const SubjectTable = ({
  SubjectsAndPractice,
  deleteSubject,
  updateSubject,
  statusResultHTTP,
}) => {
  const [modalShowSubject, setModalShowSubject] = useState(false);
  const [modalShowSkill, setModalShowSkill] = useState(false);
  const [enableInputSubject, setEnableInputSubject] = useState(null);
  const [idToFind, setIdToFind] = useState("");
  const updateNameSubject = useRef(null);

  useEffect(() => {
    if (statusResultHTTP === "Deleted_subject") {
    }
  }, [statusResultHTTP]);

  const submitDeleteSubject = (id) => {
    deleteSubject(id);
  };

  const submitUpdateSubject = (idSubject,idPractice) => {
    const body = {
      nameSubject: updateNameSubject.current.value,
      idSubject:idSubject
    };
    updateSubject(body, idPractice);
  };

  return (
    <>
      <Form.Group as={Col} md="8" controlId="validationCustom02">
        <Subject
          show={modalShowSubject}
          onHide={() => setModalShowSubject(false)}
        />
        <Button
          className="btn-success"
          onClick={() => setModalShowSubject(true)}
        >
          Create a new subject
        </Button>
        <br />
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Practice</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {SubjectsAndPractice?.map((fatherValue) => {
              return fatherValue.subjectList?.map((childValue) => {
                return (
                  <tr key={childValue.pk}>
                    <td>
                      {enableInputSubject === childValue.fields.nameSubject ? (
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
                                ref={updateNameSubject}
                                defaultValue={childValue.fields.nameSubject}
                              />
                            </Form.Group>
                          </Row>
                        </>
                      ) : (
                        childValue.fields.nameSubject
                      )}
                    </td>
                    <td>{fatherValue.namePractice}</td>
                    <td>
                      <Button
                        className="btn-primary"
                        onClick={() => {
                          setModalShowSkill(true);
                          setIdToFind(childValue.pk);
                        }}
                      >
                        Skills
                      </Button>{" "}
                      &nbsp;
                      <Button
                        className="btn-danger"
                        onClick={() => {
                          submitDeleteSubject(childValue.pk);
                        }}
                      >
                        Delete
                      </Button>
                      &nbsp;
                      {enableInputSubject === childValue.fields.nameSubject ? (
                        <>
                          <Button
                            className="btn-success"
                            onClick={() => {
                              submitUpdateSubject(childValue.pk,fatherValue.idPractice);
                            }}
                          >
                            Save changes
                          </Button>
                          &nbsp;
                          <Button
                            className="btn-secondary"
                            onClick={() => {
                              setEnableInputSubject(null);
                            }}
                          >
                            Cancel
                          </Button>
                          &nbsp;
                        </>
                      ) : (
                        <>
                          <Button
                            className="btn-warning"
                            onClick={() => {
                              setEnableInputSubject(
                                childValue.fields.nameSubject
                              );
                            }}
                          >
                            Update
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </Table>
      </Form.Group>

      <Skills
        idToFind={idToFind}
        show={modalShowSkill}
        onHide={() => {
          setModalShowSkill(false);
          setIdToFind("");
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
  statusResultHTTP: state?.uploadDocument?.res,
});

export default connect(mapStateToProps, { deleteSubject, updateSubject })(
  SubjectTable
);
