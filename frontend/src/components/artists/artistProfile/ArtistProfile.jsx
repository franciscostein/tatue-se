import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaPlus } from 'react-icons/fa';
import profileAvatar from '../../../assets/user_w.png';

const Artist = () => {
    return (
        <Container>
            <Form>
                <div className="d-flex justify-content-between solid-bottom-border-secondary mt-5">
                    <div>
                        <h1>Artist</h1>
                    </div>
                    <div>
                        <Button variant="secondary" className="px-3 mx-2">
                            Cancel
                        </Button>
                        <Button variant="primary" className="px-3 mx-2">
                            Save
                        </Button>
                    </div>
                </div>
                <Image src={profileAvatar} className="profile-picture my-4" roundedCircle />
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formArtistName">
                            <Form.Label className="font-75">Name</Form.Label>
                            <Form.Control type="text" placeholder="Full name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArtistEmail">
                            <Form.Label className="font-75">Email</Form.Label>
                            <Form.Control type="email" placeholder="example@email.com" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formArtistWebsite">
                            <Form.Label className="font-75">Website</Form.Label>
                            <Form.Control type="text" placeholder="example.com" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArtistPhone">
                            <Form.Label className="font-75">Phone</Form.Label>
                            <Form.Control type="tel" placeholder="Phone number" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formArtistFacebook">
                            <Form.Label className="font-75">Facebook</Form.Label>
                            <Form.Control type="text" placeholder="Facebook" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArtistInstagram">
                            <Form.Label className="font-75">Instagram</Form.Label>
                            <Form.Control type="tel" placeholder="Instagram" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formArtistLocation">
                        <Form.Label className="font-75">City</Form.Label>
                        <Form.Control type="text" placeholder="Where do you live?" />
                    </Form.Group>
                </Row>
                <Row className="pb-3">
                    <Form.Group controlId="formArtistBiography">
                        <Form.Label className="font-75">Biography</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Row>

                <div className="d-flex justify-content-between mt-5 pb-5">
                    <div>
                        <h3>Workplaces</h3>
                    </div>
                    <div>
                        <Button>
                            <FaPlus />
                            <span className="px-2">Add workplace</span>
                        </Button>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="d-flex">Styles</h3>
                    <div className="d-flex flex-wrap py-1">
                        <span className="tattoo-style-badge font-50 mx-1">{`Black & Gray`}</span>
                        <span className="tattoo-style-badge-selected font-50 mx-1">Blackwork</span>
                        <span className="tattoo-style-badge font-50 mx-1">Chicano</span>
                        <span className="tattoo-style-badge font-50 mx-1">Cosmetic</span>
                        <span className="tattoo-style-badge-selected font-50 mx-1">Dark Art</span>
                        <span className="tattoo-style-badge font-50 mx-1">Dotwork</span>
                        <span className="tattoo-style-badge font-50 mx-1">Fineline</span>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="mb-3">Pricing</h3>
                    <Row>
                        <Col md={{ span: 10 }}>
                            <Form.Group controlId="formArtistPriceHour">
                                <Form.Label className="d-flex font-75">Price per hour</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <span className="font-75">Currency</span>
                            <DropdownButton id="dropdownPriceHour" title="BRL">
                                <DropdownButton.Item>USD</DropdownButton.Item>
                                <DropdownButton.Item>EUR</DropdownButton.Item>
                                <DropdownButton.Item>BRL</DropdownButton.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={{ span: 10 }}>
                            <Form.Group controlId="formArtistPriceMin">
                                <Form.Label className="d-flex font-75">Min rate</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <span className="font-75">Currency</span>
                            <DropdownButton id="dropdownPriceMin" title="BRL">
                                <DropdownButton.Item>USD</DropdownButton.Item>
                                <DropdownButton.Item>EUR</DropdownButton.Item>
                                <DropdownButton.Item>BRL</DropdownButton.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <h3 className="d-flex">Delete account</h3>
                <p className="font-55">
                    Deleting your tatue-se account will permanently remove your profile, 
                    along with all data you have produced while on tatue-se, 
                    including permanent removal of photos, comments, saved boards, workplace history, 
                    and subscription and billing info, booking history, your account information and settings.
                </p>
                <Button variant="danger" className="d-flex mt-3 mb-5">
                    Delete my account
                </Button>
            </Form>
        </Container>
    );
}

export default Artist;