import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, rolesPermitidos}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return<div>Cargando...</div>
    }

    if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>
};

export default ProtectedRoute;

