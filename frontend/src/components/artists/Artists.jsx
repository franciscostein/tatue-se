import './Artists.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import img1 from './img/2.jpeg';
import img2 from './img/3.jpeg';
import img3 from './img/4.jpeg';
import img4 from './img/5.jpeg';
import img5 from './img/1.jpeg';
import avatar from '../../assets/user_w.png';

const Artists = () => {
    return (
        <div>
            <h1 className="mt-5">Artists</h1>
            <p className="font-70 secondary-color">Find your next tattoo artist.</p>
            <Row className="justify-content-md-center my-4">
                <Col md={{ span: 4 }}>
                    <Form.Group controlId="formArtistLocation">
                        <Form.Control type="text" placeholder="In which city?" />
                    </Form.Group>
                </Col>
            </Row>
            <hr className="mb-3" />
            <Row className="d-flex justify-content-center">
                <Col className="studio-card m-3">
                    <Row>
                        <Image src={img1} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60">Tattoist 1</Row>
                            <Row className="font-45">Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Dotwork</span>
                    </div>
                </Col>
                <Col className="studio-card m-3">
                    <Row>
                        <Image src={img2} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
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
                </Col>
                <Col className="studio-card m-3">
                    <Row>
                        <Image src={img3} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
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
                </Col>
                <Col className="studio-card m-3">
                    <Row>
                        <Image src={img4} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
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
                </Col>
                <Col className="studio-card m-3">
                    <Row>
                        <Image src={img5} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60">Tattoist 5</Row>
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
                </Col>
            </Row>
        </div>
    );
}

export default Artists;