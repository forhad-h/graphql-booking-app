import express from "express";
import bodyParser from "body-parser";
import { connect as mongoConnect } from "mongoose";
import graphqlHttp from "express-graphql";

import graphQLSchema from "./graphql/schema/index";
import graphQLResolvers from "./graphql/resolvers/index";
import isAuth from "./middleware/isAuth";

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

mongoConnect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASS
  }@cluster0-ho40c.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
  { useNewUrlParser: true }
)
  .then(res => {
    app.listen(9000);
  })
  .catch(err => {
    console.log(err);
  });
