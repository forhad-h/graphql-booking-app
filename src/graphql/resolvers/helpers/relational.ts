import { ObjectId } from "bson";
import DataLoader from "dataloader";

import { dbErr } from "../../../debugger/debugger";
import Event from "../../../models/Event";
import User from "../../../models/User";
import { transformEvent, transformUser } from "./transformer";

export const eventLoader = new DataLoader((eventIds: Array<any>) => {
  return events(eventIds);
});

export const userLoader = new DataLoader((userIds: Array<any>) => {
  return users(userIds);
});

export const events = async (
  eventIds: Array<ObjectId>
): Promise<Array<any>> => {
  try {
    const getEvents = await Event.find({ _id: { $in: eventIds } });
    getEvents.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString) - eventIds.indexOf(b._id.toString())
      );
    });
    if (!getEvents) throw new Error("Event not found");
    return getEvents.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    dbErr(err);
    return err;
  }
};

export const users = async (userIds: Array<ObjectId>): Promise<Array<any>> => {
  try {
    const getUsers = await User.find({ _id: { $in: userIds } });
    if (!getUsers) throw new Error("User not found");
    return getUsers;
  } catch (err) {
    dbErr(err);
    return err;
  }
};

export const singleEvent = async (eventId: ObjectId): Promise<any> => {
  try {
    const getEvent = await eventLoader.load(eventId.toString());
    if (!getEvent) throw new Error("Event not found");
    return getEvent;
  } catch (err) {
    dbErr(err);
    return err;
  }
};

export const user = async (userId: ObjectId): Promise<any> => {
  try {
    const getUser = await userLoader.load(userId.toString());
    if (!getUser) throw new Error("User not found");
    return transformUser(getUser);
  } catch (err) {
    return err;
  }
};
