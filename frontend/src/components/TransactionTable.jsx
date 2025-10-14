import { Table } from "react-bootstrap";
import { useUser } from '../contexts/UserContext';

function TransactionTable() {

    const { transactions } = useUser();

    return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Table striped bordered hover size="sm" className="table-bordered bg-success text-light rounded-3 overflow-hidden">
                <thead>
                    <tr>
                        { Object.keys(transactions[0]).map(key => (
                            <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => (
                        <tr>
                            {Object.values(t).map(val => (
                                <td key={val}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    
    );
}

export default TransactionTable;