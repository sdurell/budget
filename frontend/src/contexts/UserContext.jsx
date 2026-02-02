import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading ] = useState(true);

    // Fetch user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserLoading(true);
                const response = await api.get("/users/me");
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setUserLoading(false);
            }
        };
        fetchUser();
    }, []);

    const value = {
        user,
        userLoading,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export function useUser() {
    return useContext(UserContext);
};