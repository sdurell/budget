import { Container } from 'react-bootstrap';

function MyFooter() {
    return (
        <footer className="bg-dark py-5 mt-5">
            <Container className="container text-light text-center">
                <p className="display-4 mb-3">Budget</p>
            </Container>
        </footer>
    );
}

export default MyFooter