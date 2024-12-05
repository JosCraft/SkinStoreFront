import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // Import jwt-decode for decoding the token
import { PublicRoutes } from "../models";
import { apiService } from "../services/apiServices";
import React from "react";

const AdminGuard = () => {
    const checkAuthorized = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                // Decode the token
                const decodedToken = jwtDecode(token);
                // Check the role from the decoded token payload
                if (decodedToken && decodedToken.role === "ADMIN") {
                    return true;
                } else {
                    console.error("Access denied: Invalid role.");
                    return false;
                }
            } catch (error) {
                console.error("Error decoding token", error);
                return false;
            }
        } else {
            console.error("No token found.");
            return false;
        }
    };

    const [isAuthorized, setIsAuthorized] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        const result = checkAuthorized();
        setIsAuthorized(result);
    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? <Outlet /> : <Navigate replace to={PublicRoutes.HOME} />;
};

export default AdminGuard;
