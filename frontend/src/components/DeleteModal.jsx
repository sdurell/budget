import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal({ show, setShow, setShowToast, setToastMessage, deleteStatements }) {

    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    
    function handleClose() {
        setError("");
        setShow(false);
    };
    
    async function handleDelete() {
        try {
            setLoading(true);
            await deleteStatements();
            handleClose();
            setToastMessage("Statement(s) deleted successfully!");
            setShowToast(true);
        } catch (error) {
            setError(error.response?.data?.message || "Delete failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete these statements?</p>
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
                    variant="danger"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Modal.Footer>           
        </Modal>
    )
}