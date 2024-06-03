import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api.js";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");

    const addTask = async () => {
      try {
          console.log('todoValue: ' + todoValue);

          const response = await api.post('/tasks', {
              task: todoValue,
              isComplete: false
          });

          // 응답 결과가 정상일 경우
          if (response.status === 200) {
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

    const getTasks = async () => {
        const response = await api.get('/tasks');
        setTodoList(response.data.data);
    };

    useEffect(() => {
        getTasks();
    }, []);

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

            <TodoBoard todoList = { todoList } />
        </Container>
    );
}

export default App;