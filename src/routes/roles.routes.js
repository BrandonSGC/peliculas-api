import { Router } from "express";
import { getRoles } from '../controllers/roles.controller.js';

const router = Router();

router.get("/roles", getRoles);
router.get("/roles/:id");
router.post("/roles");
router.put("/roles/:id");
router.delete("/roles/:id");

export default router;
