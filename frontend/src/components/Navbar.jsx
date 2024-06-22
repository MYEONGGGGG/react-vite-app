import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Container } from "react-bootstrap";
import useStore from "../store/store.js";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, resetUser } = useStore();

    const handleLogout = () => {
      sessionStorage.removeItem('token');
      resetUser();
      navigate('/login');
    };

    return (
        <Container>
            <Nav className="navbar">
                { user ?
                    (<span>
                        {user.name} 님 <Button className="btn btn-sm btn-success" onClick={handleLogout}>Logout</Button> </span>
                    ) : ( <span className="navbar-brand fw-bold">할일 앱</span> )}
            </Nav>
        </Container>
    );
};

export default Navbar;