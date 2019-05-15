import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

app.use(bodyParser.json());

const events = [];

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random(34).toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
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
