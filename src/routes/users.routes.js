import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, setUserStatus, loginUser } from '../controllers/users.controller.js';

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/:status", setUserStatus);
router.delete("/users/:id", deleteUser);
router.post('/login', loginUser);

export default router;