import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchArtistProfile, saveProfile } from '../../../actions/artist';

import StudioMiniCard from '../../studios/fragments/StudioMiniCard';
import ConfirmationModal from '../../modals/ConfirmationModal';
import AddWorkplaceModal from './AddWorkplaceModal';
import TattooStyles from '../../tattooStyles/TattooStyles';
import ImageUploader from '../../fragments/ImageUploader';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const ArtistProfile = ({ 
    artist: { 
        profile, 
        loading 
    },
    history, 
    location, 
    fetchArtistProfile,
    saveProfile 
}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        profilePicture: null,
        biography: '',
        workplaces: [],
        selectedTattooStyles: [],
        portfolio: [],
        facebook: '',
        instagram: '',
        website: '',
        phone: '',
        email: '',
        hourRate: '',
        minRate: '',
        currency: ''
    });
    const [profilePictureBase64, setProfilePictureBase64] = useState(null);
    const [showAddWorkplaceModal, setShowAddWorkplaceModal] = useState(false);
    const [showRemoveWorkplaceModal, setShowRemoveWorkplaceModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [idToRemove, setIdToRemove] = useState('');

    useEffect(() => {
        fetchArtistProfile();

        if (profile) {
            setFormData({
                fullName: loading || !profile.fullName ? '' : profile.fullName,
                profilePicture: loading || !profile.profilePicture ? '' : profile.profilePicture.publicId,
                biography: loading || !profile.biography ? '' : profile.biography,
                workplaces: loading || !profile.workplaces ? [] : profile.workplaces,
                selectedTattooStyles: loading || !profile.tattooStyles ? [] : profile.tattooStyles,
                facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
                instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
                website: loading || !profile.social.website ? '' : profile.social.website,
                phone: loading || !profile.social.phone ? '' : profile.social.phone,
                email: loading || !profile.social.email ? '' : profile.social.email,
                hourRate: loading || !profile.hourRate ? '' : profile.hourRate,
                minRate: loading || !profile.minRate ? '' : profile.minRate
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchArtistProfile, loading]);

    const { fullName, profilePicture, biography, workplaces, selectedTattooStyles, facebook, instagram, website, phone, email, hourRate, minRate } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // console.log(formData);
        saveProfile(formData, profilePictureBase64, history);
    }

    const handleAddWorkplace = workplace => {
        setShowAddWorkplaceModal(false);

        if (!workplaces.some(item => item._id === workplace._id)) {
            workplaces.push(workplace);

            setFormData({
                ...formData,
                workplaces
            });
        }
    }

    const handleRemoveWorkplace = workplaceId => {
        setIdToRemove(workplaceId);
        setShowRemoveWorkplaceModal(true);
    }

    const handleRemoveWorkplaceConfirmation = () => {
        setShowRemoveWorkplaceModal(false);

        if (workplaces.some(workplace => workplace._id === idToRemove)) {
            const filteredWorkplaces = workplaces.filter(workplace => workplace._id !== idToRemove);

            setFormData({
                ...formData,
                workplaces: filteredWorkplaces
            });
        }

        setIdToRemove('');
    }

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
                        <Button variant="primary" className="px-3 mx-2" onClick={e => onSubmit(e)}>
                            Save
                        </Button>
                    </div>
                </div>
                <ImageUploader 
                    profilePicture={profilePicture}
                    setImageBase64={img => setProfilePictureBase64(img)}
                />
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formArtistName">
                            <Form.Label className="font-75">Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Full name"
                                name="fullName"
                                value={fullName}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArtistEmail">
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
                        <Form.Group controlId="formArtistWebsite">
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
                        <Form.Group controlId="formArtistPhone">
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
                        <Form.Group controlId="formArtistFacebook">
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
                        <Form.Group controlId="formArtistInstagram">
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
                <Row className="pb-3">
                    <Form.Group controlId="formArtistBiography">
                        <Form.Label className="font-75">Biography</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            name="biography"
                            value={biography}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                </Row>

                <div className="d-flex justify-content-between mt-5">
                    <div>
                        <h3>Workplaces</h3>
                    </div>
                    <div>
                        <Button onClick={() => setShowAddWorkplaceModal(true)}>
                            <FaPlus size={23} />
                            {/* <span className="ps-2">Add workplace</span> */}
                        </Button>
                    </div>
                    <AddWorkplaceModal
                        show={showAddWorkplaceModal}
                        closeFunction={() => setShowAddWorkplaceModal(false)}
                        addWorkplace={handleAddWorkplace}
                        selectedWorplaces={workplaces}
                    />
                </div>
                <div className="d-flex flex-wrap">
                    {
                        workplaces ?
                            workplaces.map(studio => <StudioMiniCard key={studio._id} studio={studio} removeFunction={() => handleRemoveWorkplace(studio._id)} />)
                        : null
                    }
                    <ConfirmationModal
                        show={showRemoveWorkplaceModal}
                        objectId={idToRemove}
                        closeFunction={() => setShowRemoveWorkplaceModal(false)}
                        title="Remove workplace"
                        titleColor="text-danger"
                        bodyText="Are you sure you want to remove it?"
                        acceptVariant="danger"
                        acceptFunction={handleRemoveWorkplaceConfirmation}
                    />
                </div>
                {/* {
                    tattooStyles ? */}
                        <div className="my-5">
                            <h3 className="d-flex">Styles</h3>
                            <div className="d-flex flex-wrap py-1">
                                <TattooStyles selectedTattooStylesIds={selectedTattooStyles} />
                            </div>
                        </div>
                    {/* : null
                } */}
                <div className="mb-5">
                    <h3>Pricing</h3>
                    <Row>
                        <Col md={{ span: 5 }}>
                            <Form.Group controlId="formArtistPriceHour">
                                <Form.Label className="font-75">Per hour</Form.Label>
                                <Form.Control 
                                    type="number"
                                    name="hourRate"
                                    className="text-center"
                                    value={hourRate}
                                    onChange={e => onChange(e)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={{ span: 5 }}>
                            <Form.Group controlId="formArtistPriceMin">
                                <Form.Label className="font-75">Min rate</Form.Label>
                                <Form.Control 
                                    type="number"
                                    name="minRate"
                                    className="text-center"
                                    value={minRate}
                                    onChange={e => onChange(e)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="font-75" for="currency">Currency</Form.Label>
                                <Form.Control as="select" id="currency">
                                    <option className="text-center" value="USD">USD (US$)</option>
                                    <option className="text-center" value="EUR" selected>EUR (€)</option>
                                    <option className="text-center" value="JPY">JPY (¥)</option>
                                    <option className="text-center" value="GBP">GBP (£)</option>
                                    <option className="text-center" value="AUD">AUD (A$)</option>
                                    <option className="text-center" value="CAD">CAD (C$)</option>
                                    <option className="text-center" value="CHF">CHF (CHF)</option>
                                    <option className="text-center" value="CNY">CNY (元 / ¥)</option>
                                    <option className="text-center" value="HKD">HKD (HK$)</option>
                                    <option className="text-center" value="NZD">NZD (NZ$)</option>
                                    <option className="text-center" value="SEK">SEK (kr)</option>
                                    <option className="text-center" value="KRW">KRW (₩)</option>
                                    <option className="text-center" value="SGD">SGD (S$)</option>
                                    <option className="text-center" value="NOK">NOK (kr)</option>
                                    <option className="text-center" value="MXN">MXN ($)</option>
                                    <option className="text-center" value="INR">INR (₹)</option>
                                    <option className="text-center" value="RUB">RUB (₽)</option>
                                    <option className="text-center" value="ZAR">ZAR (R)</option>
                                    <option className="text-center" value="TRY">TRY (₺)</option>
                                    <option className="text-center" value="BRL">BRL (R$)</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
                {
                    profile && (
                        <div>
                            <hr/>
                            <h3 className="d-flex">Delete account</h3>
                            <p className="font-55">
                                Deleting your tatue-se account will permanently remove your profile, 
                                along with all data you have produced while on tatue-se, 
                                including permanent removal of photos, comments, saved boards, workplace history, 
                                and subscription and billing info, booking history, your account information and settings.
                            </p>
                            <Button variant="danger" className="d-flex mt-3 mb-5" onClick={() => setShowDeleteAccountModal(true)}>
                                <FaTrashAlt size={19} />
                                <span className="ps-2">Delete my account</span>
                            </Button>
                            <ConfirmationModal
                                show={showDeleteAccountModal}
                                closeFunction={() => setShowDeleteAccountModal(false)}
                                title="Delete account"
                                titleColor="text-danger"
                                bodyText="Are you sure? It can't be undone!"
                                declineText="Cancel"
                                acceptVariant="danger"
                                acceptFunction={() => alert('Account deleted!')}
                                acceptText="Yes, delete it"
                            />
                        </div>
                    )
                }
            </Form>
        </Container>
    );
}

ArtistProfile.propTypes = {
    fetchArtistProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    artist: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    artist: state.artist
});

export default connect(mapStateToProps, { fetchArtistProfile, saveProfile })(withRouter(ArtistProfile));