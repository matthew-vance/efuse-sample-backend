import express from "express";
import controller from "./post.controller";

const router = express.Router();
router.get("/:postId", controller.getById);
router.post("/", controller.post);
router.patch("/:postId", controller.patch);

export default router;
