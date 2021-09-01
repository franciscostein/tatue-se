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

const Studios = () => {
    return (
        <div>
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
                            <Row className="font-60">Studio 1</Row>
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
                            <Row className="font-60">Studio 2</Row>
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
                            <Row className="font-60">Studio 3</Row>
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
                            <Row className="font-60">Studio 4</Row>
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
                            <Row className="font-60">Studio 5</Row>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Studios;