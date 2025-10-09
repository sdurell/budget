import { Loader } from '@mantine/core';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const { token, initializing } = useAuth();
    const location = useLocation();

    if (initializing) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Loader color="blue" size="lg" type="dots" />
        </div>
    );

    if (!token ){
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        );
    }
    return children;
};

export default ProtectedRoute;