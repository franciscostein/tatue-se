import './Studio.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { FaStar } from 'react-icons/fa';

import profileImg from '../../../assets/user_w.png';

const Studios = () => {
    return (
        <div>
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
        </div>
    );
}

export default Studios;