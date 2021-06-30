import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    return (
        <Form className="px-5">
            <Form.Group controlId="formSignUpEmail" className="mb-3 px-5">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="formSignUpPassword" className="mb-4 px-5">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
                Submit
            </Button>
        </Form>
    );
}

export default SignUp;