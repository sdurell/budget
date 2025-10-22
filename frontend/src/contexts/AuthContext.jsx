import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // null = not logged in, undefined = still checking (initializing)
    const [token, setToken] = useState();
    const [initializing, setInitializing] = useState(true);
    const [initNetworkErr, setInitNetworkErr] = useState(false);
    const [midSessionNetworkErr, setMidSessionNetworkErr] = useState(false); 
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
            } catch (error) {
                if (error.code === "ERR_NETWORK" || error.message === "Network Error"){
                    setInitNetworkErr(true);
                }
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
            async (response) => {
                // remove alert if connection to backend is restored
                setMidSessionNetworkErr(false);
                return response
            },
            async (error) => {
                const originalRequest = error.config;
                // unauthorized
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
                // cant connect to backend
                else if (error.code === "ERR_NETWORK" || error.message === "Network Error"){
                    setMidSessionNetworkErr(true);
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
        initNetworkErr,
        midSessionNetworkErr,
        setMidSessionNetworkErr
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