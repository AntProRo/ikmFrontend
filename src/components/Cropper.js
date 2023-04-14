import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { canvasPreview } from "./canvasPreview";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Loading from "./LoadingElement/Loading";
import { connect } from "react-redux";
import { spinnerLoading, actionSuccessAlert } from "../actions/auth";
import {
  postDocument,
  postAnalysisDocument,
  restoreProcess,
  updateCropDefault,
  getCropDefault,
  restoreStatus200,
} from "../actions/uploadPDF";
import Swal from "sweetalert2";

/* setCrop(width, height, aspect);
      height: 188.6666259765625,
      unit: "px",
      width : 218.00003051757812,
      x : 252.56250762939453,
      y : 338.3333740234375, */

const CropperImage = ({
  SubjectResultImage,
  postDocument,
  spinnerLoading,
  loading,
  actionSuccessAlert,
  alertSuccess,
  restoreProcess,
  postAnalysisDocument,
  show,
  onHide,
  /* CROP OPTIONS */
  restoreStatus200,
  updateCropDefault,
  getCropDefault,
  cropDefault,
  statusSavedCrop,
}) => {
  const imgRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState();

  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [aspect] = useState();

  function onImageLoad(e) {
    e.preventDefault();
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(width, height, aspect);
    }
  }

  const defaultCrop = () => {
    /*  setCrop({
      height: 188.6666259765625,
      unit: "px",
      width: 218.00003051757812,
      x: 252.56250762939453,
      y: 338.3333740234375,
    });
    setCompletedCrop({
      height: 188.6666259765625,
      unit: "px",
      width: 218.00003051757812,
      x: 252.56250762939453,
      y: 338.3333740234375,
    }); */
    if (
      cropDefault.height != null &&
      cropDefault?.width != null &&
      cropDefault?.x != null &&
      cropDefault?.y != null &&
      cropDefault?.unit != null
    ) {
      setCrop({
        height: cropDefault.height,
        unit: cropDefault.unit,
        width: cropDefault.width,
        x: cropDefault.x,
        y: cropDefault.y,
      });
      setCompletedCrop({
        height: cropDefault.height,
        unit: cropDefault.unit,
        width: cropDefault.width,
        x: cropDefault.x,
        y: cropDefault.y,
      });
    }
    if (previewCanvasRef.current && imgRef.current) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        0
      );
    }
  };

  useEffect(() => {
    if (SubjectResultImage !== null) {
      spinnerLoading(false);
      const convertShowImage = async () => {
        const loadedPreview = `data:image/jpg;base64,${SubjectResultImage}`;
        const base64Response = await fetch(loadedPreview);
        const newBlob = await base64Response.blob();
        const File = URL.createObjectURL(newBlob);
        setSrc(File);

        getCropDefault();
      };
      convertShowImage();
    }

    if (
      previewCanvasRef.current &&
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current
    ) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        0
      );
    }

    if (statusSavedCrop === "Crop Saved as default") {
      Swal.fire({
        title: "Crop saved as default",
        text: ``,
        icon: "success",
        timer: "1000",
      });
    } else if (statusSavedCrop === "fail") {
      Swal.fire({
        title: ":( something wrong happened!!, try again",
        text: ``,
        icon: "error",
        timer: "1000",
      });
    }
    restoreStatus200(null);

    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    completedCrop,
    scale,
    SubjectResultImage,
    restoreStatus200,
    statusSavedCrop,
  ]);


  const handleClose = () => {
    onHide();
  };

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const submitAnalysis = () => {
    try {
      let canvas = document.getElementById("canvasSolid");
      let imageCropped = canvas.toDataURL("image/png");

      const file = DataURIToBlob(imageCropped);
      const formData = new FormData();

      formData.append("analysis", file, "image.png");

      restoreProcess(null);
      postAnalysisDocument(formData);

      handleClose();
      spinnerLoading(true);

      /*      postDocument(formData);
      spinnerLoading(true);
      setModalShowResult(true); */
    } catch (err) {
      console.log(err);
    }
  };

  const saveCrop = () => {
    try {
      const { height, width, x, y, unit } = completedCrop;
      const body = { height, width, x, y, unit };
      updateCropDefault(body);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      scrollable={true}
      dialogClassName="my-modal"
    >
      {loading.spinnerActivated ? (
        <div className="loading-position">
          <Loading />
        </div>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Crop the image </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Example:
              <div className="gridCrop">
                <div>
                  <img
                    src="/example1.png"
                    alt="example1"
                    style={{
                      border: "1.0px dashed #000",
                      objectFit: "cover",
                      height: "25rem",
                      width: "25rem",
                    }}
                  />
                </div>
                <div>
                  <img
                    src="/example2.png"
                    alt="example2"
                    style={{
                      border: "1.0px dashed #000",
                      objectFit: "cover",
                      height: "25rem",
                      width: "25rem",
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="hr hr-blurry" />

            <br />
            <div className="gridCrop">
              <div>
                <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="number"
                  step="0.1"
                  value={scale}
                  disabled={!src}
                  onChange={(e) => setScale(e.target.value)}
                />
              </div>
            </div>
            <br />

            <div className="gridCrop">
              <div>
                {src && (
                  <div>
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                    >
                      <img
                        src={src}
                        ref={imgRef}
                        onLoad={onImageLoad}
                        alt="imageIKM"
                        height={900}
                        width={700}
                      />
                    </ReactCrop>
                  </div>
                )}
              </div>
              <div>
                {!!completedCrop && (
                  <canvas
                    id="canvasSolid"
                    ref={previewCanvasRef}
                    style={{
                      border: "1.5px dashed #000",
                      objectFit: "contain",
                      width: completedCrop.width * 2,
                      height: completedCrop.height * 2,
                    }}
                  />
                )}
              </div>
            </div>

            {/* <img src={`data:image/jpg;base64,${SubjectResult}`} alt="imageIKM" height={900} width={700}/> */}
          </Modal.Body>
        </>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button
          variant="danger"
          disabled={completedCrop ? false : true}
          onClick={saveCrop}
        >
          Save Crop as my new default Crop
        </Button>
        <Button
          variant="primary"
          disabled={src ? false : true}
          onClick={defaultCrop}
        >
          Crop image with my default crop
        </Button>

        <Button
          variant="success"
          disabled={previewCanvasRef.current ? false : true}
          onClick={submitAnalysis}
        >
          Submits and analysis
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  //Is authenticated
  token: state.auth.access,
  loading: state?.loadingSpinner,
  SubjectResultImage: state?.uploadDocument?.imageFile,
  //Login is authenticated is to verify if this user has access to this component
  alertSuccess: state?.auth?.successAlert,
  //Default crop Options
  cropDefault: state?.uploadDocument?.resCrop,
  statusSavedCrop: state?.uploadDocument?.res,
});

export default connect(mapStateToProps, {
  postAnalysisDocument,
  postDocument,
  spinnerLoading,
  actionSuccessAlert,
  restoreProcess,
  updateCropDefault,
  getCropDefault,
  restoreStatus200,
})(CropperImage);
