import { RequestHandler } from "express";
import postService from "./post.service";

const getById: RequestHandler = async (req, res) => {
  const post = await postService.findById(req.params.postId);
  if (post) res.status(200).send(post);
  else res.sendStatus(404);
};

const post: RequestHandler = async (req, res, next) => {
  try {
    const post = await postService.create(req.body);
    const locationUri = `/api/post/${post._id}`;
    res.location(locationUri).status(201).json({
      location: locationUri,
      entity: post,
    });
  } catch (err) {
    req.log.error(err.toString());
    next(err);
  }
};

const patch: RequestHandler = async (req, res, next) => {
  try {
    const post = await postService.update(req.params.postId, req.body);
    if (post) {
      const locationUri = `/api/post/${post._id}`;
      res.status(200).json({
        location: locationUri,
        entity: post,
      });
    } else res.sendStatus(404);
  } catch (err) {
    req.log.error(err.toString());
    next(err);
  }
};

export default {
  getById,
  post,
  patch,
};
