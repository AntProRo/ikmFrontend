import {  useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { spinnerLoading } from "../actions/auth";
import { postDocument } from "../actions/uploadPDF";
import ModalGraphResultSubject from "../components/modalGraph/ModalGraphResultSubject";

const Dashboard = ({ loading,SubjectResult, postDocument,spinnerLoading  }) => {
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
      spinnerLoading(true)
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setName(SubjectResult?.name || null);
  }, [SubjectResult,name]);

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
              <button type="button"  onClick= {()=> {setModalShowResult(true);submit();}} className="upload-button">
                {" "}
                Run{" "}
              </button>
            </>
          ) : null}


          { name ? (
            <>
              <button type="button" onClick={() => setModalShowResult(true)} className="upload-button">
                See Graph of {name}
              </button>

              
              
             
            </>
          ) : null}
        </div>
      </form>
      <ModalGraphResultSubject
                show={modalShowResult}
                onHide={() => setModalShowResult(false)} />
    </>
  );
};

const mapStateToProps = (state) => ({
  //is authenticated
  token: state.auth.access,
  loading: state?.loadingSpinner,
  SubjectResult: state?.uploadDocument?.data,
});

export default connect(mapStateToProps, { postDocument,spinnerLoading })(Dashboard);
