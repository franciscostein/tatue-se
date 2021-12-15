import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>Forgot password</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="m-3">
                    <Form.Label className="font-75">E-mail</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        className="text-center"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" size="lg" className="mt-4">
                    Send e-mail
                </Button>
            </Form>
        </Container>
    );
}

export default ForgotPassword;