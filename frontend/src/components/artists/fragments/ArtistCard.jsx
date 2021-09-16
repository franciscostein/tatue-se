import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const ArtistCard = (coverImg, avatarImg, artistName, studioName, tattooStyles) => {
    return (
        <div className="studio-card m-3">
            <Row>
                <Image src={coverImg} className="studio-card-img" />
            </Row>
            <div className="d-flex align-items-center mb-1">
                <Image src={avatarImg} className="studio-avatar-img" roundedCircle />
                <Col>
                    <Row className="font-60 ps-2">{artistName}</Row>
                    <Row className="font-45 ps-2">{studioName}</Row>
                </Col>
            </div>
            {
                tattooStyles ?
                <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                    {
                        tattooStyles.map(tattooStyle => <span className="tattoo-style-badge mx-1">{tattooStyle}</span>)
                    }
                </div>
                : null
            }
        </div>
    );
}

export default ArtistCard;