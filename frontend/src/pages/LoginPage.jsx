import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api.js";

const LoginPage = ({ user, setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
      event.preventDefault();

      try {
          const response = await api.post(`/user/login`, { email, password });

          if (response.status === 200) {
              setUser(response.data.user);
              sessionStorage.setItem("token", JSON.stringify(response.data.token));

              api.defaults.headers["authorization"] = "Bearer " + response.data.token;
              navigate("/");
          }
          throw new Error(response.message);
      } catch (e) {
          setError(e.message);
      }
    };

    // 유저 정보가 존재한다면
    if (user) {
        return <Navigate to="/" />
    }

    return (
        <Container>
            <div className="display-center">
                { error && <div className="red-error">{ error }</div> }
                <Form className="login-box" onSubmit={ handleLogin }>
                    <h1>로그인</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="button-box">
                        <Button type="submit" className="button-primary">
                            Login
                        </Button>
                        <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default LoginPage;