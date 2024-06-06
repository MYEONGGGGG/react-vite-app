/**
 * user와 관련된 API */
import express from 'express';
// import userController from '../controllers/user.controller.js';
const router = express.Router();

// router.post('/', userController.create);
router.post('/', async (req, res) => {
    console.log('create user!');
})

// router.get('/', taskController.getTaskList);
//
// router.put('/:id', taskController.updateTask);
//
// router.delete('/:id', taskController.deleteTask);

export default router;