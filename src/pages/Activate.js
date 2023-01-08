import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useEffect} from "react";
import { verifyAccount,actionSuccessAlert,
  actionFailedAlert } from "../actions/auth";

const Activate = ({ verifyAccount,successAlert,
  errorAlert,
  actionFailedAlert,
  actionSuccessAlert, }) => {
 
  const routeParams = useParams();

  const onSubmit = (e) => {
    const uid = routeParams.uid;
    const token = routeParams.token;

    verifyAccount(uid, token);
  
  };
  // Is  the user verified?
  // redirect them to the home page
  useEffect(()=>{
    if (successAlert) {
      actionSuccessAlert(false);
      Swal.fire({
        title: "Account Activated!",
        text: ``,
        icon: "success",
        confirmButtonText: "Ok",
        timer: "3000",
      }).then((result) => {
        if (result.isConfirmed) {
          return <Navigate to="/" />;
        } else {
          return <Navigate to="/" />;
        }
      });
    }
    if (errorAlert) {
      actionFailedAlert(false);
      Swal.fire({
        title: "Server Error !!!",
        text: `Contact with IT support`,
        icon: "error",
        timer: "2000",
      });
    }
  },[errorAlert,successAlert,actionFailedAlert,actionSuccessAlert])
/*   if (verified) {
    return <Navigate to="/" />;
  } */
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
  errorAlert: state?.auth?.errorAlert,
  successAlert: state?.auth?.successAlert,
});

export default connect(mapStateToProps, { verifyAccount,actionSuccessAlert,
  actionFailedAlert })(Activate);
