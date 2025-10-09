import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [transactions, setTransactions] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [chart, setChart] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);

    // Fetch user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
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

    // Fetch transactions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/me/transactions");
                setTransactions(response.data);
            }
            catch {
                setTransactions([]);
            } finally {
                setTransactionsLoading(false);
            }
        }
        fetchData();
    }, []);

    // Fetch chart
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/me/chart");
                setChart(response.data);
            }
            catch {
                setChart([]);
            } finally {
                setChartLoading(false);
            }
        }
        fetchData();
    }, []);

    const value = {
        user,
        userLoading,
        transactions,
        transactionsLoading,
        chart,
        chartLoading
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