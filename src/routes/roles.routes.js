import { Router } from "express";
import { createRol, updateRol, deleteRol, getRoles } from '../controllers/roles.controller.js';

const router = Router();

router.get("/roles", getRoles);
router.post("/roles", createRol);
router.put("/roles/:id", updateRol);
router.delete("/roles/:id", deleteRol);

export default router;