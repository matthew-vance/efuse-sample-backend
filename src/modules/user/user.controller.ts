import { RequestHandler } from "express";
import userService from "./user.service";
import postService from "../post/post.service";

const getById: RequestHandler = async (req, res) => {
  const user = await userService.findById(req.params.userId);
  if (user) res.status(200).send(user);
  else res.sendStatus(404);
};

const post: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    const locationUri = `/api/user/${user._id}`;
    res.location(locationUri).status(201).json({
      location: locationUri,
      entity: user,
    });
  } catch (err) {
    req.log.error(err.toString());
    next(err);
  }
};

const patch: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.userId, req.body);
    if (user) {
      const locationUri = `/api/user/${user._id}`;
      res.status(200).json({
        location: locationUri,
        entity: user,
      });
    } else res.sendStatus(404);
  } catch (err) {
    req.log.error(err.toString());
    next(err);
  }
};

const getPosts: RequestHandler = async (req, res) => {
  const posts = await postService.find({ user: req.params.userId });
  if (posts) res.status(200).send(posts);
  else res.sendStatus(404);
};

export default {
  getById,
  post,
  patch,
  getPosts,
};
