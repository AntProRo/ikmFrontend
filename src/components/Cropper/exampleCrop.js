const ExampleCrop = () => {
  return (
    <>
      Example:
      <div className="gridCrop">
        <div>
          <img
            src="/example1.png"
            alt="example1"
            style={{
              border: "1.0px dashed #000",
              objectFit: "cover",
              height: "15rem",
              width: "15rem",
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
              height: "15rem",
              width: "15rem",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ExampleCrop;
