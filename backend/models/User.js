import { DataTypes } from 'sequelize';
import sequelize from "./index.js";

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
    }
}, {
    // 테이블명 지정
    tableName: 'users',
    // 유저 생성일시
    timestamps: true
});

export default User;