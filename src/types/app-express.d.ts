declare namespace Express {
  export interface Request {
    isAuth?: boolean;
    userId?: string | import("bson").ObjectId;
    status: string;
  }
}
