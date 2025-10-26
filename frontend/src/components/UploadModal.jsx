import Papa from "papaparse";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const expectedHeaders = ["date", "name", "amount", "category"];

export default function UploadModal({ show, setShow }){
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    // TODO: create a custom hook to handle csv validation
    function handleFileChange(e) {
        setData(null);
        setError("");
        const file = e.target.files[0];

        if(!file) return;
        if(file.type !== "text/csv" || !file.name.endsWith(".csv")) {
            setError("File is not a valid csv type");
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const {data, errors, meta} = results;
                if(errors.length){
                    setError("CSV parsing error: " + errors[0].message);
                    return;
                }

                const actualHeaders = meta.fields;
                const missing = expectedHeaders.filter(h => !actualHeaders.includes(h));
                const extra = actualHeaders.filter(h => !expectedHeaders.includes(h));

                if(missing.length > 0){
                    setError(`Missing columns: ${missing.join(", ")}`);
                    return;
                }

                if(extra.length > 0){
                    console.warn(`Extra columns: ${extra.join(", ")}`);
                }

                const invalid = data.filter(row => (
                    isNaN(Number(row.amount)) || 
                    isNaN(new Date(row.date)) || 
                    !row.name.length || 
                    !row.category.length
                ))

                if(invalid.length > 0){
                    setError(`Found ${invalid.length} invalid rows`);
                    return;
                }

                setData(data);
            }
        });
    };

    function handleSubmit() {
        console.log(data);
    };

    return(
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Use this to submit your financial statements to the system. 
                    Your statements will be used to build your financial history.
                </p>
                <Form>
                    <Form.Group as={Row} controlId="formFile" className="mb-3">
                        <Form.Label column sm="3">Upload csv</Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="file"
                                accept=".csv"
                                onChange={(e) => handleFileChange(e)}/>
                        </Col>
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );

}