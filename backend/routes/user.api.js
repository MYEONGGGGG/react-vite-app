/**
 * user와 관련된 API */
import express from 'express';
import userController from '../controller/user.controller.js';
import authController from "../controller/auth.controller.js";

const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);
router.get('/me', authController.authenticate, userController.getUser);

export default router;