import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import { useState } from "react";
import api from "./utils/api.js";

function App() {
    const [user, setUser] = useState(null);
    const getUser = async () => {
        try {
            const token = sessionStorage.getItem("token");
            // const response = await api.post(`/user/login`, { email, password });
        } catch (e) {

        }
    };

    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute user={ user }><TodoPage /></PrivateRoute>
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;