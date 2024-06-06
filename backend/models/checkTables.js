import sequelize from './index.js';
import Task from './Task.js';
import User from './User.js';

const checkTables = async () => {
    try {
        await sequelize.authenticate();
        console.log('SUCCESS: DBMS 연결을 성공하였습니다.');

        const queryInterface = sequelize.getQueryInterface();
        const tables = await queryInterface.showAllTables();

        console.log(tables);

        // users 테이블이 존재하는지 확인
        if (!tables.includes('users')) {
            // users 테이블이 존재하지 않으면 생성
            await User.sync();
            console.log('SUCCESS: users 테이블이 생성되었습니다.');
        } else {
            console.log('INFO: users 테이블이 이미 존재합니다.');
        }

        // tasks 테이블이 존재하는지 확인
        if (!tables.includes('tasks')) {
            // tasks 테이블이 존재하지 않으면 생성
            await Task.sync();
            console.log('SUCCESS: tasks 테이블이 생성되었습니다.');
        } else {
            console.log('INFO: tasks 테이블이 이미 존재합니다.');
        }
    } catch (error) {
        console.error('ERROR: 테이블 동기화 중 오류가 발생하였습니다. (' + error + ')');
    }
};

export default checkTables;