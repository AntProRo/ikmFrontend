import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import SubjectTable from "../components/tableVariables/subject";
import PracticeTable from "../components/tableVariables/practice";

import {
  getPracticesAndSubjects,
  deletePractice,
  restoreStatus200,
  restoreSkills,
} from "../actions/uploadPDF";

const Variables = () => {
  return (
    <>
      <section className="content-wrap">
        <p className="section__desc">
          Create new practices, subjects and skills for your analysis of IKM.
        </p>
        <Tabs
          defaultActiveKey="practice"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="practice" title="Practice">
            <PracticeTable />
          </Tab>
          <Tab eventKey="subject" title="Subjects">
            <SubjectTable />
          </Tab>
        </Tabs>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
  statusResultHTTP: state?.uploadDocument?.res,
});

export default connect(mapStateToProps, {
  getPracticesAndSubjects,
  deletePractice,
  restoreStatus200,
  restoreSkills,
})(Variables);
