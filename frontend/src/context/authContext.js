import { createContext } from "react";

export default createContext({
  token: null,
  userId: null,
  tokenExpiration: 0,
  isLoggedIn: false,
  login: authData => {},
  logout: () => {}
});
