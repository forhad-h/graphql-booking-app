import { Request } from "express";
import { dbErr } from "../../debugger/debugger";
import User from "../../models/User";
import Event, { EventInput } from "../../models/Event";
import { transformEvent } from "./helpers/transformer";
import { dateToString } from "../../helpers/date";
import { user } from "./helpers/relational";

export default {
  events: async () => {
    const events = await Event.find()
      .populate("creator")
      .exec();

    return events.map(event => {
      return transformEvent(event);
    });
  },
  createEvent: async (args: EventInput, req: Request) => {
    if (!req.isAuth) throw new Error("User not Authenticated!");
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId
      });

      const result = await event.save();

      const creator = await User.findById(req.userId).exec();
      if (!creator) throw new Error("User not exists");
      creator.createdEvents.push(event.id);
      await creator.save();

      return {
        ...result._doc,
        date: dateToString(event._doc.date),
        creator: user.bind({}, result._doc.creator)
      };
    } catch (err) {
      dbErr(err);
      return err;
    }
  }
};
