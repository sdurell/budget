import { Table } from "react-bootstrap";
import { useUser } from '../contexts/UserContext';

function TransactionTable() {

    const { transactions } = useUser();

    if (transactions.length === 0){
        return;
    }

    return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Table striped bordered hover size="sm" className="table-bordered bg-success text-light rounded-3 overflow-hidden">
                <thead>
                    <tr>
                        {Object.keys(transactions[0])
                            .filter(key => key !== "id")
                            .map(key => (
                                <th key={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id}>
                            {Object.keys(t)
                                .filter(key => key != "id")
                                .map(key => (
                                    <td key={`${t.id}-${key}`}>
                                        {t[key]}
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