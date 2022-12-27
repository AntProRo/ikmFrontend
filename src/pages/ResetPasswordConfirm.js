import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const routeParams = useParams();

  const [requestSent, setRequestSent] = useState(false);
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
    setRequestSent(true);
  };
  // Is  the user authenticated?
  // redirect them to the home page
  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5">
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
