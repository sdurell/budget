import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

function Home() {
    const { logout } = useAuth();

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
                            await api.post('/auth/logout');
                            logout();
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
            </button>
        </div>
    </div>
    )
}

export default Home