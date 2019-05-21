import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthContext from "./context/authContext";
import CheckAuth from "./components/CheckAuth/CheckAuth";
import login from "./aux/login";
import logout from "./aux/logout";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Bookings";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      isLoggedIn: false,
      isUpdated: false,
      tokenExpiration: 0
    };
  }

  componentDidUpdate = () => {
    if (!this.state.isUpdated) {
      this.setState(prevState => {
        return {
          ...prevState,
          isUpdated: true
        };
      });
    }
  };
  static contextType = AuthContext;
  login = authData => {
    return login(this, authData);
  };
  logout = () => {
    return logout(this);
  };
  render() {
    const authContextInitialize = {
      token: this.state.token,
      userId: this.state.userId,
      tokenExpiration: this.state.tokenExpiration,
      isLoggedIn: this.state.isLoggedIn,
      login: this.login,
      logout: this.logout
    };
    return (
      <>
        <AuthContext.Provider value={authContextInitialize}>
          <CheckAuth />
          <MainNavigation />
          <main className="main-content">
            <Switch>
              <Route path="/events" component={EventPage} />
              {this.state.isLoggedIn && (
                <Redirect from="/" to="/events" exact />
              )}
              {this.state.isLoggedIn && <Redirect from="/auth" to="/events" />}
              {this.state.isLoggedIn && (
                <Route path="/bookings" component={BookingPage} />
              )}
              {!this.state.isLoggedIn && (
                <Route path="/auth" component={AuthPage} />
              )}
              {!this.state.isLoggedIn && this.state.isUpdated && (
                <Redirect to="/auth" />
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    );
  }
}

export default App;
