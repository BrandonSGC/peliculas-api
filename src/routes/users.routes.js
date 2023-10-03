import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, setUserStatus } from '../controllers/users.controller.js';

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/:status", setUserStatus);
router.delete("/users/:id", deleteUser);

export default router;
