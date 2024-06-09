import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secPassword, setSecPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // 새로 고침 막기
        event.preventDefault();

        try {
            // 비밀번호 검증
            if (password !== secPassword) {
                throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
            }

            const response = await api.post(`/user`, { name, email, password });

            // 로그인 성공 시, 로그인 화면으로
            if (response.status === 201 || response.status === 200) {
                navigate("/login");
            } else {
                throw new Error(response.data.error);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <Container>
            <div className="display-center">
                <Form className="login-box" onSubmit={ handleSubmit }>
                    <h1>회원가입</h1>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="string" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSecPassword">
                        <Form.Label>re-enter the password</Form.Label>
                        <Form.Control type="password" placeholder="re-enter the password" onChange={(e) => setSecPassword(e.target.value)} />
                        { error && <div className="red-error">{error}</div> }
                    </Form.Group>

                    <Button className="button-primary" type="submit">
                        회원가입
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default RegisterPage;