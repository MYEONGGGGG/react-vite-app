import React from "react";
import TodoItem from "./TodoItem.jsx";

const TodoBoard = ({ todoList }) => {

    return (
        <div>
            <h2>해야할일 목록</h2>
            {
                todoList.length > 0 ? todoList.map((item) => <TodoItem item = { item } key={ item.id } />)
                : <h2>There is no Item to show</h2>
            }
        </div>
    );
};

export default TodoBoard;