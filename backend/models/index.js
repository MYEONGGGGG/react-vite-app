/**
 * Sequelize: PostgreSQL 데이터베이스에 연결하기 위한 설정 */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// 환경변수 호출
dotenv.config({ path: '../.env' });

// DBMS 연결 정보
const config = {
    username: process.env.POSTGRES_USER,
    hostname: process.env.POSTGRES_HOSTNAME,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT
};

// 연결 정보 출력
console.log('[config] ', config);

// Sequelize 연결
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.hostname,
        dialect: config.dialect,
        port: config.port
    }
);

export default sequelize;