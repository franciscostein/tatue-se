import './StudioMiniCard.css';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaTimes } from 'react-icons/fa';

import avatarPlaceholder from '../../../assets/user_w.png';

const StudioMiniCard = ({ studio: { logo = { publicId: null }, name, location }, removeFunction }) => {
    return (
        <div className="studio-card-mini m-3 p-2">
            <div className="d-flex align-items-center mb-1">
                <Image src={logo.publicId ?? avatarPlaceholder} className="studio-avatar-img-mini" roundedCircle />
                <Col>
                    <div className="d-flex font-60 my-1 ms-2">{name}</div>
                    <div className="d-flex">
                        {/* <FaMapMarkerAlt size={14} /> */}
                        <span className="font-45 ms-2">{location.address}</span>
                    </div>
                </Col>
            </div>
            <div className="remover">
                <FaTimes onClick={removeFunction} />
            </div>
        </div>
    );
}

export default StudioMiniCard;