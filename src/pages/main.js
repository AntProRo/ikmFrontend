import { Routes, Route,Navigate } from "react-router-dom";
import Activate from "./Activate";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import Signup from "./Signup";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";


const MainPages = ({ isAuthenticated }) => {
    const [isLoading, setLoading] = useState(true);

    function someRequest() { //Simulates a request; makes a "promise" that'll run for 2.5 seconds
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
      } 

      useEffect(() => {
        someRequest().then(() => {
          const loaderElement = document.querySelector(".loader-container");
          if (loaderElement) {
            loaderElement.remove();
            setLoading(!isLoading);
          }
        });
      });

      if (isLoading) {
        return null;
      }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" />:<Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" />: <Signup />} />
      <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/dashboard" />: <ResetPassword />} />
      <Route
        path="/dashboard"
        element={!isAuthenticated ?  <NotFound/>  : <Dashboard />} 
      
      />
      <Route
        path="/password/reset/confirm/:uid/:token"
        element={<ResetPasswordConfirm />}
      />
      <Route path="/activate/:uid/:token" element={<Activate />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  //is authenticated
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(MainPages);
