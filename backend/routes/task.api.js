/**
 * task와 관련된 API */
import express from 'express';
import taskController from "../controller/task.controller.js";
import authController from "../controller/auth.controller.js";
const router = express.Router();

// 미들웨어인 authController 에서 토큰값을 이용해 유저 정보를 가져오면 createTask로 유저 정보를 넘긴다.
router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTaskList);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

export default router;