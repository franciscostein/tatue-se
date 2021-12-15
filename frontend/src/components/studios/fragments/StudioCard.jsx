import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaMapMarkerAlt } from 'react-icons/fa';

import coverPlaceholder from '../../../assets/cover.jpg';
import avatarPlaceholder from '../../../assets/user_w.png';

const StudioCard = ({ studio: { coverImage = { publicId: null }, logo = { publicId: null }, name, location }, onClick }) => {
    return (
        <div className="studio-card m-3" onClick={onClick}>
            <Row>
                <Image src={coverImage.publicId ?? coverPlaceholder} className="studio-card-img" />
            </Row>
            <div className="d-flex align-items-center mb-1">
                <Image src={logo.publicId ?? avatarPlaceholder} className="studio-avatar-img" roundedCircle />
                <Col>
                    <div className="d-flex font-60 my-1">{name}</div>
                    <div className="d-flex align-items-center">
                        <FaMapMarkerAlt size={13} />
                        <span className="font-45 ms-1">{location.address}</span>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default StudioCard;