import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // null = not logged in
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    useEffect(() => {
        if (user !== null){
            localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user]);

    const login = (userData) => setUser(userData);

    const logout = () => setUser(null);

    const value = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
};