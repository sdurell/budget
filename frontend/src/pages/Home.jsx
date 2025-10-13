import { Col, Container, Row } from "react-bootstrap";
import SpendingPie from "../components/SpendingPie";
import TransactionTable from "../components/TransactionTable";

function Home() {

    return (
        <Container fluid="lg" className="mt-5">
            <Row>
                <Col className="text-center display-3 mb-4">
                    Hello (username)!
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md="5">
                    <SpendingPie/>
                </Col>
                <Col md="7">
                    {/* <LoremIpsum p="1"/> */}
                    <TransactionTable/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home