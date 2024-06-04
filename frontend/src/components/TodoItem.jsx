import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onDelete, onUpdate }) => {
    const { id, isComplete } = item;

    const btnDeleteClick = () => {
        onDelete(id);
    };

    const btnEditClick = () => {
        const updatedTask = { isComplete: !isComplete };
        onUpdate(id, updatedTask);
    };

    return (
        <Row>
            <Col xs={12}>
                <div className="todo-item">
                    <div className="todo-content">{ item.task }</div>

                    <div>
                        <button className="button-delete" onClick={ btnDeleteClick }>
                            삭제
                        </button>
                        <button className="button-delete" onClick={ btnEditClick } >
                            { isComplete ? "끝남" : "안끝남" }
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TodoItem;