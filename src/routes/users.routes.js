import { Router } from "express";
import { getUsers, getUserByUsername, createUser, updateUser, deleteUser, setUserStatus, loginUser, updateFailedAttempts, getUsuarioActivo } from '../controllers/users.controller.js';

const router = Router();

router.get("/users", getUsers);
router.get("/users/:username", getUserByUsername);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/:status", setUserStatus);
router.delete("/users/:id", deleteUser);
router.post('/login', loginUser);
router.put('/updateFailedAttempts', updateFailedAttempts);
router.get('/usuario/:username/activo', getUsuarioActivo);

export default router;