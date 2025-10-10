import { Button } from "react-bootstrap";
import api from "../services/api";

function TestButton() {
    return (
        <Button
            className="btn btn-primary"
            onClick={() => {
                const fetchTest = async () => {
                    try {
                        const response = await api.get("/test");
                        console.log(response.data);
                    } catch {}
                };

                fetchTest();
            }}
        >
            Test
        </Button>
    );
};

export default TestButton;