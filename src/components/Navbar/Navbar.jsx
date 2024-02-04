import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

import { auth } from "../../firebaseSetup";

import Logo from "../../assets/images/logo.svg";

import "./Navbar.scss";

const Navbar = ({ firebaseUser, history }) => {
  const signOut = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return (
    <header className="navbar-custom navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Task Manager Logo" />
        </Link>

        <div className="d-flex">
          {!firebaseUser ? (
            <NavLink to="/login" className="btn_ btn-dark m-0">
              Log In
            </NavLink>
          ) : (
            <>
              <NavLink to="/tasks" className="btn_ btn-dark m-0 ml-5 mr-3">
                Tasks
              </NavLink>

              <button className="btn_ btn-dark m-0" onClick={signOut}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navbar);
