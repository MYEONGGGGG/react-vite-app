import React from "react";
import TodoItem from "./TodoItem.jsx";

const TodoBoard = ({ todoList, onDelete, onUpdate }) => {

    return (
        <div>
            <h2>해야할일 목록</h2>
            {
                todoList.length > 0 ?
                  todoList.map((item) => <TodoItem item = { item } key={ item.id } onDelete={ onDelete } onUpdate={ onUpdate } />)
                  : <h2>There is no Item to show</h2>
            }
        </div>
    );
};

export default TodoBoard;