import { DataTypes } from 'sequelize';
import sequelize from "./index.js";

const Task = sequelize.define("Task", {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    // 테이블명 지정
    tableName: 'tasks'
});

export default Task;