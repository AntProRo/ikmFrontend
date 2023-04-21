import {  useEffect, useState } from "react";
import { Table, Form, Col, Button} from "react-bootstrap";
import { connect } from "react-redux";
import { getPracticesAndSubjects,deletePractice,restoreStatus200,restoreSkills } from "../actions/uploadPDF";
import Subject from "../components/modalsVariables/subject";
import Skill from "../components/modalsVariables/skills";
import Swal from "sweetalert2";

const Subjects = ({
    getPracticesAndSubjects,
    SubjectsAndPractice,
    deleteResult
}) => {
    const [modalShowSubject, setModalShowSubject] = useState(false);
    const [modalShowSkill, setModalShowSkill] = useState(false);
    const [idToFind,setIdToFind] = useState('');

    useEffect(() => {
        getPracticesAndSubjects();
    
        if (deleteResult === "deleted") {
          getPracticesAndSubjects();
          Swal.fire({
            title: "Practice deleted!!!",
            text: ``,
            icon: "success",
            timer: "1500",
          });
        }
        if (deleteResult === "fail_delete_practice") {
          
          Swal.fire({
            title: "Something was wrong!!!",
            text: ``,
            icon: "error",
          });
        }
    
        restoreStatus200(null);
    
      }, [getPracticesAndSubjects,restoreStatus200,deleteResult,restoreSkills]);

    return <Form.Group as={Col} md="9" controlId="validationCustom02">
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
          <th style={{textAlign: "center"}} colSpan={2}>Options</th>
        </tr>
      </thead>
      <tbody>
       {SubjectsAndPractice?.map((fatherValue) => {
          return fatherValue.subjectList?.map((childValue) => {
            return (
              <tr key={childValue.pk}>
                <td>{childValue.fields.nameSubject}</td>
                <td>{fatherValue.namePractice}</td>
                <td style={{textAlign: "center"}}>
                  <Button
                    className="btn-primary"
                    onClick={() => {setModalShowSkill(true);setIdToFind(childValue.pk)}}
                  >
                    Skills
                  </Button>{" "}
                  </td>
                        <td style={{textAlign: "center"}}>
                  <Button className="btn-danger" disabled>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          });
        })} 
      </tbody>
    </Table>
    <Skill idToFind = {idToFind} show={modalShowSkill} onHide={() => setModalShowSkill(false)} />
  </Form.Group>

}
const mapStateToProps = (state) => ({
    SubjectsAndPractice: state?.uploadDocument?.processResult,
    deleteResult:state?.uploadDocument?.res
  });

export default connect(mapStateToProps, { getPracticesAndSubjects,deletePractice,restoreStatus200,restoreSkills})(
    Subjects
  );