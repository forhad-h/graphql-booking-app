import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { dbErr, tokenErr } from "../../debugger/debugger";
import User, { UserInput, LoginInput } from "../../models/User";

export default {
  createUser: async (args: UserInput) => {
    try {
      const userExist = await User.findOne({
        email: args.userInput.email
      }).exec();
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
  login: async ({ email, password }: LoginInput) => {
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) throw new Error("User not found");
      const matchPass = await bcrypt.compare(password, user.password);
      if (!matchPass) throw new Error("Password doesn't match");
      if (process.env.JSON_TOKEN_SECRET) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JSON_TOKEN_SECRET,
          {
            expiresIn: "1h"
          }
        );
        return { userId: user.id, token, tokenExpiration: 1 };
      } else {
        tokenErr("Please provide JWT secret");
      }
    } catch (err) {
      dbErr(err);
      return err;
    }
  }
};
