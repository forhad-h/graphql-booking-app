import React, { Component } from "react";

import AuthContext from "../../context/authContext";
import auth from "../../aux/auth";

class Authentication extends Component {
  static contextType = AuthContext;

  componentDidMount = () => {
    const authData = auth();
    if (!!authData) {
      this.context.login(authData);
    }
  };

  render() {
    return <></>;
  }
}

export default Authentication;
