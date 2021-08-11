import './Studio.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

import cover from '../../../assets/studio/1.jpeg';
import profileImg from '../../../assets/user_w.png';
import map from '../../../assets/staticmap.png';

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
            <div className="d-flex justify-content-between mt-5 mx-5">
                <Col>
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
                </Col>
                <Col className="map-card m-3">
                    <Row>
                        <Image src={map} className="map-img" />
                    </Row>
                    <div>
                        <FaMapMarkerAlt />
                        <span className="font-60 my-3">Avenida Paulista 2073, São Paulo, São Paulo</span>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default Studios;