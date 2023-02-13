import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import Loading from "../LoadingElement/Loading";
import { spinnerLoading } from "../../actions/auth";
import { saveDocument, restoreProcess } from "../../actions/uploadPDF";
import Swal from "sweetalert2";

const ModalGraphResultSubject = ({
  show,
  onHide,
  loading,
  SubjectResult,
  spinnerLoading,
  saveDocument,
  restoreProcess,
  saveResult,
}) => {
  /* 🔥🔥 Graph Configurations 🔥🔥 */
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
  );
  /* 📝 Add labels to each bar */
  const updateTemplate = useRef(null);
  /* Bar */
  const [labels, setLabels] = useState();
  const [scoreBar, setScoreBar] = useState([]);
  const [colors, setColors] = useState(null);
  /* Circle */
  const [scoreBarCircle] = useState([]);
  /* Set data for Bar graph */
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Subject Analysis",
        data: scoreBar,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  /* SPINNER LOADING */

  /* 🔥🔥 Graph Configurations 🔥🔥 */

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Result:",
      },
    },
  };

  /*  🔥🔥 Graph Configurations 🔥🔥*/
  useEffect(() => {

    setColors(
      SubjectResult?.scoreBar?.map((item, index) => {
        let result;
        let value = (item / 1900) * 100;
        if (value > 100) {
          value = 100;
        }

        if (value >= 0 && value <= 35) {
          result = "rgb(255, 99, 71)";
        }
        if (value > 35 && value <= 70) {
          result = "rgb(255, 165, 0)";
        }
        if (value > 70 && value <= 100) {
          result = "rgb(60, 179, 113)";
        }
        return result;
      })
    );

    setScoreBar(
      SubjectResult?.scoreBar?.map((item, index) => {
        let result = (item / 1900) /* 51923.5 */ * 100;
        if (result > 100) {
          result = 100;
        }
        return result;
      })
    );

    setLabels(
      SubjectResult?.concepts?.map((item, index) => {
        return item.value;
      })
    );

    /* CIRCLE GRAPH */

    spinnerLoading(false);
    /* FILE SAVED SUCCESS */
    if (saveResult === "Saved") {
      Swal.fire({
        title: "Saved result!!!",
        text: ``,
        icon: "success",
        timer: "1500",
      });
      restoreProcess(null);
    }

    // eslint-disable-next-line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubjectResult, saveResult]);

  useEffect(() => {
    /* Set default BarGraph */

    setData({
      labels,
      datasets: [
        {
          label: "Subject Analysis",
          data: scoreBar,
          backgroundColor: colors,
        },
      ],
    });
  }, [labels, scoreBar, scoreBarCircle, SubjectResult, colors]);

  const nameCandidateRef = useRef(null);
  const bullHornIdRef = useRef(null);
  const dateRef = useRef(null);
  const subjectRef = useRef(null);
  const scoreRef = useRef(null);
  const clientRef = useRef(null);
  const percentileRef = useRef(null);
  const subjectCoverageRef = useRef(null);

  function convertToObj(a, b) {
    if (a.length !== b.length || a.length === 0 || b.length === 0) {
      return null;
    }

    // Using Object.assign method
    return Object.assign(...a.map((k, i) => ({ [k]: b[i] })));
  }

  const saveData = async (e) => {
    e.preventDefault();
    spinnerLoading(true);

    const body = {
      nameCandidate: nameCandidateRef.current.value,
      date: dateRef.current.value,
      bullHornId: bullHornIdRef.current.value,
      subjectName: subjectRef.current.value,
      scoreAssessmentTotal: scoreRef.current.value,
      client: clientRef.current.value,
      percentile: percentileRef.current.value,
      subjectCoverageTotal: subjectCoverageRef.current.value,
      /* Second table */
      skills: convertToObj(data.labels, data.datasets[0].data),
    };
    saveDocument(body);
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <div ref={updateTemplate}>
          {loading.spinnerActivated ? (
            <div className="loading-position">
              <Loading />
            </div>
          ) : (
            <>
              <Form id="formTemplate">
                <Modal.Header closeButton>
                  <Modal.Title>User Result </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    maxHeight: "calc(100vh - 210px)",
                    overflowY: "auto",
                  }}
                >
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>
                        <b>Candidate Name:</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        defaultValue={SubjectResult?.dataMiner[0]?.subjectName}
                        name="userName"
                        ref={nameCandidateRef}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>
                        <b>ID:</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="ID"
                        defaultValue={SubjectResult?.dataMiner[1]?.subjectId}
                        name="bullHornId"
                        ref={bullHornIdRef}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>
                        <b>Date:</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        placeholder="Date"
                        name="data"
                        ref={dateRef}
                        defaultValue={
                          SubjectResult?.dataMiner[2]?.subjectDate
                            ? new Date(SubjectResult?.dataMiner[2]?.subjectDate)
                                .toISOString()
                                .split("T")[0]
                            : new Date("24 September 2022 15:30 UTC")
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="7" controlId="validationCustom02">
                      <Form.Label>
                        <b>Subject:</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Subject"
                        defaultValue={
                          SubjectResult?.dataMiner[3]?.subjectInterViewName
                        }
                        ref={subjectRef}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>
                        <b>Score:</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Score"
                        defaultValue={SubjectResult?.dataMiner[5]?.subjectScore}
                        ref={scoreRef}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>
                        <b>Client: </b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Client"
                        defaultValue={
                          SubjectResult?.dataMiner[4]?.subjectClient
                        }
                        ref={clientRef}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>
                        <b>Percentile:</b>
                      </Form.Label>
                      <Form.Control
                        ref={percentileRef}
                        required
                        type="number"
                        placeholder="Percentile"
                        defaultValue={
                          SubjectResult?.dataMiner[6]?.subjectPercentile
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>
                        <b>Subject Coverage:</b>
                      </Form.Label>
                      <Form.Control
                        ref={subjectCoverageRef}
                        required
                        type="number"
                        placeholder="Subject Coverage"
                        defaultValue={
                          SubjectResult?.dataMiner[7]?.subjectSubjectCoverage ||
                          0
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Bar options={optionsBar} data={data} />
                </Modal.Body>
              </Form>
            </>
          )}
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {SubjectResult ? (
            <Button variant="primary" onClick={saveData}>
              Save this Candidate result &#128194;
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => ({
  SubjectResult: state?.uploadDocument?.dataFile || null,
  loading: state?.loadingSpinner,
  saveResult: state?.uploadDocument?.processResult,
});
export default connect(mapStateToProps, {
  saveDocument,
  restoreProcess,
  spinnerLoading,
})(ModalGraphResultSubject);
