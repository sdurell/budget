import { Col, Container, Row } from "react-bootstrap";
import SpendingPie from "../components/SpendingPie";
import TransactionTable from "../components/TransactionTable";
import { useUser } from "../contexts/UserContext";

function Home() {
    const { user, userLoading, transactionsLoading, chartLoading } = useUser();

    const dataLoading = transactionsLoading || chartLoading;  

    return (
        <Container fluid="lg" className="mt-5">
            <Row>
                <Col className="text-center display-3 mb-4">
                    { userLoading ? `` : `Hello ${user.username}!`}
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                {/* Todo: Show spinner if data takes a while to load. Below shows spinner for a split second every load which is ugly */}
                {/* { dataLoading ? (<MySpinner/>) : ( */}
                { dataLoading ? "" : (
                    <>
                        <Col md="5">
                            <SpendingPie/>
                        </Col>
                        <Col md="7">
                            <TransactionTable/>
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    )
}

export default Home