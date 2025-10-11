import { Col, Container, Row } from "react-bootstrap";
import { LoremIpsum } from "react-lorem-ipsum";
import SpendingPie from "../components/SpendingPie";

function Home() {

    return (
        <Container fluid="lg" className="mt-5">
            <Row>
                <Col className="text-center display-3 mb-4">
                    Hello (username)!
                </Col>
            </Row>
            <Row className="mt-5">
                <Col lg="5">
                    <SpendingPie/>
                </Col>
                <Col className="text-left">
                    <LoremIpsum p="1"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home