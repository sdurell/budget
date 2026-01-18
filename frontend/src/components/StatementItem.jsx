import { format, parseISO } from "date-fns";
import { Badge, Form, ListGroup } from "react-bootstrap";

export default function StatementItem({data, checked, onChange}) {

    const { id, name, company, filename, date } = data;

    const dateTag = format(parseISO(date), "MM-yyyy");

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
                    className="pe-none"
                />
            </Form>
            <div className="ms-3 me-auto">
                <div className="fw-bold">{name}</div>
                {company}, {filename}
            </div>
            <Badge bg="secondary" >{dateTag}</Badge>
        </ListGroup.Item>
    );
}