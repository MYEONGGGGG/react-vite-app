import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item }) => {

    // 삭제
    const deleteTask = async (taskId) => {
        try {
            // 선택한 할 일을 서버에서 삭제
            const response = await api.delete(`/tasks/${taskId}`);

            // 응답 결과가 정상적으로 처리된 경우
            if (response.status === 200) {
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
        <Row>
            <Col xs={12}>
                <div className="todo-item">
                    <div className="todo-content">{ item.task }</div>

                    <div>
                        <button className="button-delete">삭제</button>
                        <button className="button-delete">끝남</button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TodoItem;