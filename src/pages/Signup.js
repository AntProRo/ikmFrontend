import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signup,actionSuccessAlert,actionFailedAlert} from '../actions/auth';
import Swal from 'sweetalert2';

const Signup =({signup, isAuthenticated,actionSuccessAlert,actionFailedAlert,alertSuccess,alertError }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name:"",
        re_password:""
      });
      const { email, password, name, re_password } = formData;
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
      const onSubmit = (e) => {
        e.preventDefault();
        //login
   
        if(password === re_password){
        signup(email,name,password,re_password)
   ;
        } 
    };
      // Is  the user authenticated?
      // redirect them to the home page

      useEffect(()=> {
        if(alertSuccess){
          actionSuccessAlert(false);
          Swal.fire({
            title: "Check your email",
            text: `Account created successfully`,
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
        if(alertError){
          actionFailedAlert(false);
          Swal.fire({
            title: "Ups!!!",
            text: `Something was wrong, email already in use or try again!!`,
            icon: "error",
            timer: "2000",
          });
        }
      // eslint-disable-next-line import/no-extraneous-dependencies
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[alertSuccess,alertError])
  /*     if(isAuthenticated) {
        return <Navigate to='/'/>
      } 
      if(accountCreated) {
        return <Navigate to='/login'/>
      }
    */
    return (
        <div className="container mt-5">
        <h1>SignUp</h1>
        <p>Create a new Account</p>
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

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Repeat Password"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <br/>

          <div className="form-group">
            <input
              className="form-control"
              type="name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <br/>
          <button className="btn btn-primary" type="submit">
            {" "}
            Sign Up
          </button>
        </form>
        <p className="mt-3">
              Do you have a account? <Link to='/login'>Sig In</Link>
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
    alertSuccess:state?.auth?.successAlert,
    alertError: state?.auth?.errorAlert,
})


export default connect(mapStateToProps,{signup,actionSuccessAlert,actionFailedAlert})(Signup);







