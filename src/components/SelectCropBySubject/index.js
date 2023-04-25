import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";

const SelectCrop = ({ SubjectsAndPractice }) => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [idSubject, setIdSubject] = useState(null);
  const [subjectList, setSubjectList] = useState([]);

  const innerFunction = useCallback(() => {
    if (id != null) {
      const found = SubjectsAndPractice.find(
        (element) => element.idPractice === id
      );

      setSubjectList(
        found.subjectList?.map((item, index) => {
          return {
            value: item.pk,
            label: item.fields.nameSubject,
          };
        })
      );
    }

    setIdSubject(null);
  }, [id, idSubject]);

  useEffect(() => {
    setData(
      SubjectsAndPractice?.map((item, index) => {
        return {
          value: item.idPractice,
          label: item.namePractice,
        };
      })
    );

    innerFunction();
  }, [SubjectsAndPractice, innerFunction]);

  console.log(idSubject);
  return (
    <>
      <Form.Group as={Col} controlId="validationCustom01">
        <Form.Label>
          <b>Select the practice: {idSubject}</b>
        </Form.Label>

        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="color"
          options={data}
          onChange={(selected) => {
            setId(selected.value);
          }}
        />

        <br />
        <Form.Label>
          <b>Select the subject: {idSubject}</b>
        </Form.Label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="color"
          options={subjectList}
          onChange={(selected) => {
            setIdSubject(selected.value);
          }}
        />
      </Form.Group>
    </>
  );
};

const mapStateToProps = (state) => ({
  SubjectsAndPractice: state?.uploadDocument?.processResult,
});

export default connect(mapStateToProps, {})(SelectCrop);
