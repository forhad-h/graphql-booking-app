export default (_this, authData) => {
  if (authData) {
    _this.setState(prevState => {
      return {
        ...prevState,
        token: authData.token,
        userId: authData.userId,
        tokenExpiration: authData.tokenExpiration,
        isLoggedIn: true
      };
    });
  }
  return;
};
