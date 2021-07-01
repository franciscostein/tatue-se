import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaPlus } from 'react-icons/fa';
import profileAvatar from './user_w.png';

const Artist = () => {
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
            <Row>
                <Col>
                    <Form.Group controlId="formArtistName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Full name" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formArtistEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@email.com" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formArtistWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" placeholder="example.com" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formArtistPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" placeholder="Phone number" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formArtistFacebook">
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control type="text" placeholder="Facebook" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formArtistInstagram">
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control type="tel" placeholder="Instagram" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group controlId="formArtistLocation">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Where do you live?" />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="formArtistBiography">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>

            <Row>
                <Col>
                    <h3 style={{ textAlign: 'left' }}>Workplaces</h3>
                </Col>
                <Col>
                    <Button style={{ borderRadius: '15px' }}>
                        <FaPlus />
                        <span style={{ paddingLeft: '7px' }}>Add workplace</span>
                    </Button>
                </Col>
            </Row>

            <h3 style={{ textAlign: 'left' }}>Styles</h3>
            <Button style={{ borderRadius: '15px' }}>
                <span>{`Black & Gray`}</span>
            </Button>
            <Button style={{ borderRadius: '15px' }}>
                <span>Blackwork</span>
            </Button>
            <Button style={{ borderRadius: '15px' }}>
                <span>Chicano</span>
            </Button>
            <Button style={{ borderRadius: '15px' }}>
                <span>Cosmetic</span>
            </Button>
            <Button style={{ borderRadius: '15px' }}>
                <span>Dark Art</span>
            </Button>
            <Button style={{ borderRadius: '15px' }}>
                <span>Dotwork</span>
            </Button>
            <Button style={{ borderRadius: '15px' }}>
                <span>Fineline</span>
            </Button>

            <h3 style={{ textAlign: 'left' }}>Pricing</h3>
            <Row>
                <Col xs={12} md={8}>
                    <Form.Group controlId="formArtistPriceHour">
                        <Form.Label>Price per hour</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                    Currency
                    <DropdownButton id="dropdownPriceHour" title="Currency">
                        <DropdownButton.Item>USD</DropdownButton.Item>
                        <DropdownButton.Item>EUR</DropdownButton.Item>
                        <DropdownButton.Item>BRL</DropdownButton.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row style={{ marginBottom: '50px' }}>
                <Col xs={12} md={8}>
                    <Form.Group controlId="formArtistPriceMin">
                        <Form.Label>Min rate</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                    Currency
                    <DropdownButton id="dropdownPriceMin" title="Currency">
                        <DropdownButton.Item>USD</DropdownButton.Item>
                        <DropdownButton.Item>EUR</DropdownButton.Item>
                        <DropdownButton.Item>BRL</DropdownButton.Item>
                    </DropdownButton>
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
            <Button variant="danger" style={{ borderRadius: '15px', marginBottom: '50px' }} className="pull-left">
                Delete my account
            </Button>
        </Form>
    );
}

export default Artist;