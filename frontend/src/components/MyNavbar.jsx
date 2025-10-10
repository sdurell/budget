import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import basketDollar from "../assets/basket-dollar.svg";
import { useAuth } from "../contexts/AuthContext";
import api from '../services/api';
import TestButton from "./TestButton";

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
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link disabled="true">Transactions</Nav.Link>
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
                    <TestButton/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar