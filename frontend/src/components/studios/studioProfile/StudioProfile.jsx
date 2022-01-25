import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PlacesAutoComplete from 'react-google-autocomplete';

import { fetchStudio, saveStudio } from '../../../actions/studio';
import ImageUploader from '../../fragments/ImageUploader';
import Alert from '../../fragments/Alert';
import BusinessHour from '../fragments/BusinessHour';

// import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from 'react-icons/fa';

const StudioProfile = ({ studio: { studio }, user: { user: { userId }}, fetchStudio, saveStudio }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        phone: '',
        facebook: '',
        instagram: '',
        location: {
            address: '',
            latitude: '0',
            longitude: '0'
        },
        about: '',
        businessHours: {
            monday: { opens: '', closes: '', isOpen: false }, 
            tuesday: { opens: '', closes: '', isOpen: false }, 
            wednesday: { opens: '', closes: '', isOpen: false }, 
            thursday: { opens: '', closes: '', isOpen: false }, 
            friday: { opens: '', closes: '', isOpen: false }, 
            saturday: { opens: '', closes: '', isOpen: false }, 
            sunday: { opens: '', closes: '', isOpen: false }
        }
    });
    const [logo, setLogo] = useState('');

    useEffect(() => {
        if (studio && studio.owner === userId) {
            setFormData({
                name: studio.name,
                email: studio.social.email,
                website: studio.social.website,
                phone: studio.social.phone,
                facebook: studio.social.facebook,
                instagram: studio.social.instagram,
                location: studio.location,
                about: studio.about,
                businessHours: studio.businessHours
            });
            setLogo(studio.logo.publicId);
        } else {
            fetchStudio();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studio]);

    const { name, email, website, phone, facebook, instagram, location, about, businessHours } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSaveClick = () => {
        console.log(formData);
        // saveStudio(formData);
    }

    const handlePlaceSelect = place => {
        const { formatted_address, geometry: { location: { lat, lng }}} = place;
        console.log(place);
        setFormData({ 
            ...formData, 
            location: { 
                address: formatted_address,
                latitude: lat(),
                longitude: lng()
            }
        });
    }

    return (
        <Container>
            <Form>
                <div className="d-flex justify-content-between solid-bottom-border-secondary mt-5">
                    <div>
                        <h1>Studio</h1>
                    </div>
                    <div>
                        <Button variant="secondary" className="px-3 mx-2">
                            Cancel
                        </Button>
                        <Button variant="dark" className="px-3 mx-2" onClick={handleSaveClick}>
                            Save
                        </Button>
                    </div>
                </div>
                <Alert />
                <ImageUploader
                    image={logo}
                    setImageBase64={img => setLogo(img)}
                />
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formStudioName">
                            <Form.Label className="font-75">Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStudioEmail">
                            <Form.Label className="font-75">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="example@email.com"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formStudioWebsite">
                            <Form.Label className="font-75">Website</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="example.com" 
                                name="website"
                                value={website}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStudioPhone">
                            <Form.Label className="font-75">Phone</Form.Label>
                            <Form.Control 
                                type="tel" 
                                placeholder="Phone number"
                                name="phone"
                                value={phone}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formStudioFacebook">
                            <Form.Label className="font-75">Facebook</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Facebook"
                                name="facebook"
                                value={facebook}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStudioInstagram">
                            <Form.Label className="font-75">Instagram</Form.Label>
                            <Form.Control 
                                type="tel" 
                                placeholder="Instagram"
                                name="instagram"
                                value={instagram}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formStudioLocation">
                        <Form.Label className="font-75">Address</Form.Label>
                        <PlacesAutoComplete
                            className="places-autocomplete"
                            placeholder="Where it is?"
                            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                            options={{ types: [ 'address' ] }}
                            value={location.address}
                            onChange={e => setFormData({ ...formData, location: { ...location, address: e.target.value }})}
                            onPlaceSelected={handlePlaceSelect}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formStudioAbout">
                        <Form.Label className="font-75">About</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            name="about"
                            value={about}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                </Row>
                <div className="d-flex solid-bottom-border-secondary mt-5 mb-3">
                    <h3>Business hours</h3>
                </div>
                <BusinessHour
                    weekday="Monday"
                    day={businessHours.monday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, monday: { ...businessHours.monday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, monday: { ...businessHours.monday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, monday: { ...businessHours.monday, closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Tuesday"
                    day={businessHours.tuesday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, tuesday: { ...businessHours.tuesday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, tuesday: { ...businessHours.tuesday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, tuesday: { ...businessHours.tuesday, closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Wednesday"
                    day={businessHours.wednesday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, wednesday: { ...businessHours.wednesday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, wednesday: { ...businessHours.wednesday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, wednesday: { ...businessHours.wednesday, closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Thursday"
                    day={businessHours.thursday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, thursday: { ...businessHours.thursday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, thursday: { ...businessHours.thursday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, thursday: { ...businessHours.thursday, closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Friday"
                    day={businessHours.friday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, friday: { ...businessHours.friday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, friday: { ...businessHours.friday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, friday: { ...businessHours.friday, closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Saturday"
                    day={businessHours.saturday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, saturday: { ...businessHours.saturday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, saturday: { ...businessHours.saturday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, saturday: { ...businessHours.saturday, closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Sunday"
                    day={businessHours.sunday}
                    setChecked={value => setFormData({ ...formData, businessHours: { ...businessHours, sunday: { ...businessHours.sunday, isOpen: value }}})}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, sunday: { ...businessHours.sunday, opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, sunday: { ...businessHours.sunday, closes: e.target.value }}})}
                />
                <hr className="mt-3"/>

                <h3 className="d-flex">Delete account</h3>
                <p className="font-55">
                    Deleting your tatue-se account will permanently remove your profile, 
                    along with all data you have produced while on tatue-se, 
                    including permanent removal of photos, comments, saved boards, workplace history, 
                    and subscription and billing info, booking history, your account information and settings.
                </p>
                <Button variant="danger" className="d-flex mt-3 mb-5">
                    <FaTrashAlt size={19} />
                    <span className="ps-2">Delete my account</span>
                </Button>
            </Form>
        </Container>
    );
}

const mapStateToProps = state => ({
    studio: state.studio,
    user: state.user
});

export default connect(mapStateToProps, { fetchStudio, saveStudio })(StudioProfile);