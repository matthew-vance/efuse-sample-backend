import express from "express";
import controller from "./user.controller";

const router = express.Router();
router.get("/:userId", controller.getById);
router.post("/", controller.post);
router.patch("/:userId", controller.patch);

export default router;
