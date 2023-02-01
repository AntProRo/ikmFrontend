import {  useEffect, useState } from "react";
import { Table, Row, Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Practice from "../components/modalsVariables/practice";
import Skill from "../components/modalsVariables/skills";
import Subject from "../components/modalsVariables/subject";
import { getPracticesAndSubjects,deletePractice,restoreStatus200 } from "../actions/uploadPDF";
import Swal from "sweetalert2";

const Variables = ({
  SubjectsAndPractice,
  getPracticesAndSubjects,
  deletePractice,
  deleteResult,
  restoreStatus200
}) => {
  const [modalShowPractice, setModalShowPractice] = useState(false);
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

  }, [getPracticesAndSubjects,restoreStatus200,deleteResult]);

  const submitDeletePractice = (value)=> {
    deletePractice(value)
  }

/* res = [
  {
    practica:'react',
    examenes:[{name:'react1'},{name:'react2',skills:['hooks','redux']
  
  }]
  }, 
  
  {
    practica:'java',
    examenes:[{name:'java1'},{name:'java2'}] 
  }
] */



  return (
    <>
      <section className="content-wrap">
        <p className="section__desc">
          Create new practices, subjects and skills for your analysis of IKM.
        </p>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom02">
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
                      <td>{value.namePractice}</td>
                      <td>
                        <Button className="btn-danger" onClick={()=> {submitDeletePractice(value.idPractice)}}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Form.Group>

          <Form.Group as={Col} md="9" controlId="validationCustom02">
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
                        <td>{childValue.fields.nameSubject}</td>
                        <td>{fatherValue.namePractice}</td>
                        <td>
                          <Button
                            className="btn-primary"
                            onClick={() => {setModalShowSkill(true);setIdToFind(childValue.pk)}}
                          >
                            Skills
                          </Button>{" "}
                          &nbsp;
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
          </Form.Group>
        </Row>
      </section>

      <Skill idToFind = {idToFind} show={modalShowSkill} onHide={() => setModalShowSkill(false)} />
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
  deleteResult:state?.uploadDocument?.res
});

export default connect(mapStateToProps, { getPracticesAndSubjects,deletePractice,restoreStatus200})(
  Variables
);
