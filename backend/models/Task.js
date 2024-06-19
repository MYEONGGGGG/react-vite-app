import { DataTypes } from 'sequelize';
import sequelize from "./index.js";
import User from "./User.js";

// Task 모델 정의
const Task = sequelize.define("Task", {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    authorId: { // author 필드는 User 모델과 연관되어 있다.
        type: DataTypes.UUID, // UUID 타입을 사용하여 고유 식별자를 생성한다.
        allowNull: false, // null 값을 허용하지 않는다.
        references: {
            model: 'users', // 참조하는 모델명
            key: 'id'  // 참조하는 모델의 키
        }
    }
}, {
    // 테이블명 지정
    tableName: 'tasks'
});

// Task 모델과 User 모델 간의 관계 설정
Task.belongsTo(                      // belongsTo 메서드는 Task 모델이 User 모델에 속함을 정의(= Task는 User의 외래 키를 가진다.)
    User,                            // 관계를 설정할 모델
    {
        as: 'author',                // 관계에 대한 별칭 설정(Task 모델에서 User 모델을 참조할 때 사용)
        foreignKey: 'authorId'       // 외래 키 지정(Task 모델의 authorId 컬럼이 User 모델의 키본 키 'id'를 참조함을 의미)
    }
);

export default Task;