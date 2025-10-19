import { Col, Container, Row } from "react-bootstrap";
import LoremIpsum from "react-lorem-ipsum";
import { useUser } from "../contexts/UserContext";

function Statements() {
    const { user, userLoading } = useUser();

    return (
        <Container fluid="lg" className="mt-5">
            <Row>
                <Col className="text-left display-4">
                    { userLoading ? `` : `${user.username}'s statements`}
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                { userLoading ? "" : <LoremIpsum p="1"/>}
                
            </Row>
        </Container>
    )
}

export default Statements