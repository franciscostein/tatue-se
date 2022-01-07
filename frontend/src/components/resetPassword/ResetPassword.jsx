import { useState, useEffect, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetPassword, resetAuthState } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Alert from '../fragments/Alert';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const ResetPassword = ({ auth: { passwordChanged, error }, resetPassword, resetAuthState, history }) => {
    const { id, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    useEffect(() => {
    }, [passwordChanged]);

    const handleSubmit = event => {
        event.preventDefault();

        if (!validate()) {
            event.stopPropagation();
            return;
        }
        resetPassword(id, token, password);
    }

    const validate = () => {
        if (password !== confirmPassword) {
            setIsPasswordInvalid(true);
            setAlert(`Passwords don't match.`, 'danger');
            return false;
        }
        setIsPasswordInvalid(false);
        return true;
    }

    const resetStateAndGoTo = route => {
        resetAuthState();
        history.push(route);
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>Reset password</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Alert />
                {
                    !passwordChanged ? (
                        <Fragment>
                            <Form.Group controlId="password" className="m-3">
                                <Form.Label className="font-75">New password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    minLength={7}
                                    className="text-center"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    isInvalid={isPasswordInvalid}
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmpassword" className="m-3">
                                <Form.Label className="font-75">Confirm password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    minLength={7}
                                    className="text-center"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    isInvalid={isPasswordInvalid}
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" size="lg" className="mt-4">
                                Reset password
                            </Button>
                        </Fragment>
                    ) : (
                        <Row>
                            <span className="font-65 text-secondary clickable mt-4" onClick={() => resetStateAndGoTo('/signin')}>
                                Sign in here
                            </span>
                        </Row>
                    )
                }
                {
                    error && (
                        <Row>
                            <span className="font-65 text-secondary clickable mt-4" onClick={() => resetStateAndGoTo('/forgot-password')}>
                                Request a new link here
                            </span>
                        </Row>
                    )
                }
            </Form>
        </Container>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { resetPassword, resetAuthState })(withRouter(ResetPassword));