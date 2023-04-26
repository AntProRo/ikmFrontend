import { useCallback, useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";



const SelectCrop = ({ SubjectsAndPractice,idSubject,setIdSubject,callback,activated }) => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  
  const [subjectList, setSubjectList] = useState([]);
  const [d, setD] = useState(null);
  


  
  const handleCallback = () =>callback(d) 
  const handleCallback2 = () => activated(true);
/*   const handleCallback2 = () => callback("s3343"); */

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
            cropCoordinates: {
              height: item.fields.height,
              nameSubject: item.fields.nameSubject,
              unit: item.fields.unit,
              width: item.fields.width,
              x: item.fields.x,
              y: item.fields.y,
            },
          };
        })
      );
    }
  }, [id ]);

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
  }, [SubjectsAndPractice, innerFunction,idSubject,d]);

  useEffect(()=>{
    handleCallback(d)
    if(d !== null){
      handleCallback2()
    }
  })



 

  return (
    <>
      <Form.Group as={Col} controlId="validationCustom01">
        <Form.Label>
          <b>Select the practice: </b>
         
    {/*       <Button onClick={handleCallback}>Save Crop</Button>
          <Button onClick={handleCallback2}>press 2</Button> */}
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
          <b>Select the subject: </b>
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
            setD(selected.cropCoordinates);
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
