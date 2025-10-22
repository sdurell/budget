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
                const response = await api.get("/auth/liveness");
                window.location.reload();
            } catch {
                setSeconds(prev => {
                    return prev * 2 > LIMIT ? (prev === LIMIT ? LIMIT + 1 : LIMIT ) : prev * 2;
                });
            }
        }
        console.log(seconds);
        setTimeout(fetchLiveness, seconds * 1000);
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



        // <div className="container d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
        //     <div className="text-center border rounded p-4 shadow-sm bg-white">
        //         <h2>Welcome Back!</h2>
        //         <p>Please login</p>
        //         <form onSubmit={handleSubmit}>
        //             <input 
        //                 type="text"
        //                 className="form-control my-2"
        //                 placeholder="Username"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 required
        //             />
        //             <input
        //                 type="password"
        //                 className="form-control my-2"
        //                 placeholder="Password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //             {error && <p className="text-danger">{error}</p>}
        //             <button type="submit" className="btn btn-primary w-100 mb-4 mt-2" disabled={loading}>
        //                 {loading ? "Loading..." : "Login"}
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
};