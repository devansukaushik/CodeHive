import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // dispatch suggests ,component  using kind of state management library (like Redux) to dispatch actions to update global state
  const dispatch = useDispatch();
  // navigate variable suggests the usage of a routing library (like React Router) to handle navigation.
  const navigate = useNavigate();
   

  // handleSwitch function is defined to toggle between signup and login modes
  const handleSwitch = () => {
    setIsSignup(!isSignup);     //Inverts the value of isSignup
    setName("");   //Resets the name, email, and password states to empty strings,
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();     //React to prevent the page from reloading when a form is submitted.
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }

      //If isSignup is true,form is in signup mode.dispatches a signup action
      dispatch(signup({ name, email, password }, navigate));
    } 
    
    //If isSignup is false, form is in login mode,dispatches a login action, 
    else {
      dispatch(login({ email, password }, navigate));
    }
  };

  return (
    <section className="auth-section">    
       {/* If isSignup is true, it renders the AboutAuth component. */}
      {isSignup && <AboutAuth />}
      {/* container for the authentication form and related elements. */}
      <div className="auth-container-2">
        {/* renders an image, likely representing a logo or icon. */}
        <img src={icon} alt="stack overflow" className="login-logo" />
        {/* sets up the form with the handleSubmit function to handle form submissions. */}
        <form onSubmit={handleSubmit}>
          {/* If isSignup is true, it renders an input field for the user's display name. */}
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}

                // attribute defines an event handler function that gets called whenever the user changes the input value.
                onChange={(e) => {
                  setName(e.target.value);  //setName function is used to update the name state with the new value.
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (     //can't signup then move to frgt pswrd
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          {/* If isSignup is true, the button will display "Sign up". If isSignup is false, the button will display "Log in" */}
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
