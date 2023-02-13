import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Loading from "./LoadingElement/Loading";
import { connect } from "react-redux";
import { spinnerLoading, actionSuccessAlert } from "../actions/auth";
import {
  postDocument,
  postAnalysisDocument,
  restoreProcess,
} from "../actions/uploadPDF";

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
}) => {
  const imgRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState();

  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [aspect] = useState();

  function onImageLoad(e) {
    e.preventDefault();
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(width, height, aspect);
    }
  }

  const cropImageNow = (scale) => {
    const ctx = previewCanvasRef.current.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    // const pixelRatio = 1

    previewCanvasRef.current.width = Math.floor(
      crop.width * scaleX * pixelRatio
    );
    previewCanvasRef.current.height = Math.floor(
      crop.height * scaleY * pixelRatio
    );

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const centerX = imgRef.current.naturalWidth / 2;
    const centerY = imgRef.current.naturalHeight / 2;

    ctx.save();

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);

    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      imgRef.current,
      0,
      0,
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight,
      0,
      0,
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight
    );

    ctx.restore();
  };

  useEffect(() => {
    if (SubjectResultImage !== null) {
      spinnerLoading(false);
      const loo = async () => {
        const loadedPreview = `data:image/jpg;base64,${SubjectResultImage}`;
        const base64Response = await fetch(loadedPreview);
        const newBlob = await base64Response.blob();
        const File = URL.createObjectURL(newBlob);
        setSrc(File);
      };

      loo();
    }

    if (previewCanvasRef.current) {
      cropImageNow(scale);
    }
    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop, scale, SubjectResultImage]);

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
              <div>Example how to crop:</div>
            </div>
            <br />
            <div className="gridCrop">
              <div>
                <img
                  src="/example1.png"
                  alt="example1"
                  style={{
                    border: "1.5px dashed #000",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <img
                  src="/example2.png"
                  alt="example2"
                  style={{
                    border: "1.5px dashed #000",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <hr className="hr hr-blurry" />
       
            <br />
            <div className="gridCrop">
              <div>
                {src && (
                  <div>
                    <ReactCrop
                      crop={crop}
                      onChange={(percentCrop) => setCrop(percentCrop)}
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
                      width: completedCrop.width,
                      height: completedCrop.height,
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

        <Button onClick={submitAnalysis}>Get analysis</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  //is authenticated
  token: state.auth.access,
  loading: state?.loadingSpinner,
  SubjectResultImage: state?.uploadDocument?.imageFile,
  // login is authenticated
  alertSuccess: state?.auth?.successAlert,
});

export default connect(mapStateToProps, {
  postAnalysisDocument,
  postDocument,
  spinnerLoading,
  actionSuccessAlert,
  restoreProcess,
})(CropperImage);
