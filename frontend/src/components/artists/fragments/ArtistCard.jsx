import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import coverPlaceholder from '../../../assets/cover.jpg';
import avatarPlaceholder from '../../../assets/user_w.png';

const ArtistCard = ({ artist: { coverImage = { publicId: null }, profilePicture = { publicId: null }, fullName, workplaces, tattooStyles }, onClick }) => {
    return (
        <div className="studio-card m-3" onClick={onClick}>
            <Row>
                <Image src={coverImage.publicId ?? coverPlaceholder} className="studio-card-img" />
            </Row>
            <div className="d-flex align-items-center mb-1">
                <Image src={profilePicture.publicId ?? avatarPlaceholder} className="studio-avatar-img" roundedCircle />
                <Col>
                    <Row className="font-60 ps-3">{fullName}</Row>
                    <Row className="font-45 ps-3">{workplaces.length > 0 ? workplaces[0].name : null}</Row>
                </Col>
            </div>
            {
                tattooStyles &&
                <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                    {
                        tattooStyles.map(tattooStyle => <span className="tattoo-style-badge mx-1">{tattooStyle.name}</span>)
                    }
                </div>
            }
        </div>
    );
}

export default ArtistCard;