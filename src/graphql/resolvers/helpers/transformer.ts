import { UserDocModel } from "../../../models/User";
import { EventDocModel } from "../../../models/Event";
import { BookingDocModel } from "../../../models/Booking";
import { dateToString } from "../../../helpers/date";
import { user, events, singleEvent } from "./relational";

export const transformEvent = (event: EventDocModel) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind({}, event._doc.creator)
  };
};

export const transformUser = (user: UserDocModel) => {
  return {
    ...user._doc,
    password: null,
    createdEvents: events.bind({}, user._doc.createdEvents)
  };
};

export const transformBooking = (booking: BookingDocModel) => {
  return {
    ...booking._doc,
    event: singleEvent.bind({}, booking._doc.event),
    user: user.bind({}, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};
