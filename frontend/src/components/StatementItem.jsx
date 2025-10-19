import { Badge, Form, ListGroup } from "react-bootstrap";

export default function StatementItem({data, checked, onChange}) {

    const { id, name, company, file, date } = data;

    return (
        <ListGroup.Item 
            className="d-flex justify-content-between align-items-start"
            action
            onClick={() => {
                onChange(!checked, id);
            }}
        >
            <Form>
                <Form.Check 
                    type="checkbox"
                    checked={checked}
                    readOnly
                />
            </Form>
            <div className="ms-3 me-auto">
                <div className="fw-bold">{name}</div>
                {company}, {file}, {date}
            </div>
            <Badge bg="primary" pill>{id}</Badge>
        </ListGroup.Item>
    );
}