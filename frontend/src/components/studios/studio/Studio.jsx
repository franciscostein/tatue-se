import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import profileAvatar from './user_w.png';

const Studio = () => {
    return (
        <Form>
            <Row className="mt-5">
                <Col xs={12} md={8}>
                    <h1 style={{ textAlign: 'left' }}>Studio</h1>
                </Col>
                <Col xs={6} md={4} className="d-flex justify-content-end">
                    <Button variant="secondary" style={{ borderRadius: '15px' }} className="m-2">
                        Cancel
                    </Button>
                    <Button variant="success" style={{ borderRadius: '15px' }} className="m-2">
                        Save
                    </Button>
                </Col>
            </Row>
            <hr />
            <Image src={profileAvatar} roundedCircle style={{ height: '80px' }} className="my-3" />
            <Row>
                <Col>
                    <Form.Group controlId="formStudioName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formStudioEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@email.com" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Form.Group controlId="formStudioWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" placeholder="example.com" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formStudioPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" placeholder="Phone number" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Form.Group controlId="formStudioFacebook">
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control type="text" placeholder="Facebook" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formStudioInstagram">
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control type="tel" placeholder="Instagram" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Form.Group controlId="formStudioLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Where it is?" />
                </Form.Group>
            </Row>
            <Row className="mt-2">
                <Form.Group controlId="formStudioAbout">
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>

            <h3 className="d-flex justify-content-start mt-5">Opening hours</h3>
            <hr />
            <Row>
                <Col className="d-flex justify-content-start">Monday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-start">Tuesday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-start">Wednesday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-start">Thursday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-start">Friday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-start">Saturday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-start">Sunday</Col>
                <Col xs lg="2" className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </Col>
                <Col md="auto" className="d-flex justify-content-end">Closed</Col>
            </Row>
            <hr className="mt-5"/>
            <p style={{ textAlign: 'left' }}>Delete account</p>
            <p style={{ textAlign: 'left', fontSize: '15px' }}>
                Deleting your Tattoodo account will permanently remove your profile, 
                along with all data you have produced while on Tattoodo, 
                including permanent removal of photos, comments, saved boards, workplace history, 
                and subscription and billing info, booking history, your account information and settings.
            </p>
            <Button variant="danger" style={{ borderRadius: '15px', marginBottom: '50px' }} className="d-flex justify-content-start my-4">
                Delete my account
            </Button>
        </Form>
    );
}

export default Studio;