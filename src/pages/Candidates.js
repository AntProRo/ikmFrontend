import { useCallback, useEffect, useRef, useState } from "react";
import { deleteCandidate, getCandidates,restoreProcess,restoreStatus200 } from "../actions/uploadPDF";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  Row,
  DropdownButton,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
function Candidates({ getCandidates, candidateList,deleteCandidate,restoreProcess,restoreStatus200,deleteResult}) {
  const [showMore, setShowMore] = useState(false);
  const [list2, setList2] = useState([]);

  /* SEARCH */
  const valueSearch = useRef(null);
  const [mainSearch, setMainSearch] = useState("name");
  const [findItem, setFindItem] = useState("");
  const [moreInfo,setMoreInfo] = useState({})

  /* SEARCH */

  function handleChange() {
    setFindItem(valueSearch.current.value);
  }

  const submitDeleteCandidate =(value)=>{
    deleteCandidate(value)

  }
  useEffect(() => {
    getCandidates();
    if (deleteResult === "deleted") {
      getCandidates();
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
    restoreStatus200(null)
    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMore, list2,getCandidates,restoreStatus200,deleteResult]);

  const handleClose = () => {
    setShowMore(false);
  };

  const findByName = useCallback(() => {
    setMainSearch("name");
  }, []);
  const findByScore = useCallback(() => {
    setMainSearch("score");
  }, []);
  const findByPercentile = useCallback(() => {
    setMainSearch("percentile");
  }, []);

  const filteredData = candidateList?.filter((obj) => {
    //if no input the return the original

    if (mainSearch === "name" && findItem.length !== 0) {
      return obj?.userData.nameCandidate.includes(findItem);
    }

    if (mainSearch === "score" && findItem.length !== 0) {
      return obj?.userData.scoreAssessmentTotal >= parseInt(findItem);
    }

    if (mainSearch === "percentile" && findItem.length !== 0) {
      return obj?.userData.percentile >= findItem;
    }

    if (findItem.length === 0) {
      return obj;
    }

    return obj;
  });

  useEffect(() => {}, [mainSearch,moreInfo,restoreProcess]);

  return (
    <>
      <section className="content-wrap">
        <h1 className="section__title">
          Candidates,
          <span> Ikm results</span>
        </h1>
        <p className="section__desc">
          version 0.1 Alfa, If you have problems with this view, please contact
          technical support.
        </p>

        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={mainSearch}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={findByName}>Name</Dropdown.Item>
            <Dropdown.Item onClick={findByScore}>
              Score, greater than
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={findByPercentile}>
              Percentile, greater than
            </Dropdown.Item>
          </DropdownButton>
          <Form.Control
            aria-label="Text input with dropdown button"
            onChange={handleChange}
            ref={valueSearch}
          />
        </InputGroup>

        <div className="features gridCandidates">
          {filteredData?.map((item, index) => {
            return (
              <div key={index} className="feature feature-one">
                <Modal.Body>
                  <Row className="mb-3">
                    <h2 className="feature__title">
                      {item.userData.nameCandidate}
                    </h2>
                    <p className="feature__desc">
                      <b> Subject Name:</b> {item.userData.subjectName} <br />
                      <b>Candidate created on:</b> {item.userData.createdAt}
                      <br />
                      <b>Percentile:</b> {item.userData.percentile} &nbsp;
                      <b>Score:</b> {item.userData.scoreAssessmentTotal} &nbsp;
                      <b>Date:</b> {item.userData.date} &nbsp;
                    </p>

                    <Modal.Footer>
                      <Button
                        onClick={() => {
                          setShowMore(true);
                          setList2(item.userSkillScore);
                          setMoreInfo(item)
                        }}
                      >
                        see more{" "}
                      </Button>
                      &nbsp;
                      <Button className="danger" onClick={()=> {submitDeleteCandidate(item?.userData?.id)}}>
                        Delete Candidate
                      </Button>
                    </Modal.Footer>
                  </Row>
                </Modal.Body>
              </div>
            );
          })}
        </div>
      </section>

      <Modal show={showMore} onHide={handleClose} size="lg">
        <Modal.Header>
        Name: {moreInfo?.userData?.nameCandidate} <br/>
        Bull horn id: {moreInfo?.userData?.bullHornId}<br/>
        Subject coverage: {moreInfo?.userData?.subjectCoverageTotal}<br/> 
        </Modal.Header>
        <ModalBody>




          {list2.map((item2, index) => {
            return (
              <div key={index}>
                <small>
                  <b> {item2.nameSkill}</b>: {   parseFloat(item2.score).toFixed(2)}
                </small>{" "}
                <br />
              </div>
            );
          })}
        </ModalBody>
        <Modal.Footer>WORK IN PROGRESS</Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  candidateList: state?.uploadDocument?.candidateList,
  deleteResult:state?.uploadDocument?.res
});

export default connect(mapStateToProps, { getCandidates,deleteCandidate,restoreProcess,restoreStatus200 })(Candidates);
