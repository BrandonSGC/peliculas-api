import { Router } from "express";
import {
  getExpertos,
  createExperto,
  updateExperto,
  deleteExperto,
} from "../controllers/experto.controller.js";

const router = Router();

router.get("/expertos", getExpertos);
router.post("/expertos", createExperto);
router.put("/expertos/:id", updateExperto);
router.delete("/expertos/:id", deleteExperto);

export default router;
