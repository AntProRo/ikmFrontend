import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
        <b>  Login</b>
        </Link>
      </li>

      <li className="nav-item ">
        <Link
          className="nav-link"
          to="/signup"
          id="navbarHeader"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
        <b>  Sign Up</b>
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
        <b>  Dashboard</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/my-candidates">
        <b> Candidate Results</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/my-variables">
        <b> Subject analysis settings</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={logout}>
          <b>Logout </b>
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        {" "}
        &nbsp; <b>IKM </b>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {isAuthenticated ? authLinks() : guestLinks()}
        </ul>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);
