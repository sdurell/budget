import { format, isValid, parse as parseDate } from "date-fns";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useToast } from "../contexts/ToastContext";
import useParseCSV from "../hooks/UseParseCSV";

const expectedHeaders = ["date", "name", "amount", "category"];

export default function UploadModal({ show, setShow, uploadStatements }){
    const { filename, parse } = useParseCSV();
    const { showToast } = useToast();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [transactions, setTransactions] = useState(null);

    async function handleFileChange(e) {
        setTransactions(null);
        setError("");
        
        const file = e.target.files[0];
        if(!file) return;

        setLoading(true);

        try {
            const parsedData = await parse(file, {
                headers: expectedHeaders,
                validateRow: (row) => {
                    const parsedDate = parseDate(row.date, 'M/d/yyyy', new Date());
                    // Return TRUE if invalid
                    return (
                        isNaN(Number(row.amount)) || 
                        !isValid(parsedDate) || 
                        !row.name.length || 
                        !row.category.length
                    )
                },
                transform: (row) => {
                    // Return the modified row
                    const parsedDate = parseDate(row.date, 'M/d/yyyy', new Date());
                    return {
                        ...row,
                        date: format(parsedDate, 'yyyy-MM-dd')
                    }; 
                }
            });
            setTransactions(parsedData);
        } catch (err) {
            setError(err);
            setTransactions(null);
        } finally {
            setLoading(false);
        }
    };

    async function handleSubmit(e) {
        const form = e.currentTarget;
        e.preventDefault();

        if(form.checkValidity() === false){
            e.stopPropagation();
            setValidated(true);
            return;
        }
        
        try {
            setLoading(true);
            const parsedDate = parseDate(date, 'yyyy-MM-dd', new Date());
            const formattedDate = format(parsedDate, 'yyyy-MM-dd');
            await uploadStatements(name, company, formattedDate, filename, transactions);
            setValidated(false);
            handleClose();
            showToast("Statement uploaded successfully!");
        } catch (error) {
            setError(error.response?.data?.message || "Upload failed");
            setValidated(true);
        } finally {
            setLoading(false);
        }
    };

    function handleClose() {
        setShow(false);
        setValidated(false);
        setName("");
        setCompany("");
        setDate("");
        setTransactions(null);
        setError("");
    };

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="uploadForm" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formName" className="mb-3">
                        <Form.Label column sm="3">Name</Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formCompany" className="mb-3">
                        <Form.Label column sm="3">Company</Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formDate" className="mb-3">
                        <Form.Label column sm="3">Date</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formFile" className="mb-3">
                        <Form.Label column sm="3">Upload csv</Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                required
                                type="file"
                                accept=".csv"
                                onChange={(e) => handleFileChange(e)}/>
                        </Col>
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    disabled={loading}
                    variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    disabled={loading}
                    variant="primary"
                    type="submit"
                    form="uploadForm"
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );

}