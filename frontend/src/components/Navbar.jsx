import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Container } from "react-bootstrap";

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      sessionStorage.removeItem('token');
      setUser(null);
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