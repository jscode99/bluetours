import React, { useContext } from "react";
import { userContext } from "../../App";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link, useHistory } from "react-router-dom";
import M from "materialize-css";

export const Header = () => {
  //initializing useHistory
  const history = useHistory();
  //intializing useContext with userContext
  const { state, dispatch } = useContext(userContext);
  // Listrendering conditionally
  const renderingList = () => {
    // Checking state
    if (state) {
      return [
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>,
        <li className="nav-item">
          <button
            // className="btn waves-effect waves-light #d32f2f red darken-2"
            onClick={() => {
              // Clearing localstorage
              localStorage.clear();
              // Calling userReducer with type CLEAR
              dispatch({ type: "CLEAR" });
              // Redirecting user to signin page
              history.push("/signin");
              // Toast message
              M.toast({
                html: "Logged out !!!",
                classes: "#c62828 red darken-3",
              });
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>,
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            Signup
          </NavLink>
        </li>,
      ];
    }
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Link to={state ? "/" : "/signin"} className="navbar-brand">
            Bluetours
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>{renderingList()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
