import { Table } from "react-bootstrap";
import { LoremIpsum } from "react-lorem-ipsum";
import { useTransaction } from '../contexts/TransactionContext';

function TransactionTable() {

    const { transactions } = useTransaction();

    if (transactions.length == 0){
        return <LoremIpsum p="1"/>;
    }

    return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Table striped bordered hover size="sm" className=" table-bordered bg-success text-light rounded-3 overflow-hidden">
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