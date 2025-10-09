<<<<<<< HEAD
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../services/api.js";
=======
import { createContext, useContext, useEffect, useState } from "react";
>>>>>>> 8e8c8a94622253208c309a83a9d255fb9ede857c

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
    // null = not logged in, undefined = still checking (initializing)
    const [token, setToken] = useState();
    const [initializing, setInitializing] = useState(true);
    const didRun = useRef(false);

    // Try to restore session on first load
    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        const fetchToken = async () => {
            try {
                const response = await api.post("/auth/refresh", {}, {
                    withCredentials: true,
                });
                setToken(response.data.accessToken);
            } catch {
                setToken(null);
            } finally {
                setInitializing(false);
            }
        };
        fetchToken();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = 
                !config._retry && token
                    ? `Bearer ${token}`
                    : config.headers.Authorization;
        return config;
        }, error => Promise.reject(error));

        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (
                    error.response &&
                    !originalRequest._retry && 
                    !originalRequest.url.includes("/auth/refresh")
                ) {
                    if (error.response.status === 401) {
                        originalRequest._retry = true;
                        try {
                            const response = await api.post('/auth/refresh', {}, {
                                withCredentials: true
                            });
    
                            setToken(response.data.accessToken);
                            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
                            return api(originalRequest);
                        } catch {
                            setToken(null);
                            return Promise.reject(error);
                        }
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        }
    }, []);

    const login = (tokenData) => setToken(tokenData);

    const logout = () => setToken(null);

    const value = {
        token,
        login,
        logout,
        initializing,
=======
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
>>>>>>> 8e8c8a94622253208c309a83a9d255fb9ede857c
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