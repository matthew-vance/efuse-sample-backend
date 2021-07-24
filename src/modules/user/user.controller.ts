import { RequestHandler } from "express";
import service from "./user.service";

const getById: RequestHandler = (req, res) => {
  const user = service.readById(req.params.userId);
  res.status(200).send(user);
};

const post: RequestHandler = (req, res) => {
  const id = service.create(req.body);
  res.location(`/api/user/${id}`).sendStatus(201);
};

export default {
  getById,
  post,
};
