import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h2>SignUp</h2>
            </div>
            <Form>
                <Form.Group controlId="formSignUpEmail" className="mb-3 px-5 mx-5">
                    <Form.Label className="font-75">Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formSignUpPassword" className="mb-3 px-5 mx-5">
                    <Form.Label className="font-75">Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group controlId="formSignUpPassword" className="mb-3 px-5 mx-5">
                    <Form.Label className="font-75">Confirm password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" className="mt-4">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;