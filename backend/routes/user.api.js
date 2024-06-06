/**
 * user와 관련된 API */
import express from 'express';
import userController from '../controller/user.controller.js';
const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);

export default router;