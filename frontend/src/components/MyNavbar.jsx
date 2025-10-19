import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import basketDollar from "../assets/basket-dollar.svg";
import { useAuth } from "../contexts/AuthContext";
import api from '../services/api';

function MyNavbar() {
    const { logout } = useAuth();

    return (
        <Navbar expand="md" bg="light">
            <Container fluid="lg">
                <Navbar.Brand >
                    <img src={basketDollar} width="40" height="40"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/statements">
                            <Nav.Link>Statements</Nav.Link>
                        </LinkContainer>
                        <Nav.Link disabled="true">Settings</Nav.Link>
                    </Nav>
                    <Button 
                        variant="danger" 
                        onClick={() => {
                            const fetchLogout = async () => {
                                try{
                                    await api.post("/auth/logout");
                                    logout();
                                } catch {}
                            }
                            fetchLogout();
                        }}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar