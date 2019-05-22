import React, { Component, createRef } from "react";

import AuthContext from "../context/authContext";
import authRequest from "../graphql/authRequest";

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginForm: true
    };

    this.emailEl = createRef();
    this.passwordEl = createRef();
  }

  static contextType = AuthContext;

  switchModeHandler = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isLoginForm: !prevState.isLoginForm
      };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    //should make more validation logic
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    authRequest(this, { email, password });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={this.emailEl}
            placeholder="Enter email address"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={this.passwordEl}
            placeholder="Enter password"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn primary">
            {!this.state.isLoginForm ? "Signup" : "Login"}
          </button>
          <button
            type="button"
            className="btn"
            onClick={this.switchModeHandler}
          >
            Switch to {!this.state.isLoginForm ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
