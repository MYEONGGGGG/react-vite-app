import User from '../models/User.js';
import bcrypt from "bcrypt";

const saltRounds = 10;
const userController = {};

/**
 * Sequelize 에서 조회 시 사용
 * - findOne
 *   특정 조건을 만족하는 첫 번째 레코드를 찾음
 *   주로 조건에 맞는 첫 번째 레코드를 찾기 위해 사용
 * - findByPk
 *   기본 키를 사용하여 레코드를 찾음
 * */

// 유저 생성
userController.createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        // Sequelize 방식으로 이메일 주소 찾기
        const user = await User.findOne({ where: { email } });

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        // console.log('hash(암호화):', hash);

        // 사용자 중복 검증
        if (user) {
            throw new Error(`이미 가입된 사용자입니다! ${name}`);
        }

        // 사용자 등록
        const newUser = await User.create({ name, password: hash, email });
        await newUser.save();
        res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

// 이메일 로그인
userController.loginWithEmail = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (user) {
            // 사용자가 입력한 비밀번호화 db 비밀번호 값을 비교
            const isMatch = await bcrypt.compareSync(password, user.password);

            // 비밀번호가 맞을 경우
            if (isMatch) {
                const token = user.generateToken();
                return res.status(200).json({ status: "success", user, token });
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

userController.getUser = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error("cannot find user");
        }
        res.status(200).json({ status: "success", user });
    } catch (e) {
        res.status(400).json({ status: "fail", message: e.message });
    }
};

export default userController;