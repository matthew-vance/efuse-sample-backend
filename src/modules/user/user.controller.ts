import { RequestHandler } from "express";
import service from "./user.service";

const getById: RequestHandler = (req, res) => {
  const user = service.readById(req.params.userId);
  res.status(200).send(user);
};

const post: RequestHandler = async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    const locationUri = `/api/user/${user._id}`;
    res.location(locationUri).status(201).json({
      location: locationUri,
      entity: user,
    });
  } catch (err) {
    req.log.error(err);
    next(err);
  }
};

export default {
  getById,
  post,
};
