import { GRAPHQL_END_POINT } from "../aux/config";
export default (_this, data) => {
  let requestBody = {
    query: `
            query Login($email: String!, $password: String!){
                login(email: $email, password: $password){
                    userId
                    token
                    tokenExpiration
                }
            }
      `,
    variables: {
      email: data.email,
      password: data.password
    }
  };

  if (!_this.state.isLoginForm) {
    requestBody = {
      query: `
            mutation SignUp($email: String!, $password: String!) {
                createUser(userInput: {email: $email, password: $password}) {
                    _id
                    email
                    password
                }
            }
        `,
      variables: {
        email: data.email,
        password: data.password
      }
    };
  }

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(GRAPHQL_END_POINT, fetchOptions)
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .then(resData => {
      let token;
      let userId;
      let tokenExpiration;
      if (!_this.state.isLoginForm) {
        _this.setState({ isLoginForm: true });
      } else {
        //for login form
        token = resData.data.login.token;
        userId = resData.data.login.userId;
        tokenExpiration = resData.data.login.tokenExpiration;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("tokenExpiration", tokenExpiration);
      _this.context.login(resData.data.login);
    })
    .catch(err => {
      console.log(err);
    });
};
