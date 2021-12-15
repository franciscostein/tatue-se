import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>Reset password</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password" className="m-3">
                    <Form.Label className="font-75">New password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        className="text-center"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="confirmpassword" className="m-3">
                    <Form.Label className="font-75">Confirm password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        className="text-center"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" size="lg" className="mt-4">
                    Reset password
                </Button>
            </Form>
        </Container>
    );
}

export default ResetPassword;