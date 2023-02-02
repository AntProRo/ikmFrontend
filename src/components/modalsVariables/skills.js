import { useEffect, useRef } from "react";
import { Button, Modal, Row, Form, Col,Table } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getSkills,
  restoreSkills,
  restoreStatus200,
  createSkill,
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
  saveResult,
  loading,
}) => {
  const nameSkill = useRef(null);



  useEffect(() => {
    if (idToFind) {
      getSkills(idToFind);
    }

    if (saveResult === "Saved") {
      
      Swal.fire({
        title: "Skill saved!!!",
        text: ``,
        icon: "success",
        timer: "1500",
      });
    }
    if (saveResult === "fail_post_skill") {
     
      Swal.fire({
        title: "Something was wrong!!!",
        text: `try with another name`,
        icon: "error",
      });
    }

    restoreStatus200(null);


  }, [saveResult,restoreStatus200 ,idToFind, getSkills]);

  const handleClose = () => {
    onHide();
    restoreSkills(null)
  };


  
  const saveSkillPerSubject = () => {
    const body = {
      nameSubSkill: nameSkill.current.value,
    };

    createSkill(body, idToFind);

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
                          placeholder="Type your new practice name"
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
                      <td>{value?.name}</td>
                      <td>
                        <Button className="btn-danger" disabled>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
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
  saveResult: state?.uploadDocument?.res,
});
export default connect(mapStateToProps, {
  getSkills,
  restoreSkills,
  restoreStatus200,
  createSkill,
  spinnerLoading,
})(Skill);
