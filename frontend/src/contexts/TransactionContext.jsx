import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);
    // const didRun = useRef(false);

    // Fetch data on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionResponse = await api.get("/transactions/summary");
                setTransactions(transactionResponse.data);
                const chartResponse = await api.get("/transactions/chart");
                setChartData(chartResponse.data);
            }
            catch {
                setTransactions([]);
                setChartData([]);
            }
            finally {
                setChartLoading(false);
            }
        }
        fetchData();
    }, []);

    // const login = (tokenData) => setToken(tokenData);

    // const logout = () => setToken(null);

    const value = {
        transactions,
        chartData,
        chartLoading,
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};

export function useTransaction() {
    return useContext(TransactionContext);
};