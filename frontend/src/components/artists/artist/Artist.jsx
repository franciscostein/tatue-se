import './Artist.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import avatar from '../../../assets/user_w.png';
import { FaInstagram, FaGlobe } from 'react-icons/fa';

import tattoo from '../../../assets/tattoos/0.jpeg';
import tattoo1 from '../../../assets/tattoos/1.jpeg';
import tattoo2 from '../../../assets/tattoos/2.jpeg';
import tattoo3 from '../../../assets/tattoos/3.jpeg';
import tattoo4 from '../../../assets/tattoos/4.jpeg';
import tattoo5 from '../../../assets/tattoos/5.jpeg';
import tattoo6 from '../../../assets/tattoos/6.jpeg';
import tattoo7 from '../../../assets/tattoos/7.jpeg';
import tattoo8 from '../../../assets/tattoos/8.jpeg';
import tattoo9 from '../../../assets/tattoos/9.jpeg';
import tattoo10 from '../../../assets/tattoos/10.jpeg';
import tattoo11 from '../../../assets/tattoos/11.jpeg';
import tattoo12 from '../../../assets/tattoos/12.jpeg';
import tattoo13 from '../../../assets/tattoos/13.jpeg';
import tattoo14 from '../../../assets/tattoos/14.jpeg';
import tattoo15 from '../../../assets/tattoos/15.jpeg';
import tattoo16 from '../../../assets/tattoos/16.jpeg';
import tattoo17 from '../../../assets/tattoos/17.jpeg';
import tattoo18 from '../../../assets/tattoos/18.jpeg';
import tattoo19 from '../../../assets/tattoos/19.jpeg';
import tattoo20 from '../../../assets/tattoos/20.jpeg';
import tattoo21 from '../../../assets/tattoos/21.jpeg';
import tattoo22 from '../../../assets/tattoos/22.jpeg';
import tattoo23 from '../../../assets/tattoos/23.jpeg';
import tattoo24 from '../../../assets/tattoos/24.jpeg';
import tattoo25 from '../../../assets/tattoos/25.jpeg';
import tattoo26 from '../../../assets/tattoos/26.jpeg';
import tattoo27 from '../../../assets/tattoos/27.jpeg';
import tattoo28 from '../../../assets/tattoos/28.jpeg';
import tattoo29 from '../../../assets/tattoos/29.jpeg';
import tattoo30 from '../../../assets/tattoos/30.jpeg';
import tattoo31 from '../../../assets/tattoos/31.jpeg';
import tattoo32 from '../../../assets/tattoos/32.jpeg';
import tattoo33 from '../../../assets/tattoos/33.jpeg';
import tattoo34 from '../../../assets/tattoos/34.jpeg';
import tattoo35 from '../../../assets/tattoos/35.jpeg';
import tattoo36 from '../../../assets/tattoos/36.jpeg';
import tattoo37 from '../../../assets/tattoos/37.jpeg';
import tattoo38 from '../../../assets/tattoos/38.jpeg';
import tattoo39 from '../../../assets/tattoos/39.jpeg';
import tattoo40 from '../../../assets/tattoos/40.jpeg';
import tattoo41 from '../../../assets/tattoos/41.jpeg';
import tattoo42 from '../../../assets/tattoos/42.jpeg';
import tattoo43 from '../../../assets/tattoos/43.jpeg';
import tattoo44 from '../../../assets/tattoos/44.jpeg';
import tattoo45 from '../../../assets/tattoos/45.jpeg';
import tattoo46 from '../../../assets/tattoos/46.jpeg';
import tattoo47 from '../../../assets/tattoos/47.jpeg';
import tattoo48 from '../../../assets/tattoos/48.jpeg';
import tattoo49 from '../../../assets/tattoos/49.jpeg';

const Artist = () => {
    return (
        <div id="main" className="d-flex align-items-start m-5">
            <Col id="sidebar" className="p-2 mx-4" sm={2}>
                <div className="d-flex align-items-center mb-1">
                    <Image src={avatar} className="artist-avatar" roundedCircle />
                    <Col>
                        <Row className="font-60">Tattoist 1</Row>
                        <Row className="font-45">Tattoo Studio</Row>
                    </Col>
                </div>
                <div className="dashed-top-border">
                    <h5 className="d-flex pt-2">Bio</h5>
                    <p className="font-50">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Suscipit ex modi porro praesentium necessitatibus temporibus quae. 
                        Accusantium omnis cupiditate deserunt minima, praesentium sint nam amet? 
                        Numquam architecto accusantium suscipit enim dolores ab dicta quisquam nam expedita odio?
                    </p>
                </div>
                <div className="d-flex justify-content-between p-2 solid-bottom-border">
                    <span className="font-65">Instagrão</span>
                    <span className="d-flex">
                        <FaInstagram />
                    </span>
                </div>
                <div className="d-flex justify-content-between p-2 solid-bottom-border">
                    <span className="font-65">Website</span>
                    <span className="d-flex">
                        <FaGlobe />
                    </span>
                </div>
                <div className="solid-bottom-border">
                    <h5 className="pt-3 pb-2">Worplace</h5>
                    <div className="d-flex mb-1">
                        <Image src={avatar} className="studio-avatar" roundedCircle />
                        <Col>
                            <Row className="font-60">Tattoo Studio</Row>
                            <Row className="font-45">Campinas, SP</Row>
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
                        <div className="price-display py-1 mx-2 mb-3">
                            <Row>
                                <span className="secondary-color font-50">Hour rate:</span>
                            </Row>
                            <Row>
                                <span className="font-50">350 BRL</span>
                            </Row>
                        </div>
                        <div className="price-display py-1 mx-2 mb-3">
                            <Row>
                                <span className="secondary-color font-50">Min. rate:</span>
                            </Row>
                            <Row>
                                <span className="font-50">350 BRL</span>
                            </Row>
                        </div>
                    </div>
                </div>
            </Col>
            <Col id="content" className="mx-4" sm={9}>
                <Row className="solid-bottom-border-secondary">
                    <h4 className="d-flex mt-2 fontw-300">Tattoos</h4>
                </Row>
                <div className="d-flex flex-wrap justify-content-center">
                    <Image src={tattoo} className="m-3 tattoo-img" />
                    <Image src={tattoo1} className="m-3 tattoo-img" />
                    <Image src={tattoo2} className="m-3 tattoo-img" />
                    <Image src={tattoo3} className="m-3 tattoo-img" />
                    <Image src={tattoo4} className="m-3 tattoo-img" />
                    <Image src={tattoo5} className="m-3 tattoo-img" />
                    <Image src={tattoo6} className="m-3 tattoo-img" />
                    <Image src={tattoo7} className="m-3 tattoo-img" />
                    <Image src={tattoo8} className="m-3 tattoo-img" />
                    <Image src={tattoo9} className="m-3 tattoo-img" />
                    <Image src={tattoo10} className="m-3 tattoo-img" />
                    <Image src={tattoo11} className="m-3 tattoo-img" />
                    <Image src={tattoo12} className="m-3 tattoo-img" />
                    <Image src={tattoo13} className="m-3 tattoo-img" />
                    <Image src={tattoo14} className="m-3 tattoo-img" />
                    <Image src={tattoo15} className="m-3 tattoo-img" />
                    <Image src={tattoo16} className="m-3 tattoo-img" />
                    <Image src={tattoo17} className="m-3 tattoo-img" />
                    <Image src={tattoo18} className="m-3 tattoo-img" />
                    <Image src={tattoo19} className="m-3 tattoo-img" />
                    <Image src={tattoo20} className="m-3 tattoo-img" />
                    <Image src={tattoo21} className="m-3 tattoo-img" />
                    <Image src={tattoo22} className="m-3 tattoo-img" />
                    <Image src={tattoo23} className="m-3 tattoo-img" />
                    <Image src={tattoo24} className="m-3 tattoo-img" />
                    <Image src={tattoo25} className="m-3 tattoo-img" />
                    <Image src={tattoo26} className="m-3 tattoo-img" />
                    <Image src={tattoo27} className="m-3 tattoo-img" />
                    <Image src={tattoo28} className="m-3 tattoo-img" />
                    <Image src={tattoo29} className="m-3 tattoo-img" />
                    <Image src={tattoo30} className="m-3 tattoo-img" />
                    <Image src={tattoo31} className="m-3 tattoo-img" />
                    <Image src={tattoo32} className="m-3 tattoo-img" />
                    <Image src={tattoo33} className="m-3 tattoo-img" />
                    <Image src={tattoo34} className="m-3 tattoo-img" />
                    <Image src={tattoo35} className="m-3 tattoo-img" />
                    <Image src={tattoo36} className="m-3 tattoo-img" />
                    <Image src={tattoo37} className="m-3 tattoo-img" />
                    <Image src={tattoo38} className="m-3 tattoo-img" />
                    <Image src={tattoo39} className="m-3 tattoo-img" />
                    <Image src={tattoo40} className="m-3 tattoo-img" />
                    <Image src={tattoo41} className="m-3 tattoo-img" />
                    <Image src={tattoo42} className="m-3 tattoo-img" />
                    <Image src={tattoo43} className="m-3 tattoo-img" />
                    <Image src={tattoo44} className="m-3 tattoo-img" />
                    <Image src={tattoo45} className="m-3 tattoo-img" />
                    <Image src={tattoo46} className="m-3 tattoo-img" />
                    <Image src={tattoo47} className="m-3 tattoo-img" />
                    <Image src={tattoo48} className="m-3 tattoo-img" />
                    <Image src={tattoo49} className="m-3 tattoo-img" />
                </div>
            </Col>
        </div>
    );
}

export default Artist;