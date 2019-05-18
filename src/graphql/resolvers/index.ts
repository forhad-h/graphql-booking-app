import userResolver from "./user";
import eventResolver from "./event";
import bookingResolver from "./booking";

export default {
  ...userResolver,
  ...eventResolver,
  ...bookingResolver
};
