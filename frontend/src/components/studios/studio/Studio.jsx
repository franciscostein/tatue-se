import './Studio.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { fetchStudio } from '../../../actions/studio';
import PropTypes from 'prop-types';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaMapMarkerAlt, FaCircle } from 'react-icons/fa';

import cover from '../../../assets/studio/cover/1.jpeg';
import profileImg from '../../../assets/user_w.png';
import map from '../../../assets/staticmap.png';

import img1 from '../../../assets/artist/2.jpeg';
import img2 from '../../../assets/artist/3.jpeg';
import img3 from '../../../assets/artist/4.jpeg';
import img4 from '../../../assets/artist/5.jpeg';

const Studio = ({ studio: { studio }, fetchStudio }) => {
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
        photos: []
    });
    const [openNow, setOpenNow] = useState(false);

    useEffect(() => {
        if (!studio) {
            fetchStudio(id);
        } else {
            setStudioInfo({
                coverImage: studio.coverImage.publicId,
                logoImage: studio.logo.publicId,
                name: studio.name,
                address: studio.location.address,
                about: studio.about,
                businessHours: studio.businessHours,
                photos: studio.photos
            });
            setOpenNow(isOpenNow());
        }
    }, [fetchStudio, id, studio]);

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

    const { coverImage, logoImage, name, address, about, businessHours: { sunday, monday, tuesday, wednesday, thursday, friday, saturday }, photos } = studioInfo;

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
                        photos && photos.map(photo => <Image src={photo.publicId} key={photo._id} className="m-3 studio-img" />)
                    }
                </div>
                <hr />                    
            </div>
            <div className="ms-4">
                <h3 className="d-flex mt-5 ms-5">Artists</h3>
                <div className="d-flex flex-wrap justify-content-center mx-5">
                    <div className="studio-card m-3">
                        <Row>
                            <Image src={img1} className="studio-card-img" />
                        </Row>
                        <div className="d-flex align-items-center mb-1">
                            <Image src={profileImg} className="studio-avatar-img" roundedCircle />
                            <Col>
                                <Row className="font-60">Tattoist 1</Row>
                                <Row className="font-45">Tattoo Studio</Row>
                            </Col>
                        </div>
                        <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                            <span className="tattoo-style-badge mx-1">Blackwork</span>
                            <span className="tattoo-style-badge mx-1">Dotwork</span>
                        </div>
                    </div>
                    <div className="studio-card m-3">
                        <Row>
                            <Image src={img2} className="studio-card-img" />
                        </Row>
                        <div className="d-flex align-items-center mb-1">
                            <Image src={profileImg} className="studio-avatar-img" roundedCircle />
                            <Col>
                                <Row className="font-60">Tattoist 2</Row>
                                <Row className="font-45">Tattoo Studio</Row>
                            </Col>
                        </div>
                        <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                            <span className="tattoo-style-badge mx-1">Blackwork</span>
                            <span className="tattoo-style-badge mx-1">Neo-Tradicional</span>
                            <span className="tattoo-style-badge mx-1">Realism</span>
                            <span className="tattoo-style-badge mx-1">Illustrative</span>
                        </div>
                    </div>
                    <div className="studio-card m-3">
                        <Row>
                            <Image src={img3} className="studio-card-img" />
                        </Row>
                        <div className="d-flex align-items-center mb-1">
                            <Image src={profileImg} className="studio-avatar-img" roundedCircle />
                            <Col>
                                <Row className="font-60">Tattoist 3</Row>
                                <Row className="font-45">Tattoo Studio</Row>
                            </Col>
                        </div>
                        <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                            <span className="tattoo-style-badge mx-1">Black &amp; Gray</span>
                            <span className="tattoo-style-badge mx-1">Blackwork</span>
                            <span className="tattoo-style-badge mx-1">Dotwork</span>
                            <span className="tattoo-style-badge mx-1">Fineline</span>
                            <span className="tattoo-style-badge mx-1">Ornamental</span>
                        </div>
                    </div>
                    <div className="studio-card m-3">
                        <Row>
                            <Image src={img4} className="studio-card-img" />
                        </Row>
                        <div className="d-flex align-items-center mb-1">
                            <Image src={profileImg} className="studio-avatar-img" roundedCircle />
                            <Col>
                                <Row className="font-60">Tattoist 4</Row>
                                <Row className="font-45">Tattoo Studio</Row>
                            </Col>
                        </div>
                        <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                            <span className="tattoo-style-badge mx-1">Blackwork</span>
                            <span className="tattoo-style-badge mx-1">Fineline</span>
                            <span className="tattoo-style-badge mx-1">Neo-Tradition</span>
                            <span className="tattoo-style-badge mx-1">Illustrative</span>
                            <span className="tattoo-style-badge mx-1">Surrealism</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Studio.propTypes = {
    studio: PropTypes.object.isRequired,
    fetchStudio: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    studio: state.studio
});

export default connect(mapStateToProps, { fetchStudio })(withRouter(Studio));