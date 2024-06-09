import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function TodoPage() {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");

    // 조회
    const getTasks = async () => {
        const response = await api.get('/tasks');
        setTodoList(response.data.data);
    };

    useEffect(() => {
        getTasks();
    }, []);

    // 추가
    const addTask = async () => {
        try {
            const response = await api.post('/tasks', {
                task: todoValue,
                isComplete: false
            });

            // 응답 결과가 정상일 경우 (상태 코드가 200 또는 201인 경우)
            if (response.status === 200 || response.status === 201) {
                console.log('success');
                setTodoValue("");
                getTasks();
            } else {
                throw new Error('task can not be added.');
            }
        } catch (e) {
            console.error('api post Error: ' + e);
        }
    };

    // 삭제
    const deleteTask = async (taskId) => {
        try {
            // 선택한 할 일을 서버에서 삭제
            const response = await api.delete(`/tasks/${taskId}`);

            // 응답 결과가 정상적으로 처리된 경우 (상태 코드가 200 또는 204인 경우)
            // 삭제한 경우 응답 본문에 데이터가 없음으로(data: "") 보이기때문에 204 코드도 처리결과로 받아야한다.
            if (response.status === 200 || response.status === 204) {
                console.log('Task deleted successfully');
                getTasks(); // 할 일 목록 갱신
            } else {
                throw new Error('Failed to delete task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // 수정
    const updateTask = async (taskId, updatedTask) => {
        try {
            // 선택한 할 일을 서버에서 수정
            const response = await api.put(`/tasks/${taskId}`, updatedTask);

            // 응답 결과가 정상적으로 처리된 경우
            if (response.status === 200) {
                console.log('Task updated successfully');
                getTasks(); // 할 일 목록 갱신
            } else {
                throw new Error('Failed to update task.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };


    return (
        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={ todoValue }
                        onChange={ (event) => setTodoValue( event.target.value ) }
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={ addTask }>추가</button>
                </Col>
            </Row>

            <TodoBoard
                todoList = { todoList }
                onDelete={ deleteTask }
                onUpdate={ updateTask }
            />
        </Container>
    );
}

export default TodoPage;