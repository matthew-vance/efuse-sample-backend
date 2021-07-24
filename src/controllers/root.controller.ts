import { RequestHandler } from "express";
import { rootService } from "../services";

const get: RequestHandler = async (req, res, next) => {
  const message = rootService.sayHello();
  res.send(message);
  next();
};

export default {
  get,
};
