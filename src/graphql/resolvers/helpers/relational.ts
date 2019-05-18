import { ObjectId } from "bson";

import { dbErr } from "../../../debugger/debugger";
import Event from "../../../models/Event";
import User from "../../../models/User";
import { transformEvent, transformUser } from "./transformer";

export const events = async (
  eventIds: Array<ObjectId>
): Promise<Array<any>> => {
  try {
    const getEvents = await Event.find({ _id: { $in: eventIds } });
    if (!getEvents) throw new Error("Event not found");
    return getEvents.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    dbErr(err);
    return err;
  }
};

export const singleEvent = async (eventId: ObjectId): Promise<any> => {
  try {
    const getEvent = await Event.findById(eventId);
    if (!getEvent) throw new Error("Event not found");
    return transformEvent(getEvent);
  } catch (err) {
    dbErr(err);
    return err;
  }
};

export const user = async (userId: ObjectId): Promise<any> => {
  try {
    const getUser = await User.findById(userId);
    if (!getUser) throw new Error("User not found");
    return transformUser(getUser);
  } catch (err) {
    return err;
  }
};
