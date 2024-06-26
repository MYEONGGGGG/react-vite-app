import { DataTypes } from 'sequelize';
import sequelize from "./index.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// 환경변수 호출
dotenv.config({ path: '../.env' }); // 최상위 경로(react-vite-app) 설정

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
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
    // 유저 생성일시 // createdAt, updatedAt 필드를 자동으로 생성한다.
    timestamps: true
});

// 필요한 정보만 추출 // this._doc => this.get()
User.prototype.toJSON = function() {
    // 필요한 정보만 추출
    const obj = Object.assign({}, this.get());
    // 비밀번호를 제외
    delete obj.password;
    // 그 외 정보만 내보낸다.
    // console.log(obj);
    return obj;
};

// token method(postgreSQL, sequelize 기준)
User.prototype.generateToken = function() {
    // console.log('[JWT Generate Key]', process.env.JWT_SECRET_KEY);

    // 로그인한 유저의 토큰키를 생성
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    console.log('[Generated Token]', token);
    return token;
};

export default User;