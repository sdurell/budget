import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Used to redirect after login
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            // call backend api
            const response = await api.post("/auth/login", JSON.stringify({username, password}, {
                withCredentials: true
            }));           
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
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
            <div className="text-center border rounded p-4 shadow-sm bg-white">
                <h2>Welcome Back!</h2>
                <p>Please login</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        className="form-control my-2"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-control my-2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login