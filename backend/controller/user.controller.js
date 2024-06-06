import User from '../models/user';

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Error(`이미 가입된 사용자입니다! ${name}`);
        }
    } catch (error) {

    }
};

export default userController;