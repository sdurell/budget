import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SpendingPie from "../components/SpendingPie";
import TransactionTable from "../components/TransactionTable";
import { useUser } from "../contexts/UserContext";
import useTransaction from "../hooks/UseTransaction";

function Home() {
    const { user, userLoading } = useUser();  
    const { transactions, transactionsLoading, fetchTransactions } = useTransaction();

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    if (userLoading || transactionsLoading) {
        return;
    }

    return (
        <Container fluid="lg" className="mt-5">
            <Row>
                <Col className="text-center display-3 mb-4">
                    { `Hello ${user.username}!`}
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                <Col md="5" style={{ maxHeight: "400px" }}>
                    <SpendingPie transactions={transactions}/>
                </Col>
                <Col md="7">
                    <TransactionTable transactions={transactions}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home