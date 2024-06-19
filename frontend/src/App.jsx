import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import Navbar from "./components/Navbar.jsx";
import {useEffect, useState} from "react";
import api from "./utils/api.js";

function App() {
    // user 정보 관리
    const [user, setUser] = useState(null);

    // token 정보로 유저 정보를 가져온다.
    const getUser = async () => {
        try {
            const storedToken = sessionStorage.getItem("token");

            // 저장된 토큰이 이미 존재한다면(= 사용자가 로그인을 한번이라도 했다.)
            if (storedToken) {
                const response = await api.get('/user/me');
                console.log('rrr', response);
                setUser(response.data.user);
            }
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={
                    <PrivateRoute user={ user }><TodoPage /></PrivateRoute>
                } />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage user={ user } setUser={ setUser } />} />
            </Routes>
        </div>
    );
}

export default App;