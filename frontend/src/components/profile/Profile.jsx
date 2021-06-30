import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import userAvatar from './user_w.png';

const Profile = () => {
    return (
        <Form>
            <Row>
                <Col xs={12} md={8}>
                    <h1 style={{ textAlign: 'left' }}>Profile</h1>
                </Col>
                <Col xs={6} md={4}>
                    <Button variant="secondary" style={{ borderRadius: '15px' }} className="px-3">
                        Cancel
                    </Button>
                    <Button variant="success" style={{ borderRadius: '15px' }} className="px-3">
                        Save
                    </Button>
                </Col>
            </Row>
            <hr />
            <Image src={userAvatar} roundedCircle style={{ height: '80px' }} />
            <Form.Group controlId="formProfileName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Full name" />
            </Form.Group>
            <Form.Group controlId="formProfileLocation">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Where do you live?" />
            </Form.Group>
            <hr/>
            <Row>
                <Col>
                    <p>Change password</p>
                </Col>
                <Col>
                    <Button style={{ borderRadius: '15px' }}>
                        <span className="px-3">Change</span>
                    </Button>
                </Col>
            </Row>
            <hr/>
            <p style={{ textAlign: 'left' }}>Delete account</p>
            <p style={{ textAlign: 'left', fontSize: '15px' }}>
                Deleting your Tattoodo account will permanently remove your profile, 
                along with all data you have produced while on Tattoodo, 
                including permanent removal of photos, comments, saved boards, workplace history, 
                and subscription and billing info, booking history, your account information and settings.
            </p>
            <Button variant="danger" style={{ borderRadius: '15px' }} className="pull-left">
                Delete my account
            </Button>
        </Form>
    );
}

export default Profile;