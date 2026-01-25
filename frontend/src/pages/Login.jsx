import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

function Login() {
    const { token, login } = useAuth();
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


    async function handleSubmit(e) {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false){
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/auth/login",
                {
                    "username": username,
                    "password": password
                },
                {
                    withCredentials: true
                }
            );
            setValidated(false);
            login(response.data.accessToken);
            navigate(from, {replace : true});
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
            setValidated(true);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <Container 
            className="d-flex justify-content-center align-items-center" 
            style={{ height: "75vh" }}
        >
            <div className="text-center border rounded p-4 shadow-sm bg-white">
                <h2>Welcome Back!</h2>
                <p>Please login</p>
                <Form
                    id="loginForm"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <Form.Control 
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mb-2"
                        size="md"
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mb-3"
                        size="md"
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <Button 
                        disabled={loading}
                        variant="primary"
                        type="submit"
                        form="loginForm"
                        className="d-block ms-auto mb-3"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default Login