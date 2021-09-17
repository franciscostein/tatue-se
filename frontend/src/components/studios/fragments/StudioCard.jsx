import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaMapMarkerAlt } from 'react-icons/fa';

import img1 from '../../assets/studio/0.jpeg';
import img2 from '../../assets/studio/3.jpeg';
import img3 from '../../assets/studio/9.jpeg';
import img4 from '../../assets/studio/5.jpeg';
import img5 from '../../assets/studio/1.jpeg';
import avatar from '../../assets/user_w.png';

const StudioCard = ({}) => {
    return (
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
    );
}

export default StudioCard;