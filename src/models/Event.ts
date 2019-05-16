import { Document, Schema, model, Types } from "mongoose";

export type EventInput = {
  eventInput: {
    title: string;
    description: string;
    price: number;
    date: string;
  };
  creator: Types.ObjectId;
};
export type EventModel = {
  title: string;
  description: string;
  price: number;
  date: string;
  creator: Types.ObjectId;
};

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default model<Document & { _doc: EventModel }>("Event", eventSchema);
