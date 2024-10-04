import React from 'react'
import { Navigate } from "react-router-dom"
import useUserContext from '../hooks/useUserContext'

const ProtectedRoutes = ({ children }) => {
    const { user, saveUser } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />
    }

    return children;
};

export default ProtectedRoutes;