import { Button, Col, Form,  Modal, Row } from "react-bootstrap";
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
import { Bar, PolarArea } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import Loading from "../LoadingElement/Loading";
import { spinnerLoading } from "../../actions/auth";

const ModalGraphResultSubject = ({
  show,
  onHide,
  loading,
  SubjectResult,
  spinnerLoading,
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
  /*  */
  const updateTemplate = useRef(null);

  /* Bar */
  const [labels, setLabels] = useState();
  const [scoreBar, setScoreBar] = useState([]);
  /* Circle */
  const [scoreBarCircle, setScoreBarCircle] = useState([]);


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

  /* Set data for  Circle graph */
  const [dataCircle, setDataCircle] = useState({
    labels: ["None"],
    datasets: [
      {
        label: `Subject Coverage: ${SubjectResult?.dataMiner[7]?.subjectSubjectCoverage || 0 } `,
        data: scoreBarCircle,
        backgroundColor: ["rgba(224, 0, 25, 0.8)"],
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

  const optionsArea = {
    type: "polarArea",
    data: dataCircle,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Subject Coverage",
        },
      },
    },
  };
  /*  🔥🔥 Graph Configurations 🔥🔥*/

  useEffect(() => {
    setScoreBar(
      SubjectResult?.scoreBar?.map((item, index) => {
        let result = (item / 51923.5) * 100;
        return result;
      })
    );

    setLabels(
      SubjectResult?.concepts?.map((item, index) => {
        return item.value;
      })
    );

    /* CIRCLE GRAPH */

    let valuesCircle = [];
    SubjectResult?.subjectCoverage.map((item, index) => {
      return valuesCircle.push(item.value);
    });
    valuesCircle = valuesCircle.filter((item) => item !== 0);
    setScoreBarCircle(valuesCircle);
    
    spinnerLoading(false);
    // eslint-disable-next-line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubjectResult]);

  useEffect(() => {
    /* Set default BarGraph */
    setData({
      labels,
      datasets: [
        {
          label: "Subject Analysis",
          data: scoreBar,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });

    scoreBarCircle.length === 3
      ? setDataCircle({
          labels: ["Week", "Proficient", "Strong"],
          datasets: [
            {
              label: `Subject Coverage, ${SubjectResult?.dataMiner[7]?.subjectSubjectCoverage || 0 }, This area`,
              data: scoreBarCircle,

              backgroundColor: [
                "rgba(224, 0, 25, 0.8)",
                "rgba(253, 156, 12, 0.8)",
                "rgba(2, 194, 68, 0.8)",
              ],
            },
          ],
        })
      : setDataCircle({
          labels: ["Week", "Proficient"],
          datasets: [
            {
              label: `Subject Coverage: ${SubjectResult?.dataMiner[7]?.subjectSubjectCoverage  || 0 },This area`,
              data: scoreBarCircle,

              backgroundColor: [
                "rgba(224, 0, 25, 0.8)",
                "rgba(253, 156, 12, 0.8)",
              ],
            },
          ],
        });
  }, [labels, scoreBar, scoreBarCircle,SubjectResult]);

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
                      <Form.Label><b>Name:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        defaultValue={SubjectResult?.name}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><b>ID:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="ID"
                        defaultValue={SubjectResult?.dataMiner[1]?.subjectId}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><b>Date:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Date"
                        defaultValue={SubjectResult?.dataMiner[2]?.subjectDate}
                      />
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">

                    <Form.Group as={Col} md="7" controlId="validationCustom02">
                      <Form.Label><b>Subject:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Subject"
                        defaultValue={SubjectResult?.dataMiner[3]?.subjectInterViewName}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><b>Score:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Score"
                        defaultValue={SubjectResult?.dataMiner[5]?.subjectScore}
                      />
                    </Form.Group>

                    </Row>

                    <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label><b>Client: </b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Client"
                        defaultValue={SubjectResult?.dataMiner[4]?.subjectClient}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><b>Percentile:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Percentile"
                        defaultValue={SubjectResult?.dataMiner[6]?.subjectPercentile }
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><b>Subject Coverage:</b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Subject Coverage"
                        defaultValue={SubjectResult?.dataMiner[7]?.subjectSubjectCoverage }
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label><b>Work Speed/Accuracy: </b></Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Work Speed/Accuracy"
                        defaultValue={SubjectResult?.FooterLevel[0]?.value}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><b>Application Ability :</b> </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Application Ability"
                        defaultValue={SubjectResult?.FooterLevel[1]?.value}
                      />
                    </Form.Group>
                  </Row>
                  <Bar options={optionsBar} data={data} />

                  <PolarArea options={optionsArea} data={dataCircle} />

                  
                </Modal.Body>
              </Form>
            </>
          )}
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Export Data
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => ({
  SubjectResult: state?.uploadDocument?.data || null,
  loading: state?.loadingSpinner,
});
export default connect(mapStateToProps, { spinnerLoading })(
  ModalGraphResultSubject
);
