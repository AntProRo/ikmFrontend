import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { spinnerLoading,actionSuccessAlert } from "../actions/auth";
import { postDocument } from "../actions/uploadPDF";
import ModalGraphResultSubject from "../components/modalGraph/ModalGraphResultSubject";

const Dashboard = ({
  SubjectResult,
  postDocument,
  spinnerLoading,
  loading,
  actionSuccessAlert,
  alertSuccess
}) => {
  const inputFile = useRef(null);
  /* Modal */
  const [modalShowResult, setModalShowResult] = useState(false);
  const [name, setName] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const onButtonClick = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUploadFile(file);
    /*  restoreData(); */
  };

  const submit = () => {
    try {
      let formData = new FormData();
      formData.append("upload", uploadFile);
      postDocument(formData);
      spinnerLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => {
      /* ERROR DOCUMENT VALIDATION */
      setName(SubjectResult?.name || null);

      if (SubjectResult === "fail") {
        Swal.fire({
          title: "Something was wrong with this document!",
          text: `Structure of file not supported`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(false);
          } else {
            window.location.reload(false);
          }
        });
      }
      /* LOGIN STARTED */
      if (alertSuccess) {
        actionSuccessAlert(false)
        Swal.fire({
          title: "Welcome !!!",
          text: ``,
          icon: "success",
          timer: "1500",
        })
      }

    },
    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [SubjectResult, name,alertSuccess],
  );

  return (
    <>
      <form className="form-container" encType="multipart/form-data">
        <div className="upload-files-container">
          <div className="drag-file-area">
            <span className="material-icons-outlined upload-icon" type="submit">
              {" "}
              {uploadFile ? <>Ready</> : <>Choose a file</>}{" "}
            </span>
            <input
              type="file"
              id="file"
              name="file"
              ref={inputFile}
              onChange={onButtonClick}
            />
          </div>
          <span className="cannot-upload-message">
            {" "}
            <span className="material-icons-outlined">error</span> Please select
            a file first{" "}
            <span className="material-icons-outlined cancel-alert-button">
              Cancel
            </span>{" "}
          </span>

          {uploadFile ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setModalShowResult(true);
                  submit();
                }}
                className="upload-button"
              >
                {" "}
                Run{" "}
              </button>
            </>
          ) : null}

          {name ? (
            <>
              <button
                type="button"
                onClick={() => setModalShowResult(true)}
                className="upload-button"
              >
                See graph of {name}
              </button>
            </>
          ) : null}
        </div>
      </form>
      <ModalGraphResultSubject
        show={modalShowResult}
        onHide={() => setModalShowResult(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  //is authenticated
  token: state.auth.access,
  loading: state?.loadingSpinner,
  SubjectResult: state?.uploadDocument?.data,
  // login is authenticated
  alertSuccess:state?.auth?.successAlert,
});

export default connect(mapStateToProps, { postDocument, spinnerLoading,actionSuccessAlert})(
  Dashboard
);
