import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

const Home = ({isAuthenticated }) => (
  <div className="container">
    <div className="jumbotron mt-5">
      <h1 className="display-4">Welcome to IKM WEB</h1>
      <p className="lead">
        System to obtain results of your candidates directly from a pdf
      </p>
      <hr className="my-4" />
      
      {
        !isAuthenticated && <p className="lead">
        <span>Click the Log In Button</span><br />
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Login
        </Link>
        </p>
      }
      
    </div>
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,  null)(Home);
