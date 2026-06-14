import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import SpendingPie from "../components/SpendingPie";
import TransactionTable from "../components/TransactionTable";
import { useUser } from "../contexts/UserContext";
import useTransaction from "../hooks/UseTransaction";

const DATE_RANGES = {
    "30 days": 30,
    "90 days": 90,
    "6 months": 180,
    "12 months": 360,
    "18 months": 540,
    "All time": null
};

function Home() {
    const { user, userLoading } = useUser();  
    const { transactions, transactionsLoading, fetchTransactions } = useTransaction();

    const [ dateRange, setDateRange ] = useState(Object.keys(DATE_RANGES)[0]);

    useEffect(() => {
        let startDate = undefined;
        
        const days = DATE_RANGES[dateRange];
        if (days) {
            const date = new Date();
            date.setDate(date.getDate() - days);
            startDate = date.toISOString().split('T')[0]; // Formats the date as YYYY-MM-DD
        }

        fetchTransactions(startDate);
    }, [fetchTransactions, dateRange]);

    if (userLoading) {
        return;
    }

    return (
        <Container fluid="lg" className="mt-5">
            <Row>
                <Col className="text-center display-3 mb-4">
                    { `Hello ${user.username}!`}
                </Col>
            </Row>
            
            <div className="border rounded p-4 mt-3 mt-md-4 mb-5 shadow-sm bg-white">
                <Row className="mb-3">
                    <Col md={{ span: 7, offset: 5 }} className="d-flex justify-content-between align-items-end">
                        <h4 className="m-0">Transactions</h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {dateRange}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {Object.keys(DATE_RANGES).map((range) => (
                                    <Dropdown.Item key={range} onClick={() => setDateRange(range)}>{range}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 7, order: 2 }}>
                        <TransactionTable transactions={transactions}/>
                    </Col>
                    <Col md={{ span: 5, order: 1 }} className="mt-5 mt-md-0 d-flex justify-content-center" style={{ maxHeight: "400px" }}>
                        <SpendingPie transactions={transactions}/>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Home