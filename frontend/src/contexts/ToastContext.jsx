import { useContext, useState, createContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [ show, setShow ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ variant, setVariant ] = useState("");

    const showToast = (msg) => {
        setMessage(msg);
        setShow(true);
    };

    const value = {
        showToast,
    }

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer position="bottom-center">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>{message}</Toast.Body>    
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    );
};

export function useToast() {
    return useContext(ToastContext);
};