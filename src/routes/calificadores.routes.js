import { Router } from "express";
import {
  getCalificadores,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion,
} from "../controllers/calificadores.controller.js";

const router = Router();

router.get("/calificadores", getCalificadores);
router.post("/calificadores", createCalificacion);
router.put("/calificadores/:id", updateCalificacion);
router.delete("/calificadores/:id", deleteCalificacion);

export default router;
