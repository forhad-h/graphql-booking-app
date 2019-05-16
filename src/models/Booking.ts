import { Document, Schema, model, Types } from "mongoose";
import { EventModel } from "../models/Event";
import { UserModel } from "../models/User";

export type BookingInput = {
  eventId: Types.ObjectId;
  bookingId: Types.ObjectId;
};

export type BookingModel = {
  event: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

type BookingRefModel = {
  event: { _doc: EventModel };
  user: { _doc: UserModel };
  createdAt: string;
  updatedAt: string;
};

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default model<Document & BookingRefModel & { _doc: BookingModel }>(
  "Booking",
  bookingSchema
);
