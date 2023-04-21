import {  useEffect, useState } from "react";
import { Table, Form, Col, Button} from "react-bootstrap";
import { connect } from "react-redux";
import Practice from "../components/modalsVariables/practice";
import { getPracticesAndSubjects,deletePractice,restoreStatus200,restoreSkills } from "../actions/uploadPDF";
import Swal from "sweetalert2";

/**
 * Component used for managing practices within the IKM WEB application
 * @param {*} param0 
 * @returns 
 */
const Practices = ({
    SubjectsAndPractice,
    deletePractice,
    deleteResult,
    restoreStatus200, 
    restoreSkills}) => {
    const [modalShowPractice, setModalShowPractice] = useState(false);
    const submitDeletePractice = (value)=> {
        deletePractice(value)
        restoreSkills(null);
    }

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

    return <Form.Group as={Col} md="3" controlId="validationCustom02">
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
                    <th colSpan={2} style={{textAlign: "center"}}>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {SubjectsAndPractice?.map((value) => {
                    return (
                        <tr key={value.idPractice}>
                        <td>{value.namePractice}</td>
                        <td style={{textAlign: "center"}}>
                            <Button className="btn-success">
                            Edit</Button>
                        </td>
                        <td style={{textAlign: "center"}}>
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
}

const mapStateToProps = (state) => ({
    SubjectsAndPractice: state?.uploadDocument?.processResult,
    deleteResult:state?.uploadDocument?.res
  });

  export default connect(mapStateToProps, { getPracticesAndSubjects,deletePractice,restoreStatus200,restoreSkills})(
    Practices
  );