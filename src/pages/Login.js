import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { login,spinnerLoading } from '../actions/auth';


const Login = ({login, isAuthenticated,spinnerLoading,spinnerActivated}) => {
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
    login(email,password)
  };

  
  // Is  the user authenticated?
  // redirect them to the home page
   if(isAuthenticated) {
    return <Navigate to='/'/>
  }

 
  return (
    <div  className="container mt-5">
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
    <br/>
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
        <br/>
        <button className="btn btn-primary" type="submit">
          {" "}
          Login
        </button>
      </form>
      <p className="mt-3">
            Don't have a account? <Link to='/signup'>Sign up</Link>
        </p>
        <p className="mt-3">
            Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
        </p>
    </div>
  );
};

const mapStateToProps = state =>({
    //is authenticated
    isAuthenticated:state.auth.isAuthenticated,
    spinnerActivated:state.loadingSpinner.spinnerActivated
})

export default connect(mapStateToProps,{login,spinnerLoading})(Login);
