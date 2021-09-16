import React, { useEffect } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import img1 from '../../assets/artist/2.jpeg';
import img2 from '../../assets/artist/3.jpeg';
import img3 from '../../assets/artist/4.jpeg';
import img4 from '../../assets/artist/5.jpeg';
import img5 from '../../assets/artist/1.jpeg';
import avatar from '../../assets/user_w.png';

const Artists = () => {
    useEffect(() => {
        fetchTattooStyles();
    }, []);

    const fetchTattooStyles = async () => {
        const res = await axios.get('/api/tattoo-styles');

        console.log(res.data);
    }

    return (
        <div>
            <div className="search-header">
                <h1 className="mt-5">Artists</h1>
                <p className="font-70 secondary-color">Find your next tattoo artist.</p>
                <Form.Group controlId="formArtistLocation">
                    <Form.Control type="text" placeholder="In which city?" />
                </Form.Group>
                <div>
                    <span className="tattoo-style-badge font-50 mx-1">Black &amp; Gray</span>
                    <span className="tattoo-style-badge font-50 mx-1">Blackwork</span>
                    <span className="tattoo-style-badge font-50 mx-1">Dotwork</span>
                    <span className="tattoo-style-badge font-50 mx-1">Fineline</span>
                    <span className="tattoo-style-badge font-50 mx-1">Illustrative</span>
                    <span className="tattoo-style-badge font-50 mx-1">Neo-Traditional</span>
                    <span className="tattoo-style-badge font-50 mx-1">Ornamental</span>
                    <span className="tattoo-style-badge font-50 mx-1">Realism</span>
                    <span className="tattoo-style-badge font-50 mx-1">Surrealism</span>
                </div>
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
                </div>
                <div className="studio-card m-3">
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
                </div>
                <div className="studio-card m-3">
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
                </div>
                <div className="studio-card m-3">
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
                </div>
            </div>
        </div>
    );
}

export default Artists;