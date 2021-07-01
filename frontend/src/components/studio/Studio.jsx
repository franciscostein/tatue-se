import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import profileAvatar from './user_w.png';

const Studio = () => {
    return (
        <Form>
            <Row>
                <Col xs={12} md={8}>
                    <h1 style={{ textAlign: 'left' }}>Artist</h1>
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
            <Image src={profileAvatar} roundedCircle style={{ height: '80px' }} />
        </Form>
    );
}

export default Studio;