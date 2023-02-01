import {  useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getSkills,restoreProcess } from "../../actions/uploadPDF";

const Skill = ({ show, onHide, idToFind, getSkills,skillsPerSubject }) => {
 

  useEffect(() => {
    if(idToFind){
      getSkills(idToFind);
    }
    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps


  }, [idToFind,getSkills]);
  const handleClose = () => {
    onHide();
  };


  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Footer>
          <Modal.Body>
          <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {skillsPerSubject?.map((value,index) => {
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
          <Button variant="secondary" onClick={()=> {handleClose(); restoreProcess(null)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  skillsPerSubject: state?.uploadDocument?.skillList,
});
export default connect(mapStateToProps, { getSkills,restoreProcess })(Skill);
