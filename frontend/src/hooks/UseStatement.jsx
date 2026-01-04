import { useCallback, useState } from "react";
import api from "../services/api";
import { useToast } from "../contexts/ToastContext";

export default function useStatement() {
    const { showToast } = useToast();

    const [ statements, setStatements ] = useState([]);
    const [ idChecked, setIdChecked ] = useState([]);

    const handleCheck = (checked, id) => {
        setIdChecked(prev => 
            checked ? [...prev, id] : prev.filter(s => s !== id)
        )
    };
    
    const fetchStatements = useCallback(async () => {
        try {
            const response = await api.get("/statements");
            setStatements(response.data);
        } catch (error) {
            console.error("Failed to fetch statements", error);
            showToast("Failed to fetch statements.");
        }
    }, []);

    const uploadStatements = async (name, company, month, filename, transactions) => {
        try {
            await api.post(
                "/statements",
                {
                    name: name,
                    company: company,
                    month: month,
                    filename: filename,
                    transactions: transactions
                },
                { withCredentials: true }
            );
            await fetchStatements();
        } catch (error) {
            throw error;
        }
    };

    const deleteStatements = async () => {
        try {
            console.log(idChecked)
            await api.delete(
                "/statements",
                {
                    params: { ids: idChecked.join(',') },
                    withCredentials: true
                }
            );
            setStatements(prev => prev.filter(s => !idChecked.includes(s.id)));
            setIdChecked([]);
        } catch (error) {
            throw error;
        }
    };
    
    return {
        statements,
        idChecked,
        handleCheck,
        fetchStatements,
        uploadStatements,
        deleteStatements
    };
}