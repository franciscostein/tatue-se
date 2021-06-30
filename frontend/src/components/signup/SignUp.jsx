import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    return (
        <Form className="px-5">
            <Form.Group controlId="formSignUpEmail" className="mb-3 px-5">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formSignUpPassword" className="mb-4 px-5">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
                Submit
            </Button>
        </Form>
    );
}

export default SignUp;