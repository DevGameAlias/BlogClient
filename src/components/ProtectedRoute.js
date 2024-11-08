import React from "react";
import { Navigate } from "react-router-dom";
// Component to protect admin pages from being viewed by user
const ProtectedRoute = ({ children }) => {
    //Check if the token is present in the cookies
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

    //Conditional if there is no token they are routed to the /login page
    if(!token) {
        return <Navigate to="/login" />
    }
    // If token is found, render the protected component
    return children;

}

export default ProtectedRoute;