import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { signup} from '../actions/auth';

const Signup =({signup, isAuthenticated}) => {

    const [accountCreated,setAccountCreated] =useState(false)
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
        setAccountCreated(true);
        } 
    };
      // Is  the user authenticated?
      // redirect them to the home page
      if(isAuthenticated) {
        return <Navigate to='/'/>
      } 
      if(accountCreated) {
        return <Navigate to='/login'/>
      }
   
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
    isAuthenticated:state.auth.isAuthenticated
})


export default connect(mapStateToProps,{signup})(Signup);







