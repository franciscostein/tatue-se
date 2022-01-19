import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchStudio } from '../../../actions/studio';
import ImageUploader from '../../fragments/ImageUploader';
import Alert from '../../fragments/Alert';
import BusinessHour from '../fragments/BusinessHour';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from 'react-icons/fa';

const StudioProfile = ({ studio: { studio }, fetchStudio }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        phone: '',
        facebook: '',
        instagram: '',
        location: {},
        about: '',
        businessHours: {
            monday: { opens: '', closes: '' }, 
            tuesday: { opens: '', closes: '' }, 
            wednesday: { opens: '', closes: '' }, 
            thursday: { opens: '', closes: '' }, 
            friday: { opens: '', closes: '' }, 
            saturday: { opens: '', closes: '' }, 
            sunday: { opens: '', closes: '' }
        }
    });
    const [logo, setLogo] = useState('');
    const [mondayChecked, setMondayChecked] = useState(false);
    const [tuesdayChecked, setTuesdayChecked] = useState(false);
    const [wednesdayChecked, setWednesdayChecked] = useState(false);
    const [thursdayChecked, setThursdayChecked] = useState(false);
    const [fridayChecked, setFridayChecked] = useState(false);
    const [saturdayChecked, setSaturdayChecked] = useState(false);
    const [sundayChecked, setSundayChecked] = useState(false);

    useEffect(() => {
        if (!studio) {
            fetchStudio();
        } else {
            setFormData({
                name: studio.name,
                email: studio.social.email,
                website: studio.social.website,
                phone: studio.social.phone,
                facebook: studio.social.facebook,
                instagram: studio.social.instagram,
                location: studio.location.address,
                about: studio.about,
                businessHours: studio.businessHours
            });
            setLogo(studio.logo.publicId);
            setMondayChecked(studio.businessHours.monday.isOpen);
            setTuesdayChecked(studio.businessHours.tuesday.isOpen);
            setWednesdayChecked(studio.businessHours.wednesday.isOpen);
            setThursdayChecked(studio.businessHours.thursday.isOpen);
            setFridayChecked(studio.businessHours.friday.isOpen);
            setSaturdayChecked(studio.businessHours.saturday.isOpen);
            setSundayChecked(studio.businessHours.sunday.isOpen);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studio]);

    const { name, email, website, phone, facebook, instagram, location, about, businessHours } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
                        <Button variant="dark" className="px-3 mx-2">
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
                        <Form.Label className="font-75">Location</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Where it is?"
                            name="location"
                            value={location}
                            onChange={e => onChange(e)}
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
                    checked={mondayChecked}
                    setChecked={setMondayChecked}
                    day={businessHours.monday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, monday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, monday: { closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Tuesday"
                    checked={tuesdayChecked}
                    setChecked={setTuesdayChecked}
                    day={businessHours.tuesday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, tuesday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, tuesday: { closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Wednesday"
                    checked={wednesdayChecked}
                    setChecked={setWednesdayChecked}
                    day={businessHours.wednesday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, wednesday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: {  ...businessHours, wednesday: { closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Thursday"
                    checked={thursdayChecked}
                    setChecked={setThursdayChecked}
                    day={businessHours.thursday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, thursday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, thursday: { closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Friday"
                    checked={fridayChecked}
                    setChecked={setFridayChecked}
                    day={businessHours.friday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, friday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, friday: { closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Saturday"
                    checked={saturdayChecked}
                    setChecked={setSaturdayChecked}
                    day={businessHours.saturday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, saturday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, saturday: { closes: e.target.value }}})}
                />
                <BusinessHour
                    weekday="Sunday"
                    checked={sundayChecked}
                    setChecked={setSundayChecked}
                    day={businessHours.sunday}
                    onChangeOpen={e => setFormData({ ...formData, businessHours: { ...businessHours, sunday: { opens: e.target.value }}})}
                    onChangeClose={e => setFormData({ ...formData, businessHours: { ...businessHours, sunday: { closes: e.target.value }}})}
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
    studio: state.studio
});

export default connect(mapStateToProps, { fetchStudio })(StudioProfile);