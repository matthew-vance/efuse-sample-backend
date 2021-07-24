import express from "express";
import { userModule } from "./modules";

const router = express.Router();
router.use("/user", userModule.router);

export default router;
