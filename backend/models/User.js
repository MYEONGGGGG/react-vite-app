import { DataTypes } from 'sequelize';
import sequelize from "./index.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// 환경변수 호출
dotenv.config({ path: '../.env' }); // 최상위 경로(react-vite-app) 설정

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

// token method(postgreSQL, sequelize 기준)
User.prototype.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
    return token;
};

export default User;