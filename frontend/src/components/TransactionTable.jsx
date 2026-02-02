import React, { useMemo } from "react";
import { Table } from "react-bootstrap";

function TransactionTable({ transactions }) {

    const columns = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];
        return Object.keys(transactions[0]).filter(key => key !== "id");
    }, [transactions]);

    if (!transactions || transactions.length === 0) {
        return (
            <div 
                className="text-center p-3 text-muted"
            >
                No transactions available
            </div>
        );
    }

    return (
        <div 
            style={{ maxHeight: '400px', overflowY: 'auto' }}
        >
            <Table 
                striped 
                bordered 
                hover 
                size="sm" 
                className="bg-success rounded-3 overflow-hidden"
            >
                <thead>
                    <tr>
                        {columns.map(key => (
                                <th key={key} className="text-capitalize">
                                    {key}
                                </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id}>
                            {columns.map(col => (
                                    <td key={`${t.id}-${col}`}>
                                        {t[col]}
                                    </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TransactionTable;