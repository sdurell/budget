import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
    const navigate = useNavigate();

    return (
    <div className="home container mt-5">
        <div className="text-center">
            <h1 className="display-4 mb-4">
                Home Page
            </h1>
            <p className="lead">
                Hello! If you are not logged in, you should not be here!
            </p>
            <button 
                className="btn btn-danger mt-3" 
                onClick={() => {
                    const fetchLogout = async () => {
                        try{
                            await api.post('/logout');
                            logout();
                            navigate("/login", {replace: true});
                        } catch {}
                    }
                    fetchLogout();
                }}
            >
                Logout
            </button>
            <button 
                className="btn btn-primary mt-3" 
                onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login", {replace: true});
                }}
            >
                Logout
            </button>
        </div>
    </div>
    )
}

export default Home