export default _this => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("tokenExpiration");
  _this.setState(prevState => {
    return {
      ...prevState,
      token: null,
      userId: null,
      tokenExpiration: null,
      isLoggedIn: false
    };
  });
};
