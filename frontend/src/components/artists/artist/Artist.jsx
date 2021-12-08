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
import { FaInstagram, FaGlobe } from 'react-icons/fa';

const Artist = ({ artist: { profile }, fetchArtistProfile }) => {
    const { id } = useParams();
    const [artist, setArtist] = useState({
        fullName: '',
        biography: '',
        profilePicture: '',
        tattooStyles: [],
        workplaces: [],
        instagram: '',
        website: '',
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
                website: profile.social.website,
                hourRate: profile.pricing.hourRate,
                minRate: profile.pricing.minRate,
                currency: profile.pricing.currency,
                portfolio: profile.portfolio
            });
        }
    }, [fetchArtistProfile, id, profile]);

    return (
        <div id="main" className="d-flex align-items-start m-5">
            <Col id="sidebar" className="p-2 mx-4" sm={2}>
                <div className="d-flex align-items-center mb-1">
                    <Image src={artist.profilePicture ?? avatar} className="artist-avatar" roundedCircle />
                    <Col>
                        <Row className="font-60">{artist.fullName}</Row>
                    </Col>
                </div>
                <div className="dashed-top-border">
                    <h5 className="d-flex pt-2">Bio</h5>
                    <p className="font-50">{artist.biography}</p>
                </div>
                {
                    artist.instagram && (
                        <div className="d-flex justify-content-between p-2 solid-bottom-border">
                            <span className="font-65">{artist.instagram}</span>
                            <span className="d-flex">
                                <FaInstagram />
                            </span>
                        </div>
                    )
                }
                {
                    artist.website && (
                        <div className="d-flex justify-content-between p-2 solid-bottom-border">
                            <span className="font-65">{artist.website}</span>
                            <span className="d-flex">
                                <FaGlobe />
                            </span>
                        </div>
                    )
                }
                <div className="solid-bottom-border">
                    <h5 className="pt-3 pb-2">Worplaces</h5>
                    <div className="d-flex mb-1">
                        {
                            artist.workplaces.map(workplace => (
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
                    artist.tattooStyles && (
                        <div className="d-flex flex-wrap py-1">
                            {
                                artist.tattooStyles.map(tattooStyle => <span className="tattoo-style-badge mx-1">{tattooStyle.name}</span>)
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
                            <span className="font-50">{profile.hourRate} {profile.currency}</span>
                        </Row>
                    </div>
                    <div className="price-display py-1 mx-2 mb-3">
                        <Row>
                            <span className="secondary-color font-50">Min. rate:</span>
                        </Row>
                        <Row>
                            <span className="font-50">{profile.minRate} {profile.currency}</span>
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
                        artist.portfolio && artist.portfolio.map(photo => <Image src={photo.publicId} className="m-3 tattoo-img" />)
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