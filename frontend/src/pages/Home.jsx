import { useNavigate } from "react-router-dom";

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