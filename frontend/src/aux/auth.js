export default () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  if (
    token !== "undefined" &&
    userId !== "undefined" &&
    tokenExpiration !== "undefined" &&
    token !== null &&
    userId !== null &&
    tokenExpiration !== null
  ) {
    return {
      token,
      userId,
      tokenExpiration
    };
  }
  return;
};
