import { Request, Response, NextFunction } from "express";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";

import { tokenErr } from "../debugger/debugger";

type DToken = {
  userId?: ObjectId;
  email?: string;
  tokenExpiration?: number;
};
type AuthStatus = {
  dToken: DToken;
  msg: string;
};

const auth = (req: Request, next: NextFunction, authStatus: AuthStatus) => {
  if (
    authStatus.msg !== "success" &&
    Object.keys(!authStatus.dToken).length == 0
  ) {
    tokenErr(authStatus.msg);
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = authStatus.dToken.userId;
  return next();
};

export default (req: Request, res: Response, next: NextFunction) => {
  let decodedToken: DToken = {};
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return auth(req, next, {
      dToken: decodedToken,
      msg: "Authorization header not found"
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return auth(req, next, {
      dToken: decodedToken,
      msg: "Authorization header is empty"
    });
  }

  if (process.env.JSON_TOKEN_SECRET) {
    try {
      decodedToken = <DToken>jwt.verify(token, process.env.JSON_TOKEN_SECRET);
    } catch (err) {
      tokenErr(err);
      return auth(req, next, {
        dToken: decodedToken,
        msg: "Token can not be decoded"
      });
    }
  } else {
    return auth(req, next, {
      dToken: decodedToken,
      msg: "Please provide JWT secret"
    });
  }
  if (!decodedToken) {
    return auth(req, next, {
      dToken: decodedToken,
      msg: "Decoded token is empty"
    });
  }

  return auth(req, next, {
    dToken: decodedToken,
    msg: "success"
  });
};
