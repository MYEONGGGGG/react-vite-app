/**
 * Express 서버 설정 */
import express from 'express';
import sequelize from "./models/index.js";
import indexRouter from "./routes/index.js";

const app = express();
const port = process.env.BACKEND_PORT || 3000;

// DBMS 연결 확인
// # PostgreSQL: sequelize 설정
sequelize.authenticate()
    .then(() => {
        console.log('SUCCESS: DBMS 연결을 성공하였습니다.');
    })
    .catch((error) => {
        console.log('ERROR: DBMS 연결 중 오류가 발생하였습니다. (' + error + ')');
    });

// 미들웨어 등록
app.use('/api', indexRouter);

// # express 내장 미들웨어 // express 4.16 이후 버전부터 bodyParser 기능이 내장되어있다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 정의
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// 데이터베이스 동기화
sequelize.sync()
    .then(() => console.log('데이터베이스 동기화 성공'))
    .catch(err => console.error('데이터베이스 동기화 실패:', err));

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});