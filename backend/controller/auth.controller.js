import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authController = {};

// 환경변수 호출
dotenv.config({ path: '../.env' }); // 최상위 경로(react-vite-app) 설정

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        // console.log('Headers:', req.headers); // 헤더 전체를 출력
        // console.log('Authorization Header:', tokenString); // Authorization 헤더를 출력

        if (!tokenString) {
           throw new Error("Invalid token");
        }

        const token = tokenString.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
            console.log('jwt verify: ', payload);
            if (error) {
                console.log('JWT Verify Error: ', error);
                throw new Error("Invalid token");
            }

            console.log('Payload: ', payload);

            if (!payload) {
                throw new Error("Payload is missing");
            }

            req.userId = payload._id;
            next(); // user.api.js => userController.getUser 로 이동
        });
    } catch (e) {
        res.status(401).json({ status: "fail", message: e.message });
    }
};

export default authController;