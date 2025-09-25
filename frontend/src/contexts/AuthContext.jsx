import { createContext, useContext, useLayoutEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // null = not logged in
    const [token, setToken] = useState();

    // useEffect(() => {
    //     const fetchToken = async () => {
    //         try{
    //             const response = await api.post("/auth/refresh", {}, {
    //                 withCredentials: true
    //             });
    //             setToken(response.data.accessToken);
    //         } catch {
    //             setToken(null);
    //         }
    //     }

    //     fetchToken();
    // }, []);

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
                if (error.response) {
                    if (error.response.status === 401) {
                        try {
                            const response = await api.post('auth/refresh', {}, {
                                withCredentials: true
                            });
    
                            setToken(response.data.accessToken);
    
                            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
                            originalRequest._retry = true;
    
                            return api(originalRequest);
                        } catch {
                            setToken(null);
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