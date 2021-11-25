import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = event => {
        const form = event.currentTarget;

        // isPasswordMatched();

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    // const isPasswordMatched = () => {
    //     if (password !== passwordConfirmation) {
    //         setErrorMessage('Passwords do not match');
    //     }
    // }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>SignUp</h1>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formSignUpEmail" className="mb-3 mx-5">
                    <Form.Label className="font-75">E-mail</Form.Label>
                    <Form.Control 
                        required
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formSignUpPassword" className="mb-3 mx-5">
                    <Form.Label className="font-75">Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formSignUpPassword" className="mb-3 mx-5">
                    <Form.Label className="font-75">Confirm password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" className="mt-4">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;