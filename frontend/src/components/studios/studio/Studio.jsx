import './Studio.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStar, FaMapMarkerAlt, FaCircle } from 'react-icons/fa';

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

const Studios = () => {
    return (
        <div>
            <div id="cover">
                <Image src={cover} className="cover-img" />
            </div>
            <div id="header" className="d-flex justify-content-between">
                <div className="d-flex">
                    <Image src={profileImg} className="studio-avatar" roundedCircle />
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
                    <div className="font-75 d-flex align-items-center">
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
                <div className="d-flex flex-wrap justify-content-center mt-3">
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
        </div>
    );
}

export default Studios;