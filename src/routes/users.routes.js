import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:nombreUsuario", updateUser);
router.delete("/users/:nombreUsuario", deleteUser);

export default router;
