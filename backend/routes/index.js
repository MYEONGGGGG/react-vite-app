/**
 * 경로 설정(service 연결) */
import taskApi from "./task.api.js";
import userApi from "./user.api.js";
import express from 'express';

const router = express.Router();

// task api 호출이 들어올 경우, taskApi를 연결해준다.
router.use('/tasks', taskApi);

// user api 호출이 들어올 경우, userAip를 연결해준다.
router.use('/user', userApi);

export default router;