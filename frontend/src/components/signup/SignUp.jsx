import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { saveUser } from '../../actions/user';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaExclamationTriangle } from 'react-icons/fa';

const SignUp = ({ history, saveUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordConfirmationInvalid, setIsPasswordConfirmationInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = event => {
        if (!validate()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        saveUser({
            email: email,
            password: password
        }, history);
    }

    const validate = () => {
        if (password !== passwordConfirmation) {
            setIsPasswordInvalid(true);
            setIsPasswordConfirmationInvalid(true);
            setErrorMessage(`Passwords don't match.`);
            return false;
        }
        return true;
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>SignUp</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                {
                    errorMessage &&
                    (
                        <Alert variant="danger" className="mb-4 mx-3">
                            <FaExclamationTriangle className="me-3" />
                            <span className="font-80">{errorMessage}</span>
                        </Alert>
                    )
                }
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
                        minLength={7}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={isPasswordInvalid}
                    />
                </Form.Group>
                <Form.Group controlId="formSignUpPassword" className="mb-3 mx-5">
                    <Form.Label className="font-75">Confirm password</Form.Label>
                    <Form.Control 
                        required
                        minLength={7}
                        type="password"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        isInvalid={isPasswordConfirmationInvalid}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" className="mt-4">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

SignUp.propTypes = {
    saveUser: PropTypes.func.isRequired,
    // user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { saveUser })(withRouter(SignUp));