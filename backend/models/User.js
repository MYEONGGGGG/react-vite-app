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

// 필요한 정보만 추출 // this._doc => this.get()
User.prototype.toJSON = function() {
    // 필요한 정보만 추출
    const obj = Object.assign({}, this.get());
    // 비밀번호를 제외
    delete obj.password;
    // 그 외 정보만 내보낸다.
    return obj;
};

// token method(postgreSQL, sequelize 기준)
User.prototype.generateToken = function() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    return token;
};

export default User;