/**
 * Express 서버 설정 */
import express from 'express';
import indexRouter from "./routes/index.js";
import checkTables from "./models/checkTables.js";
import cors from "cors";

const app = express();
const port = process.env.BACKEND_PORT || 3000; // .env에 설정한 백엔드 포트가 없을 경우, 기본 포트인 3000으로 연결한다.

// Enable All Cors Requests
app.use(cors());

// # express 내장 미들웨어 // express 4.16 이후 버전부터 bodyParser 기능이 내장되어있다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DBMS 연결 확인 및 테이블 동기화
checkTables()
    .then(() => { console.log('SUCCESS: DBMS 연결 및 동기화에 성공하였습니다.') })
    .catch((error) => { console.log('ERROR: DBMS 연결 및 동기화에 실패하였습니다.(' + error + ')') });

// 미들웨어 등록
app.use('/api', indexRouter);

// 라우트 정의
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});