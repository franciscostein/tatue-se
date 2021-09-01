import './Studios.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { FaMapMarkerAlt } from 'react-icons/fa';

import img1 from '../../assets/studio/0.jpeg';
import img2 from '../../assets/studio/3.jpeg';
import img3 from '../../assets/studio/9.jpeg';
import img4 from '../../assets/studio/5.jpeg';
import img5 from '../../assets/studio/1.jpeg';
import avatar from '../../assets/user_w.png';

const Studios = () => {
    return (
        <div className="full-content">
            <div className="search-header">
                <h1 className="mt-5">Studios</h1>
                <p className="font-70 secondary-color">Find tattoo studios near you.</p>
                <Form.Group controlId="formArtistLocation">
                    <Form.Control type="text" placeholder="In which city?" />
                </Form.Group>
            </div>

            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center mx-5">
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img1} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <div className="d-flex font-60 my-1">Studio 1</div>
                            <div className="d-flex">
                                <FaMapMarkerAlt size={14} />
                                <span className="font-45 ms-1">Beco Abunã 257, Petrópolis, Manaus - AM</span>
                            </div>
                        </Col>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img2} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <div className="d-flex font-60 my-1">Studio 2</div>
                            <div className="d-flex">
                                <FaMapMarkerAlt size={14} />
                                <span className="font-45 ms-1">Avenida Nepal 755, Nova Cidade, Manaus - AM</span>
                            </div>
                        </Col>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img3} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <div className="d-flex font-60 my-1">Studio 3</div>
                            <div className="d-flex">
                                <FaMapMarkerAlt size={14} />
                                <span className="font-45 ms-1">Rua Mestre Albano 620, Asa Branca, Boa Vista - RR</span>
                            </div>
                        </Col>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img4} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <div className="d-flex font-60 my-1">Studio 4</div>
                            <div className="d-flex">
                                <FaMapMarkerAlt size={14} />
                                <span className="font-45 ms-1">Rua Vinte 511, Praia da Esparança, Magé - RJ</span>
                            </div>
                        </Col>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img5} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <div className="d-flex font-60 my-1">Studio 5</div>
                            <div className="d-flex">
                                <FaMapMarkerAlt size={14} />
                                <span className="font-45 ms-1">Rua do Calçadão 212, Duque de Caxias, São Leopoldo - RS</span>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Studios;