import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { reset_password_confirm,actionSuccessAlert,actionFailedAlert } from "../actions/auth";
import Swal from 'sweetalert2';

const ResetPasswordConfirm = ({ reset_password_confirm,actionSuccessAlert,actionFailedAlert,alertSuccess,errorAlert }) => {
  const routeParams = useParams();

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const uid = routeParams.uid;
    const token = routeParams.token;

    //Reset password
    reset_password_confirm(uid, token, new_password, re_new_password);
  
  };
  // Is  the user authenticated?
  // redirect them to the home page

  useEffect(() => {
  
    if (alertSuccess) {
      actionSuccessAlert(false);
      Swal.fire({
        title: "New password reset !!",
        text: `Done`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          return <Navigate to="/login" />;
        } else {
          return <Navigate to="/login" />;
        }
      });
    }

    if(errorAlert){
      actionFailedAlert(false)
      Swal.fire({
        title: "Ups!!!",
        text: `Something was wrong`,
        icon: "error",
        timer: "2000",
      });
    }
  // eslint-disable-next-line import/no-extraneous-dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertSuccess,errorAlert]);

  return (
    <div className="container mt-5">
      <h1>Reset password </h1>
      <p>Create a new password</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="New Password"
            name="new_password"
            value={new_password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            name="re_new_password"
            value={re_new_password}
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

const mapStateToProps =(state)=> ({
  alertSuccess:state?.auth?.successAlert,
  errorAlert: state?.auth?.errorAlert,
})

export default connect(mapStateToProps, { reset_password_confirm,actionSuccessAlert,actionFailedAlert })(ResetPasswordConfirm);
