/**
 * task와 관련된 API */
import express from 'express';
import taskController from "../controller/task.controller.js";
const router = express.Router();

router.post('/', taskController.createTask);

router.get('/', taskController.getTaskList);

router.put('/:id', (req, res) => {
    res.send("update task");
});

router.delete('/:id', (req, res) => {
    res.send("delete task");
});

export default router;