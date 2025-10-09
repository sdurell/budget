import { Spinner } from "react-bootstrap";

function MySpinner() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="info" style={{width:"3rem", height:"3rem", "--bs-spinner-border-width": "0.5rem"}}/>
        </div>    
    );
}

export default MySpinner