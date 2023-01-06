import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  login,
  spinnerLoading,
  actionFailedAlert,
 
} from "../actions/auth";
import Swal from "sweetalert2";

const Login = ({
  login,
  isAuthenticated,
  errorAlert,
  actionFailedAlert,



}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    //login
    login(email, password);
  };

  // Is  the user authenticated?
  // redirect them to the home page

  useEffect(() => {
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
  }, [errorAlert]);


  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <p>Sing into your Account</p>
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
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <br />
        <button className="btn btn-primary" type="submit">
          {" "}
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have a account? <Link to="/signup">Sign up</Link>
      </p>
      <p className="mt-3">
        Forgot your Password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //is authenticated
  isAuthenticated: state.auth.isAuthenticated,
  errorAlert: state.auth.errorAlert,
  spinnerActivated: state.loadingSpinner.spinnerActivated,
});

export default connect(mapStateToProps, {
  login,
  actionFailedAlert,
  spinnerLoading
})(Login);
