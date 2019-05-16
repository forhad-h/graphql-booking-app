import { ObjectId } from "bson";
import bcrypt from "bcryptjs";
import debug from "debug";

import Event, { EventInput } from "../../models/Event";
import User, { UserInput } from "../../models/User";
import Booking, { BookingInput } from "../../models/Booking";

const dbErr = debug("booking-app:db:err");

const events = async (eventIds: Array<ObjectId>): Promise<Array<any>> => {
  try {
    const getEvents = await Event.find({ _id: { $in: eventIds } });
    if (!getEvents) throw new Error("Event not found");
    return getEvents.map(event => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind({}, event._doc.creator)
      };
    });
  } catch (err) {
    dbErr(err);
    return err;
  }
};

const singleEvent = async (eventId: ObjectId): Promise<any> => {
  try {
    const getEvent = await Event.findById(eventId);
    if (!getEvent) throw new Error("Event not found");
    return {
      ...getEvent._doc,
      date: new Date(getEvent._doc.date).toISOString(),
      creator: user.bind({}, getEvent._doc.creator)
    };
  } catch (err) {
    dbErr(err);
    return err;
  }
};

const user = async (userId: ObjectId): Promise<any> => {
  try {
    const getUser = await User.findById(userId);
    if (!getUser) throw new Error("User not found");
    return {
      ...getUser._doc,
      password: null,
      createdEvents: events.bind({}, getUser._doc.createdEvents)
    };
  } catch (err) {
    return err;
  }
};

export default {
  events: async () => {
    const events = await Event.find().populate("creator");

    return events.map(event => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind({}, event._doc.creator)
      };
    });
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      if (!bookings) throw new Error("Booking not found");
      return bookings.map(booking => {
        return {
          ...booking._doc,
          event: singleEvent.bind({}, booking._doc.event),
          user: user.bind({}, booking._doc.user),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString()
        };
      });
    } catch (err) {
      dbErr(err);
      return err;
    }
  },
  createEvent: async (args: EventInput) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5cdd3c6052f5aa25c54ec5cb"
      });

      const result = await event.save();

      const creator = await User.findById("5cdd3c6052f5aa25c54ec5cb");
      if (!creator) throw new Error("User not exists");
      creator.createdEvents.push(event.id);
      creator.save();

      return {
        ...result._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind({}, result._doc.creator)
      };
    } catch (err) {
      dbErr(err);
      return err;
    }
  },
  createUser: async (args: UserInput) => {
    try {
      const userExist = await User.findOne({ email: args.userInput.email });
      if (userExist) throw new Error("User already exists");

      const encryptedPass = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: encryptedPass
      });
      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      dbErr(err);
      return err;
    }
  },
  bookEvent: async (args: BookingInput) => {
    try {
      const fetchEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        event: fetchEvent,
        user: "5cdd3c6052f5aa25c54ec5cb"
      });
      const result = await booking.save();
      return {
        ...result._doc,
        event: singleEvent.bind({}, booking._doc.event),
        user: user.bind({}, booking._doc.user),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
      };
    } catch (err) {
      dbErr(err);
      return err;
    }
  },
  cancelBooking: async (args: BookingInput) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      if (!booking) throw new Error("Booking not found for delete");
      const event = {
        ...booking.event._doc,
        creator: user.bind({}, booking.event._doc.creator)
      };
      await Booking.findByIdAndDelete(args.bookingId);
      return event;
    } catch (err) {
      dbErr(err);
      return err;
    }
  }
};
