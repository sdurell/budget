import api from "../services/api";

function TestButton() {
    return (
        <button
            className="btn btn-primary mt-3"
            onClick={() => {
                const fetchTest = async () => {
                    try {
                        const response = await api.get("/test");
                        console.log(response.data);
                    } catch {}
                };

                fetchTest();
            }}
        >
            Test
        </button>
    );
};

export default TestButton;