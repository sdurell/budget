import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import StatementItem from "../components/StatementItem";
import { useUser } from "../contexts/UserContext";

function Statements() {
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState([]);

    const { user, userLoading } = useUser();
    const [ data, setData ] = useState([
        {id: "1", name: "Oct 2025", company: "discover", file: "discoct2025.csv", date: "10-20-25"},
        {id: "2", name: "Oct 2025", company: "citi", file: "citi2025oct.csv", date: "10-20-25"},
        {id: "3", name: "Sept 2025", company: "discover", file: "discspet2025.csv", date: "10-18-25"},
        {id: "4", name: "Aug 2025", company: "capital one", file: "capaug25.csv", date: "10-20-25"},
        {id: "5", name: "Oct 2025", company: "discover", file: "discoct2025.csv", date: "10-20-25"},
        {id: "6", name: "Oct 2025", company: "citi", file: "citi2025oct.csv", date: "10-20-25"},
        {id: "7", name: "Sept 2025", company: "discover", file: "discspet2025.csv", date: "10-18-25"},
        {id: "8", name: "Aug 2025", company: "capital one", file: "capaug25.csv", date: "10-20-25"}  
    ]);
    const [ idChecked, setIdChecked ] = useState([]);

    function handleCheck(checked, id) {
        setIdChecked(prev => 
            checked ? [...prev, id] : prev.filter(s => s !== id)
        )
    };

    return (
    <>
        <Container fluid="lg" className="mt-md-5 mt-4">
            <Row className="align-items-center">
                <Col sm={12} md={9}>
                    {/* { userLoading ? `` : `${user.username}'s statements`} */}
                    <h1 className="display-4 mb-4 mb-md-0">Your statements</h1>
                </Col>
                <Col sm={12} md={3} className="text-md-end ">
                    <ButtonGroup size="lg">
                        <Button variant="dark" onClick={() => setShow(true)}>
                            Upload
                        </Button>
                        <Button 
                            disabled={idChecked.length === 0}
                            variant="dark"
                            onClick={() => {
                                setData(data.filter(s => !idChecked.includes(s.id)));
                                setIdChecked([]);
                            }}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className="mt-md-5 mt-4 mb-5">
                <Col>
                    <ListGroup>
                        {data.map(s => (
                            <StatementItem 
                                key={s.id}
                                data={s}
                                checked={idChecked.includes(s.id)}
                                onChange={handleCheck}
                            />
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
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
                    <Form.Group as={Row} controlId="formFileMultiple" className="mb-3">
                        <Form.Label column sm="3">Upload csv</Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="file" 
                                multiple
                                onChange={(e) => {
                                    const file = e.target.files
                                    console.log(file)
                                }}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => setShow(false)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default Statements