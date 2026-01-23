import { format, parseISO } from "date-fns";
import { useRef, useState } from "react";
import { Badge, Form, ListGroup } from "react-bootstrap";
import ReadStatementModal from "./ReadStatementModal";

export default function StatementItem({data, checked, onChange}) {

    const { id, name, company, filename, date } = data;

    const dateTag = format(parseISO(date), "MM-yyyy");

    const [ showRead, setShowRead ] = useState(false);
    const checkRef = useRef(null);

    return (
        <>
            <ListGroup.Item 
                className="d-flex justify-content-between align-items-start"
                action
                onClick={(e) => {
                    if (e.ctrlKey) {
                        onChange(!checked, id);
                    } else {
                        setShowRead(true);
                    }                    
                }}
            >
                <div
                    className="p-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        onChange(!checked, id);
                        checkRef.current?.focus();
                    }}
                    style={{ cursor: "pointer", margin: "-0.5rem" }}
                >
                    <Form.Check 
                        ref={checkRef}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onChange(!checked, id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ 
                            fontSize: "1.2rem",
                            cursor: "pointer"
                        }}
                    />
                </div>
                <div className="ms-3 me-auto">
                    <div className="fw-bold">{name}</div>
                    {company}, {filename}
                </div>
                <Badge bg="secondary" >{dateTag}</Badge>
            </ListGroup.Item>

            <ReadStatementModal 
                show={showRead}
                setShow={setShowRead}
                statement={data}
            />
        </>
    );
}