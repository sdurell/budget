import { useAuth } from "../contexts/AuthContext";

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
        </div>
    </div>
    )
}

export default Home