import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { verifyAccount } from "../actions/auth";

const Activate = ({ verifyAccount }) => {
  const [verified, setVerified] = useState(false);
  const routeParams = useParams();

  const onSubmit = (e) => {
    const uid = routeParams.uid;
    const token = routeParams.token;

    verifyAccount(uid, token);
    setVerified(true)
  };
  // Is  the user verified?
  // redirect them to the home page
  if (verified) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container mt-5">
      <h1>Verify Account</h1>

      <br />
      <button onClick={onSubmit} style={{ marginTop: '50px' }} className="btn btn-primary" type="button">
        {" "}
        Verify
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //is authenticated
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { verifyAccount })(Activate);
