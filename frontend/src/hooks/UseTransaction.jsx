import { useCallback, useState } from "react";
import { useToast } from "../contexts/ToastContext";
import api from "../services/api";

export default function useTransaction() {
    const { showToast } = useToast();
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionsLoading, setTransactionsLoading ] = useState(true);
    
    const fetchTransactions = useCallback(async () => {
        try {
            setTransactionsLoading(true);
            const response = await api.get("/transactions");
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
            showToast("Failed to fetch transactions");
        } finally {
            setTransactionsLoading(false);
        }
    }, []);

    return {
        transactions,
        transactionsLoading,
        fetchTransactions,
    };
}