import './Studio.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaStar, FaRegStar, FaMapMarkerAlt, FaCircle } from 'react-icons/fa';

import cover from '../../../assets/studio/cover/1.jpeg';
import profileImg from '../../../assets/user_w.png';
import map from '../../../assets/staticmap.png';
import studio from '../../../assets/studio/0.jpeg';
import studio1 from '../../../assets/studio/1.jpeg';
import studio2 from '../../../assets/studio/2.jpeg';
import studio3 from '../../../assets/studio/3.jpeg';
import studio4 from '../../../assets/studio/4.jpeg';
import studio5 from '../../../assets/studio/5.jpeg';
import studio6 from '../../../assets/studio/6.jpeg';
import studio7 from '../../../assets/studio/7.jpeg';
import studio8 from '../../../assets/studio/8.jpeg';
import studio9 from '../../../assets/studio/9.jpeg';

import img1 from '../../../assets/artist/2.jpeg';
import img2 from '../../../assets/artist/3.jpeg';
import img3 from '../../../assets/artist/4.jpeg';
import img4 from '../../../assets/artist/5.jpeg';

const Studio = () => {
    return (
        <div>
            <div id="cover">
                <Image src={cover} className="cover-img" />
            </div>
            <div id="header" className="d-flex justify-content-between">
                <div className="d-flex">
                    <Image src={profileImg} className="avatar" roundedCircle />
                    <div className="align-self-center">
                        <Row>
                            <div>
                                <span className="font-75 d-flex">Studio Name</span>
                            </div>
                        </Row>
                        <Row>
                            <span className="font-55 d-flex">Campinas, SP</span>
                        </Row>
                    </div>
                </div>
                <div className="my-4 mx-5">
                    <div className="font-75 d-flex align-items-center mt-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <span className="p-1">5</span>
                    </div>
                    <div className="font-55 d-flex">
                        <span>See all reviews (7)</span>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between m-5">
                <Col xs={7} className="mx-4">
                    <Row className="mb-5">
                        <h3 className="d-flex solid-bottom-border-secondary">About</h3>
                        <p className="font-65">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Ea illo tempora iste amet consequuntur aliquam maiores exercitationem consequatur, 
                            voluptatem fugit neque architecto modi ex deleniti commodi! Odio provident, 
                            iusto molestiae dicta commodi quisquam veniam eos accusantium ducimus molestias, 
                            nostrum voluptates eveniet reiciendis excepturi repellat consequuntur distinctio 
                            error ipsa laudantium quo vitae, porro fugiat quaerat nesciunt. Ad tenetur nemo velit nam. 
                            Aperiam neque iste vel soluta dolore, voluptatum optio non doloribus ipsa doloremque 
                            quibusdam nulla deleniti nemo nisi.
                        </p>
                    </Row>
                    <Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">
                                <div className="open-hour"><FaCircle size={14} /></div>
                                &nbsp;
                                Thursday
                            </Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">11:00 - 21:00</Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Friday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">13:00 - 23:00</Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Saturday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">13:00 - 23:00</Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Sunday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">13:00 - 23:00</Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Monday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">Closed</Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Tuesday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">11:00 - 21:00</Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex justify-content-start font-65">Wednesday</Col>
                            <Col md="auto" className="d-flex justify-content-end font-65">11:00 - 21:00</Col>
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
                    <Image src={studio} className="m-3 studio-img" />
                    <Image src={studio1} className="m-3 studio-img" />
                    <Image src={studio2} className="m-3 studio-img" />
                    <Image src={studio3} className="m-3 studio-img" />
                    <Image src={studio4} className="m-3 studio-img" />
                    <Image src={studio5} className="m-3 studio-img" />
                    <Image src={studio6} className="m-3 studio-img" />
                    <Image src={studio7} className="m-3 studio-img" />
                    <Image src={studio8} className="m-3 studio-img" />
                    <Image src={studio9} className="m-3 studio-img" />
                </div>
            </div>

            <div className="m-5">
                <div className="d-flex justify-content-between">
                    <h3 className="mt-5 mx-4">Reviews</h3>
                    <Button variant="dark" className="mt-5 mx-4">View all</Button>
                </div>
                <div className="d-flex justify-content-between align-items-center solid-bottom-border-secondary mx-4">
                    <Image src={profileImg} className="avatar" roundedCircle />
                    <span className="d-flex font-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae in minus ut magnam?</span>
                    <div className="d-flex nowrap">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaRegStar />
                        <FaRegStar />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center solid-bottom-border-secondary mx-4">
                    <Image src={profileImg} className="avatar" roundedCircle />
                    <span className="d-flex font-60">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius debitis ipsam corporis iste quo delectus.</span>
                    <div className="d-flex nowrap">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center solid-bottom-border-secondary mx-4">
                    <Image src={profileImg} className="avatar" roundedCircle />
                    <span className="d-flex font-60">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, quam mollitia itaque velit at dignissimos. Nobis, nemo? Quaerat, tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum itaque repellendus suscipit.</span>
                    <div className="d-flex nowrap">
                        <FaStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                    </div>
                </div>
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

export default Studio;