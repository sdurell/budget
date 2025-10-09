import { Container, Nav, Navbar } from 'react-bootstrap';
import basketDollar from "../assets/basket-dollar.svg";

function MyNavbar() {

    return (
        <Navbar expand="lg" bg="light">
            <Container fluid="lg">
                <Navbar.Brand href="#">
                    <img src={basketDollar} width="40" height="40"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#" disabled="true">logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar