import User from '../models/User.js';
import bcrypt from "bcrypt";

const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const user = await User.findOne({ email });
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

userController.loginWithEmail = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            // 사용자가 입력한 비밀번호화 db 비밀번호 값을 비교
            const isMatch = await bcrypt.compareSync(password, user.password);

            // 비밀번호가 맞을 경우
            if (isMatch) {

            }
        }
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

export default userController;