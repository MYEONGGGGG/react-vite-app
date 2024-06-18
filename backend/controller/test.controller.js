import jwt from 'jsonwebtoken';

const testController = {};

testController.runTest = (req, res) => {
    const secretKey = 'your_secret_key'; // 비밀 키 직접 설정

    // 토큰 생성
    const token = jwt.sign({ id: 1 }, secretKey, { expiresIn: '1d' });
    console.log('[TEST] Generated Token:', token);

    // 토큰 검증
    jwt.verify(token, secretKey, (error, payload) => {
        if (error) {
            console.error('[TEST] JWT Verify Error:', error);
            return res.status(401).json({ status: 'fail', message: '[TEST] Invalid token', error: error.message });
        } else {
            console.log('[TEST] Payload:', payload);
            return res.status(200).json({ status: 'success', message: '[TEST] Token is valid', payload });
        }
    });
};

export default testController;