import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { sendForgotPasswordEmail } from '../../actions/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const ForgotPassword = ({ auth: { emailSent = false, message = '' }, sendForgotPasswordEmail }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
    }, [emailSent, message]);

    const handleSubmit = event => {
        event.preventDefault();
        sendForgotPasswordEmail(email);
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>Forgot password</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                {
                    message ? (
                        <Alert variant={ emailSent ? 'success' : 'danger' }>
                            <span className="font-80">{message}</span>
                        </Alert>
                    ) : (
                        <Fragment>
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
                        </Fragment>
                    )
                }
            </Form>
        </Container>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { sendForgotPasswordEmail })(ForgotPassword);