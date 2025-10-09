<<<<<<< HEAD
import { Loader } from '@mantine/core';
=======
import React from "react";
>>>>>>> 8e8c8a94622253208c309a83a9d255fb9ede857c
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
<<<<<<< HEAD
    const { token, initializing } = useAuth();
    const location = useLocation();

    if (initializing) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Loader color="blue" size="lg" type="dots" />
        </div>
    );

    if (!token ){
=======
    const { user } = useAuth();
    const location = useLocation();

    if (!user ){
>>>>>>> 8e8c8a94622253208c309a83a9d255fb9ede857c
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        );
    }
    return children;
};

export default ProtectedRoute;