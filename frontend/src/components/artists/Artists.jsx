import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import img1 from './img/2.jpeg';
import img2 from './img/3.jpeg';
import img3 from './img/4.jpeg';
import img4 from './img/5.jpeg';
import img5 from './img/1.jpeg';
import avatar from './artist/user_w.png'

const Artists = () => {
    return (
        <div>
            <h1>Artists</h1>
            <p style={{ fontSize: '70%', color: 'gray' }}>Find your next tattoo artist.</p>
            <Row className="justify-content-md-center my-4">
                <Col md={{ span: 4 }}>
                    <Form.Group controlId="formArtistLocation">
                        <Form.Control type="text" placeholder="In which city?" />
                    </Form.Group>
                </Col>
            </Row>
            <hr className="mb-3" />
            <Row className="d-flex justify-content-center">
                <Col style={{ borderRadius: '16px', backgroundColor: '#212529', flex: '0 0 400px' }} className="m-3">
                    <Row>
                        <Image src={img1} style={{ height: '215px', padding: 0, borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover' }} />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                        <Col>
                            <Row style={{ fontSize: '60%' }}>Tattoist 1</Row>
                            <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div style={{ borderTop: '1px dashed #ffffff30' }} className="d-flex flex-wrap pt-2 pb-1">
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Blackwork</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Dotwork</span>
                    </div>
                </Col>
                <Col style={{ borderRadius: '16px', backgroundColor: '#212529', flex: '0 0 400px' }} className="m-3">
                    <Row>
                        <Image src={img2} style={{ height: '215px', padding: 0, borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover' }} />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                        <Col>
                            <Row style={{ fontSize: '60%' }}>Tattoist 2</Row>
                            <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div style={{ borderTop: '1px dashed #ffffff30' }} className="d-flex flex-wrap pt-2 pb-1">
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Blackwork</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Neo-Tradicional</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Realism</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Illustrative</span>
                    </div>
                </Col>
                <Col style={{ borderRadius: '16px', backgroundColor: '#212529', flex: '0 0 400px' }} className="m-3">
                    <Row>
                        <Image src={img3} style={{ height: '215px', padding: 0, borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover' }} />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                        <Col>
                            <Row style={{ fontSize: '60%' }}>Tattoist 3</Row>
                            <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div style={{ borderTop: '1px dashed #ffffff30' }} className="d-flex flex-wrap pt-2 pb-1">
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Black &amp; Gray</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Blackwork</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Dotwork</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Fineline</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Ornamental</span>
                    </div>
                </Col>
                <Col style={{ borderRadius: '16px', backgroundColor: '#212529', flex: '0 0 400px' }} className="m-3">
                    <Row>
                        <Image src={img4} style={{ height: '215px', padding: 0, borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover' }} />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                        <Col>
                            <Row style={{ fontSize: '60%' }}>Tattoist 4</Row>
                            <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div style={{ borderTop: '1px dashed #ffffff30' }} className="d-flex flex-wrap pt-2 pb-1">
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Blackwork</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Fineline</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Neo-Tradition</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Illustrative</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Surrealism</span>
                    </div>
                </Col>
                <Col style={{ borderRadius: '16px', backgroundColor: '#212529', flex: '0 0 400px' }} className="m-3">
                    <Row>
                        <Image src={img5} style={{ height: '215px', padding: 0, borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover' }} />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                        <Col>
                            <Row style={{ fontSize: '60%' }}>Tattoist 5</Row>
                            <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div style={{ borderTop: '1px dashed #ffffff30' }} className="d-flex flex-wrap pt-2 pb-1">
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Blackwork</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Fineline</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Neo-Tradition</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Illustrative</span>
                        <span style={{ border: '1px solid #ffffff30', marginBottom: '3px', borderRadius: '16px', fontSize: '10px', padding: '7px', whiteSpace: 'nowrap' }} className="mx-1">Surrealism</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Artists;