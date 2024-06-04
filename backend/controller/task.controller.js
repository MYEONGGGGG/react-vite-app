import Task from '../models/Task.js';

/**
 * HTTP CODE
 * - 200 OK: "요청이 성공적으로 처리되었으며, 일반적인 성공 응답"
 *           기존 리소스 조회, 수정 등 일반적인 성공 응답에 사용.
 *           새로운 리소스 생성이 아닐 때 사용.
 * - 201 Created: "요청이 성공적으로 처리되었으며, 서버가 새로운 리소스를 생성"
 *                새로운 리소스 생성 시 사용.
 *                새 리소스의 위치와 세부 정보를 제공.
 * */

const taskController = {};

// Task 생성
taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = await Task.create({ task, isComplete });
        res.status(201).json({ status: "success", data: newTask });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

// Task 목록 조회
taskController.getTaskList = async (req, res) => {
    try {
        const taskList = await Task.findAll();
        res.status(200).json({ status: "success", data: taskList });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

// Task 조회 (id 기준)
// taskController.getTaskById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const task = await Task.findByPk(id);
//         if (task) {
//             res.status(200).json(task);
//         } else {
//             res.status(404).json({ error: 'Task not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Task 업데이트
taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, isComplete } = req.body;
        const [updated] = await Task.update({ task, isComplete }, {
            where: { id }
        });
        if (updated) {
            const updatedTask = await Task.findByPk(id);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Task 삭제
taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Task.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default taskController;