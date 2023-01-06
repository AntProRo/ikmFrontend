import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  reset_password,
  actionSuccessAlert,
  actionFailedAlert,
} from "../actions/auth";

const ResetPassword = ({
  reset_password,
  successAlert,
  errorAlert,
  actionFailedAlert,
  actionSuccessAlert,
}) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    //Reset password
    reset_password(email);
  };
  // Is  the user authenticated?
  // redirect them to the home page

  useEffect(() => {
    if (successAlert) {
      actionSuccessAlert(false);
      Swal.fire({
        title: "Check your email!",
        text: `If this email exists, you will have a confirmation email`,
        icon: "success",
        confirmButtonText: "Ok",
        timer: "3500",
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
        title: "Try again !!!",
        text: `Password not valid or email not verified`,
        icon: "error",
        timer: "2000",
      });
    }
    // eslint-disable-next-line import/no-extraneous-dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorAlert, successAlert]);
  return (
    <div className="container mt-5">
      <h1>Request Password Reset</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <br />
        <button className="btn btn-primary" type="submit">
          {" "}
          Reset Password
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  errorAlert: state?.auth?.errorAlert,
  successAlert: state?.auth?.successAlert,
});

export default connect(mapStateToProps, {
  reset_password,
  actionSuccessAlert,
  actionFailedAlert,
})(ResetPassword);
