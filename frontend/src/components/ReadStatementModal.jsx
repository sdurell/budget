import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TransactionTable from "./TransactionTable";

export default function ReadStatementModal({ show, setShow, statement}){
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const { id, name, company, filename, date, transactions } = statement;

    function handleClose() {
        setError("");
        setShow(false);
    }

    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p
                    className="fs-5"
                >
                    {company}, {filename}
                </p>
                <TransactionTable transactions={transactions}>
                </TransactionTable>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={loading}
                    variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}