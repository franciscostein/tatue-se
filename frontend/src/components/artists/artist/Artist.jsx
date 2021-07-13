import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import avatar from '../../../assets/user_w.png';
import { FaInstagram, FaGlobe } from 'react-icons/fa';

const Artist = () => {
    return (
        <Container>
            <div style={{ border: '1px solid', borderRadius: '16px', width: 'calc(25% - 12px)' }} className="p-2">
                <div className="d-flex align-items-center mb-1">
                    <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '65px', width: '65px' }} roundedCircle />
                    <Col>
                        <Row style={{ fontSize: '60%' }}>Tattoist 1</Row>
                        <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                    </Col>
                </div>
                <div style={{ borderTop: '1px dashed' }}>
                    <h5 className="d-flex pt-2">Bio</h5>
                    <p style={{ fontSize: '50%' }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Suscipit ex modi porro praesentium necessitatibus temporibus quae. 
                        Accusantium omnis cupiditate deserunt minima, praesentium sint nam amet? 
                        Numquam architecto accusantium suscipit enim dolores ab dicta quisquam nam expedita odio?
                    </p>
                </div>
                <div className="d-flex justify-content-between p-2" style={{ borderBottom: '1px solid' }}>
                    <span style={{ fontSize: '75%' }}>Instagrão</span>
                    <span className="d-flex">
                        <FaInstagram />
                    </span>
                </div>
                <div className="d-flex justify-content-between p-2" style={{ borderBottom: '1px solid' }}>
                    <span style={{ fontSize: '75%' }}>Website</span>
                    <span className="d-flex">
                        <FaGlobe />
                    </span>
                </div>
                <div>
                    <h5 className="py-3">Worplace</h5>
                </div>
            </div>
        </Container>
    );
}

export default Artist;