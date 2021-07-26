import express from "express";
import Joi from "joi";
import { validate } from "../../middleware";
import controller from "./user.controller";

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  username: Joi.string(),
});

const router = express.Router();
router.get("/:userId", controller.getById);
router.post("/", validate(createUserSchema, "body"), controller.post);
router.patch("/:userId", validate(updateUserSchema, "body"), controller.patch);
router.get("/:userId/posts", controller.getPosts);

export default router;
