import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const { token } = useAuth();
    const location = useLocation();

    if (!token ){
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        );
    }
    return children;
};

export default ProtectedRoute;