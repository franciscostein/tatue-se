import './Studio.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchStudio } from '../../../actions/studio';
import { fetchArtists } from '../../../actions/artist';
import ArtistCard from '../../artists/fragments/ArtistCard';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaMapMarkerAlt, FaCircle } from 'react-icons/fa';

import cover from '../../../assets/studio/cover/1.jpeg';
import profileImg from '../../../assets/user_w.png';
import map from '../../../assets/staticmap.png';

const Studio = ({ studio: { studio }, artist, fetchStudio, fetchArtists, history }) => {
    const { id } = useParams();
    const [studioInfo, setStudioInfo] = useState({
        coverImage: '',
        logoImage: '',
        name: '',
        address: '',
        about: '',
        businessHours: {
            sunday: {},
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {}
        },
        photos: [],
        artists: []
    });
    const [openNow, setOpenNow] = useState(false);

    useEffect(() => {
        if (!studio) {
            fetchStudio(id);
            fetchArtists('cardInfo', { studioid: id });
        } else {
            setStudioInfo({
                coverImage: studio.coverImage.publicId,
                logoImage: studio.logo.publicId,
                name: studio.name,
                address: studio.location.address,
                about: studio.about,
                businessHours: studio.businessHours,
                photos: studio.photos,
                artists: artist.artists
            });
            setOpenNow(isOpenNow());
        }
    }, [artist.artists, fetchArtists, fetchStudio, studio]);

    const formatDateToTime = dateTime => {
        const date = new Date(dateTime);

        return date.toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const isOpenNow = () => {
        const date = new Date();
        const timeNow = formatDateToTime(date.getTime());
        console.log(timeNow);
        const { businessHours: { sunday, monday, tuesday, wednesday, thursday, friday, saturday }} = studioInfo;

        console.log(friday);

        switch (date) {
            case 0: // sunday
                if (sunday.isOpen && timeNow >= formatDateToTime(sunday.opens) && timeNow <= formatDateToTime(sunday.closes)) {
                    return true;
                } else {
                    return false;
                }
            case 1: // monday
                if (monday.isOpen && timeNow >= formatDateToTime(monday.opens) && timeNow <= formatDateToTime(monday.closes)) {
                    return true;
                } else {
                    return false;
                }
            case 2: // tuesday
                if (tuesday.isOpen && timeNow >= formatDateToTime(tuesday.opens) && timeNow <= formatDateToTime(tuesday.closes)) {
                    return true;
                } else {
                    return false;
                }
            case 3: // wednesday
                if (wednesday.isOpen && timeNow >= formatDateToTime(wednesday.opens) && timeNow <= formatDateToTime(wednesday.closes)) {
                    return true;
                } else {
                    return false;
                }
            case 4: // thursday
                if (thursday.isOpen && timeNow >= formatDateToTime(thursday.opens) && timeNow <= formatDateToTime(thursday.closes)) {
                    return true;
                } else {
                    return false;
                }
            case 5: // friday
                if (friday.isOpen && timeNow >= formatDateToTime(friday.opens) && timeNow <= formatDateToTime(friday.closes)) {
                    return true;
                } else {
                    return false;
                }
            case 6: // saturday
                if (saturday.isOpen && timeNow >= formatDateToTime(saturday.opens) && timeNow <= formatDateToTime(saturday.closes)) {
                    return true;
                } else {
                    return false;
                }
            default:
                return false;
        }
    }

    const { coverImage, logoImage, name, address, about, businessHours: { sunday, monday, tuesday, wednesday, thursday, friday, saturday }, photos, artists } = studioInfo;

    return (
        <div>
            <div id="cover">
                <Image src={coverImage ?? cover} className="cover-img" />
            </div>
            <div id="header" className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <Image src={logoImage ?? profileImg} className="avatar" roundedCircle />
                    <div className="align-self-center">
                        <Row>
                            <div>
                                <span className="font-75 d-flex">{name}</span>
                            </div>
                        </Row>
                        <Row>
                            <span className="font-55 d-flex">{address}</span>
                        </Row>
                    </div>
                </div>
                <div className="my-4 mx-5 font-75">
                    {
                        openNow ? (
                            <div>
                                <FaCircle size={15} className="open-hour me-1" /> Open now
                            </div>
                        ) : (
                            <div>
                                <FaCircle size={15} className="closed-hour me-1" /> Closed now
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="d-flex justify-content-between m-5">
                <Col xs={7} className="mx-4">
                    <Row className="mb-5">
                        <h3 className="d-flex solid-bottom-border-secondary">About</h3>
                        <p className="font-65">
                            {about}
                        </p>
                    </Row>
                    <Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Sunday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { sunday.isOpen ? `${formatDateToTime(sunday.opens)} - ${formatDateToTime(sunday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Monday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { monday.isOpen ? `${formatDateToTime(monday.opens)} - ${formatDateToTime(monday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Tuesday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { tuesday.isOpen ? `${formatDateToTime(tuesday.opens)} - ${formatDateToTime(tuesday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Wednesday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { wednesday.isOpen ? `${formatDateToTime(wednesday.opens)} - ${formatDateToTime(wednesday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Thursday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { thursday.isOpen ? `${formatDateToTime(thursday.opens)} - ${formatDateToTime(thursday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Friday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { friday.isOpen ? `${formatDateToTime(friday.opens)} - ${formatDateToTime(friday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Saturday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">
                                { saturday.isOpen ? `${formatDateToTime(saturday.opens)} - ${formatDateToTime(saturday.closes)}` : 'Closed' }
                            </Col>
                        </Row>
                    </Row>
                </Col>
                <Col className="map-card mx-4">
                    <Row>
                        <Image src={map} className="map-img" />
                    </Row>
                    <div className="py-3">
                        <FaMapMarkerAlt />
                        <span className="font-65 px-1">Avenida Paulista 2073, São Paulo, São Paulo</span>
                    </div>
                </Col>
            </div>
            <div className="m-5 px-4">
                <Row className="solid-bottom-border-secondary">
                    <h4 className="d-flex mt-2 fonte-300">Studio</h4>
                </Row>
                <div className="d-flex flex-wrap justify-content-center my-3">
                    {
                        photos && photos.map(photo => <Image src={photo.publicId} key={photo._id} className="m-2 studio-img" />)
                    }
                </div>
                <hr />                    
            </div>
            <div className="ms-4">
                <h3 className="d-flex mt-5 ms-5">Artists</h3>
                <div className="d-flex flex-wrap mx-5">
                    {
                        artists && artists.map(artist => <ArtistCard key={artist._id} artist={artist} onClick={() => history.push(`/artists/${artist._id}`)} />)
                    }
                </div>
            </div>
        </div>
    );
}

Studio.propTypes = {
    studio: PropTypes.object.isRequired,
    fetchStudio: PropTypes.func.isRequired,
    fetchArtists: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    studio: state.studio,
    artist: state.artist
});

export default connect(mapStateToProps, { fetchStudio, fetchArtists })(withRouter(Studio));