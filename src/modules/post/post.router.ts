import express from "express";
import Joi from "joi";
import { validate } from "../../middleware";
import controller from "./post.controller";

const createPostSchema = Joi.object({
  user: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const updatePostSchema = Joi.object({
  user: Joi.string(),
  title: Joi.string(),
  content: Joi.string(),
});

const router = express.Router();
router.get("/:postId", controller.getById);
router.post("/", validate(createPostSchema, "body"), controller.post);
router.patch("/:postId", validate(updatePostSchema, "body"), controller.patch);

export default router;
