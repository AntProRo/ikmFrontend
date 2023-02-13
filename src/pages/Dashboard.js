import { Fragment, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { spinnerLoading, actionSuccessAlert } from "../actions/auth";
import { postDocument } from "../actions/uploadPDF";
import ModalGraphResultSubject from "../components/modalGraph/ModalGraphResultSubject";
import CropperImage from "../components/Cropper";
import Loading from "../components/LoadingElement/Loading";

const Dashboard = ({
  SubjectResult,
  SubjectResultImage,
  postDocument,
  spinnerLoading,
  loading,
  actionSuccessAlert,
  alertSuccess,
}) => {
  const inputFile = useRef(null);
  /* Modal */
  const [modalShowResult, setModalShowResult] = useState(false);
  const [modalCropperEditor, setModalCropperEditor] = useState(false);
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
      setUploadFile(null);
      setModalCropperEditor(true);
      spinnerLoading(true);

      /* spinnerLoading(true); */
      /* setModalShowResult(true); */
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => {
      /* ERROR DOCUMENT VALIDATION */
      setName(SubjectResult?.name || null);

      if (SubjectResult === "Fail_Upload_Document") {
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
        actionSuccessAlert(false);
        Swal.fire({
          title: "Welcome to dashboard page!!!",
          text: ``,
          icon: "success",
          timer: "1500",
        });
      }

      if (uploadFile !== null) {
        submit();
      }
      /*    if (SubjectResultImage !== null) {
        setModalCropperEditor(true);
      } */
    },
    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [SubjectResult, name, alertSuccess, uploadFile, SubjectResultImage]
  );

  const reStoreInput = ()=> {
    
  }

  return (
    <>
      <form className="form-container" encType="multipart/form-data">
        <div className="upload-files-container">
          <div className="drag-file-area">
            <span className="material-icons-outlined upload-icon" type="submit">
              Choose a file
            </span>

            <input
              type="file"
              id="file"
              name="file"
             
              onChange={onButtonClick}
            />
          </div>
          <span className="cannot-upload-message">
            <span className="material-icons-outlined">error</span> Please select
            a file first
            <span className="material-icons-outlined cancel-alert-button">
              Cancel
            </span>
          </span>

          {SubjectResultImage !== null || name? (
            <>
              <button
                type="button"
                onClick={() => {
                  setModalCropperEditor(true);
                }}
                className="upload-button"
              >
                open editor
              </button>
            </>
          ) : loading.spinnerActivated ? (
            <Loading />
          ) : null}

          {name ? (
            <>
              <button
                type="button"
                onClick={() => {setModalShowResult(true);}}
                className="upload-button"
              >
                See graph of {name}
              </button>
  
            </>
          ) : null}
        </div>
      </form>

      <CropperImage
        show={modalCropperEditor}
        onHide={() => setModalCropperEditor(false)}
      />

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
  SubjectResult: state?.uploadDocument?.dataFile,
  SubjectResultImage: state?.uploadDocument?.imageFile,
  // login is authenticated
  alertSuccess: state?.auth?.successAlert,
});

export default connect(mapStateToProps, {
  postDocument,
  spinnerLoading,
  actionSuccessAlert,
})(Dashboard);
