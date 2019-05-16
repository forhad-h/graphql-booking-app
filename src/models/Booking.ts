import { Document, Schema, model, Types } from "mongoose";

export type BookingInput = {
    eventId: Types.ObjectId
}

export type BookingModel = {
  event: Types.ObjectId;
  user: Types.ObjectId;
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

export default model<Document & { _doc: BookingModel }>(
  "Booking",
  bookingSchema
);
