import {  useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import Practices from "./Practices";
import { restoreStatus200,restoreSkills } from "../actions/uploadPDF";
import Subjects from "./Subjects";

const Variables = ({
  restoreStatus200, restoreSkills
}) => {
  
  useEffect(() => {
    restoreStatus200(null);
  }, [restoreStatus200,restoreSkills]);


  return (
    <>
      <section className="content-wrap">
        <p className="section__desc">
          Create new practices, subjects and skills for your analysis of IKM.
        </p>
        <Tabs
          defaultActiveKey="practices"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
      <Tab eventKey="practices" title="Practices">
        <p>Manage the practices. If you want to add a new practice clic on button "Create a new practice"</p>
        <Practices />
      </Tab>
      <Tab eventKey="subjects" title="Subjects">
      <p>Manage the subjects. If you want to add a new subject clic on button "Create a new subject"</p>
        <Subjects />
      </Tab>
    </Tabs>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
  deleteResult:state?.uploadDocument?.res
});

export default connect(mapStateToProps, { restoreStatus200,restoreSkills})(
  Variables
);
