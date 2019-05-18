import { Document, Schema, Types, model } from "mongoose";

export type UserInput = {
  userInput: {
    email: string;
    password: string;
    createdEvents: Array<Types.ObjectId>;
  };
};

export type UserModel = {
  email: string;
  password: string;
  createdEvents: Array<Types.ObjectId>;
};

export type UserDocModel = {
  _doc: UserModel;
};

export type LoginInput = {
  email: string;
  password: string;
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

export default model<Document & UserModel & UserDocModel>("User", userSchema);
