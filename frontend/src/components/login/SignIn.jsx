import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { authenticate } from '../../actions/user';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FaExclamationTriangle } from 'react-icons/fa';

const SignIn = ({ auth: { isAuthenticated, error }, authenticate, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        } else if (error) {
            setErrorMessage(error.msg);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, error]);

    const handleSubmit = event => {
        event.preventDefault();
        authenticate({ email, password });
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>Sign in</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                {
                    errorMessage &&
                    (
                        <Alert variant="danger" className="mx-3">
                            <FaExclamationTriangle className="me-3" />
                            <span className="font-80">{errorMessage}</span>
                        </Alert>
                    )
                }
                <Form.Group controlId="formSignInEmail" className="m-3 mx-xl-5 mx-lg-4">
                    <Form.Label className="font-75">E-mail</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        className="text-center"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formSignInPassword" className="mb-3 mx-3 mx-xl-5 mx-lg-4">
                    <Form.Label className="font-75">Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        className="text-center"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" size="lg" className="mt-4">
                    Sign in
                </Button>
                <Row>
                    <span className="font-65 text-secondary clickable mt-5" onClick={() => history.push('/signup')}>
                        Don't have an account yet? Click here
                    </span>
                    <span className="font-65 text-secondary clickable mt-3" onClick={() => history.push('/forgot-password')}>
                        Forgot your password? Reset it here
                    </span>
                </Row>
            </Form>
        </Container>
    );
}

SignIn.propTypes = {
    authenticate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { authenticate })(withRouter(SignIn));