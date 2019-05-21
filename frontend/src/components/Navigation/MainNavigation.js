import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/authContext";
import "./MainNavigation.scss";

const mainNavigation = () => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Booking App</h1>
          </div>
          <div className="main-navigation__items">
            <ul>
              {!context.isLoggedIn && (
                <li>
                  <NavLink to="/auth" className="btn white small">
                    Login/Signup
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.isLoggedIn && (
                <>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btn small"
                      onClick={context.logout}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
