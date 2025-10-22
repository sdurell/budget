import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import api from "../services/api";

export default function NetworkErr(){
    const [ seconds, setSeconds ] = useState(2);
    const LIMIT = 2 * 60 // 2 mins

    // liveness check
    useEffect(() => {
        const fetchLiveness = async () => {
            try {
                await api.get("/auth/liveness");
                window.location.reload();
            } catch {
                setSeconds(prev => {
                    return prev * 2 > LIMIT 
                        ? (prev === LIMIT ? LIMIT + 1 : LIMIT ) 
                        : prev * 2;
                });
            }
        }
        const timeout = setTimeout(fetchLiveness, seconds * 1000);
        return () => clearTimeout(timeout);
    }, [seconds])


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
            <div className="border rounded p-4 shadow-sm bg-white text-start">
                <h1 className="display-5 pe-5">Network Error</h1>
                <p className="mt-3">Cannot connect to backend.</p>
                <Button 
                    variant="danger" 
                    className="ms-auto d-block"
                    onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        </Container>    
    );
};