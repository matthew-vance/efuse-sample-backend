import express from "express";
import controller from "./user.controller";

const router = express.Router();
router.get("/:userId", controller.getById);
router.post("/", controller.post);

export default router;
