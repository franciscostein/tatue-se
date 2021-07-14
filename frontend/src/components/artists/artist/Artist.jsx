import './Artist.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import avatar from '../../../assets/user_w.png';
import { FaInstagram, FaGlobe } from 'react-icons/fa';

const Artist = () => {
    return (
        <div id="main" className="d-flex m-5">
            <Col id="sidebar" className="p-2 mx-5" sm={2}>
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
                    <span style={{ fontSize: '65%' }}>Instagrão</span>
                    <span className="d-flex">
                        <FaInstagram />
                    </span>
                </div>
                <div className="d-flex justify-content-between p-2" style={{ borderBottom: '1px solid' }}>
                    <span style={{ fontSize: '65%' }}>Website</span>
                    <span className="d-flex">
                        <FaGlobe />
                    </span>
                </div>
                <div style={{ borderBottom: '1px solid' }}>
                    <h5 className="pt-3 pb-2">Worplace</h5>
                    <div className="d-flex mb-1">
                        <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                        <Col>
                            <Row style={{ fontSize: '60%' }}>Tattoo Studio</Row>
                            <Row style={{ fontSize: '45%' }}>Campinas, SP</Row>
                        </Col>
                    </div>
                </div>
                <div>
                    <h5 className="d-flex pt-3">Styles</h5>
                    <div className="d-flex flex-wrap py-1">
                        <span className="tattoo-style-badge mx-1">Black &amp; Gray</span>
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Dotwork</span>
                        <span className="tattoo-style-badge mx-1">Fineline</span>
                        <span className="tattoo-style-badge mx-1">Ornamental</span>
                    </div>

                    <h5 className="d-flex pt-3">Pricing</h5>
                    <div className="d-flex">
                        <div style={{ backgroundColor: '#282c34', borderRadius: '16px', width: 'calc(50% - 8px)' }} className="py-1 mx-2 mb-3">
                            <Row>
                                <span style={{ color: '#ffffff30', fontSize: '50%' }}>Hour rate:</span>
                            </Row>
                            <Row>
                                <span style={{ fontSize: '55%' }}>350 BRL</span>
                            </Row>
                        </div>
                        <div style={{ backgroundColor: '#282c34', borderRadius: '16px', width: 'calc(50% - 8px)' }} className="py-1 mx-2 mb-3">
                            <Row>
                                <span style={{ color: '#ffffff30', fontSize: '50%' }}>Min. rate:</span>
                            </Row>
                            <Row>
                                <span style={{ fontSize: '55%' }}>350 BRL</span>
                            </Row>
                        </div>
                    </div>
                </div>
            </Col>
            <Col id="content" className="" sm={9}>
                a
            </Col>
        </div>
    );
}

export default Artist;