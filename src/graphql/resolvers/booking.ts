import { Request } from "express";
import { dbErr } from "../../debugger/debugger";
import Event from "../../models/Event";
import Booking, { BookingInput } from "../../models/Booking";
import { transformEvent, transformBooking } from "./helpers/transformer";

export default {
  bookings: async (args: null, req: Request) => {
    if (!req.isAuth) throw new Error("User not Authenticated!");
    try {
      const bookings = await Booking.find({ user: req.userId }).exec();
      if (!bookings) throw new Error("Booking not found");
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      dbErr(err);
      return err;
    }
  },
  bookEvent: async (args: BookingInput, req: Request) => {
    if (!req.isAuth) throw new Error("User not Authenticated!");
    try {
      const fetchEvent = await Event.findOne({ _id: args.eventId }).exec();
      const booking = new Booking({
        event: fetchEvent,
        user: req.userId
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      dbErr(err);
      return err;
    }
  },
  cancelBooking: async (args: BookingInput, req: Request) => {
    if (!req.isAuth) throw new Error("User not Authenticated!");
    try {
      const booking = await Booking.findById(args.bookingId)
        .populate("event")
        .exec();
      if (!booking) throw new Error("Booking not found for delete");
      const event = transformEvent(booking.event);
      await Booking.findByIdAndDelete(args.bookingId).exec();
      return event;
    } catch (err) {
      dbErr(err);
      return err;
    }
  }
};
