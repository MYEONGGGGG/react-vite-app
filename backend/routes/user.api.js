/**
 * user와 관련된 API */
import express from 'express';
import userController from '../controller/user.controller.js';
import authController from "../controller/auth.controller.js";
import testController from "../controller/test.controller.js";

const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);
router.get('/me', authController.authenticate, userController.getUser);

// 테스트 경로 추가
router.get('/test', testController.runTest);

export default router;