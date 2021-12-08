import './Artist.css';

import { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchArtistProfile } from '../../../actions/artist';

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import avatar from '../../../assets/user_w.png';
import { FaInstagram, FaFacebook, FaGlobe, FaPhone, FaRegEnvelope } from 'react-icons/fa';

const Artist = ({ artist: { profile }, fetchArtistProfile }) => {
    const { id } = useParams();
    const [artist, setArtist] = useState({
        fullName: '',
        biography: '',
        profilePicture: '',
        tattooStyles: [],
        workplaces: [],
        instagram: '',
        facebook: '',
        website: '',
        phone: '',
        email: '',
        hourRate: '',
        minRate: '',
        currency: '',
        portfolio: []
    });

    useEffect(() => {
        if (id && !profile) {
            fetchArtistProfile(id);
        }
        if (profile) {
            setArtist({
                fullName: profile.fullName,
                biography: profile.biography,
                profilePicture: profile.profilePicture.publicId,
                tattooStyles: profile.tattooStyles,
                workplaces: profile.workplaces,
                instagram: profile.social.instagram,
                facebook: profile.social.facebook,
                website: profile.social.website,
                phone: profile.social.phone,
                email: profile.social.email,
                hourRate: profile.pricing.hourRate,
                minRate: profile.pricing.minRate,
                currency: profile.pricing.currency,
                portfolio: profile.portfolio
            });
        }
    }, [fetchArtistProfile, id, profile]);

    const { fullName, biography, profilePicture, tattooStyles, workplaces, instagram, facebook, website, phone, email, hourRate, minRate, currency, portfolio } = artist;

    return (
        <div id="main" className="d-flex align-items-start m-5">
            <Col id="sidebar" className="p-2 me-3" >
                <div className="d-flex align-items-center mb-1">
                    <Image src={profilePicture ?? avatar} className="artist-avatar" roundedCircle />
                    <Row className="font-60">{fullName}</Row>
                </div>
                <div className="dashed-top-border">
                    <h5 className="d-flex pt-2">Bio</h5>
                    <p className="font-50">{biography}</p>
                </div>
                {
                    (!instagram && !facebook && !website && !phone && !email) && (
                        <hr />
                    )
                }
                {
                    instagram && (
                        <div className="p-2 solid-bottom-border">
                            <a href={instagram} className="d-flex justify-content-between align-items-center font-55">
                                <span className="pe-1">Instagram</span> <FaInstagram size={20} />
                            </a>
                        </div>
                    )
                }
                {
                    facebook && (
                        <div className="p-2 solid-bottom-border">
                            <a href={facebook} className="d-flex justify-content-between align-items-center font-55">
                                <span className="pe-1">Facebook</span> <FaFacebook size={20} />
                            </a>
                        </div>
                    )
                }
                {
                    website && (
                        <div className="p-2 solid-bottom-border">
                            <a href={website} className="d-flex justify-content-between align-items-center font-55">
                                <span className="pe-1">Website</span> <FaGlobe size={20} />
                            </a>
                        </div>
                    )
                }
                {
                    phone && (
                        <div className="d-flex justify-content-between align-items-center p-2 solid-bottom-border font-55">
                            <span className="pe-1">{phone}</span> <FaPhone size={20} />
                        </div>
                    )
                }
                {
                    email && (
                        <div className="d-flex justify-content-between align-items-center p-2 solid-bottom-border font-55">
                            <span className="pe-1">{email}</span> <FaRegEnvelope size={20} />
                        </div>
                    )
                }
                <div className="solid-bottom-border">
                    <h5 className="pt-3 pb-2">Worplaces</h5>
                    <div className="d-flex mb-1">
                        {
                            workplaces.map(workplace => (
                                <div>
                                    <Image src={workplace.logo.publicId ?? avatar} className="studio-avatar" roundedCircle />
                                    <Col>
                                        <Row className="font-60">{workplace.name}</Row>
                                        <Row className="font-45">{workplace.location.city}</Row>
                                    </Col>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <h5 className="d-flex pt-3">Styles</h5>
                {
                    tattooStyles && (
                        <div className="d-flex flex-wrap py-1">
                            {
                                tattooStyles.map(tattooStyle => <span className="tattoo-style-badge mx-1">{tattooStyle.name}</span>)
                            }
                        </div>
                    )
                }
                <h5 className="d-flex pt-3">Pricing</h5>
                <div className="d-flex">
                    <div className="price-display py-1 mx-2 mb-3">
                        <Row>
                            <span className="secondary-color font-50">Hour rate:</span>
                        </Row>
                        <Row>
                            <span className="font-50">{`${hourRate} ${currency}`}</span>
                        </Row>
                    </div>
                    <div className="price-display py-1 mx-2 mb-3">
                        <Row>
                            <span className="secondary-color font-50">Min. rate:</span>
                        </Row>
                        <Row>
                            <span className="font-50">{`${minRate} ${currency}`}</span>
                        </Row>
                    </div>
                </div>
            </Col>
            <Col id="content" className="mx-4" sm={9}>
                <Row className="solid-bottom-border-secondary">
                    <h4 className="d-flex mt-2 fonte-300">Tattoos</h4>
                </Row>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        portfolio && portfolio.map(photo => <Image src={photo.publicId} className="m-3 tattoo-img" />)
                    }
                </div>
            </Col>
        </div>
    );
}

Artist.propTypes = {
    artist: PropTypes.object.isRequired,
    fetchArtistProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    artist: state.artist
});

export default connect(mapStateToProps, { fetchArtistProfile })(withRouter(Artist));