import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, ListGroup, Row, Toast, ToastContainer } from "react-bootstrap";
import DeleteModal from "../components/DeleteModal";
import StatementItem from "../components/StatementItem";
import UploadModal from "../components/UploadModal";
import useStatement from "../hooks/UseStatement";

function Statements() {
    const { statements, idChecked, handleCheck, fetchStatements, uploadStatements, deleteStatements } = useStatement();

    const [showUpload, setShowUpload] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        fetchStatements();
    }, [ fetchStatements ]);

    return (
    <>
        <Container fluid="lg" className="mt-md-5 mt-4">
            <Row className="align-items-center">
                <Col sm={12} md={9}>
                    <h1 className="display-4 mb-4 mb-md-0">Your statements</h1>
                </Col>
                <Col sm={12} md={3} className="text-md-end ">
                    <ButtonGroup size="lg">
                        <Button variant="dark" onClick={() => setShowUpload(true)}>
                            Upload
                        </Button>
                        <Button 
                            disabled={idChecked.length === 0}
                            variant="dark"
                            onClick={() => setShowDelete(true)}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className="mt-md-5 mt-4 mb-5">
                <Col>
                    <ListGroup>
                        {statements.map(s => (
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

        <UploadModal 
            show={showUpload}
            setShow={setShowUpload}
            setShowToast={setShowToast}
            setToastMessage={setToastMessage}
            uploadStatements={uploadStatements}
        />

        <DeleteModal
            show={showDelete}
            setShow={setShowDelete}
            setShowToast={setShowToast}
            setToastMessage={setToastMessage}
            deleteStatements={deleteStatements} 
        />

        <ToastContainer position="bottom-center">
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    </>
    )
}

export default Statements