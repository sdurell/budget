import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

function Login() {
    const { token, initializing, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Used to redirect after login
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    
    if (token) return <Navigate to={from} replace />;


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await api.post("/auth/login",
                JSON.stringify({username, password}),
                {
                    withCredentials: true
                }
            );

            login(response.data.accessToken);
            navigate(from, {replace : true});
        } catch (err) {
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
            <div className="text-center border rounded p-4 shadow-sm bg-white">
                <h2>Welcome Back!</h2>
                <p>Please login</p>
                <Form
                    id="loginForm"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <FloatingLabel
                        controlId="formUsername"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="formPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    {error && <p className="text-danger">{error}</p>}
                    <Button 
                        disabled={loading}
                        variant="primary"
                        form="loginForm"
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default Login