import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import avatar from '../../../assets/user_w.png';

const Artist = () => {
    return (
        <Container>
            <div>
                <div className="d-flex align-items-center mb-1">
                    <Image src={avatar} style={{ margin: '10px 25px 10px 0', height: '35px', width: '35px' }} roundedCircle />
                    <Col>
                        <Row style={{ fontSize: '60%' }}>Tattoist 1</Row>
                        <Row style={{ fontSize: '45%' }}>Tattoo Studio</Row>
                    </Col>
                </div>
            </div>
        </Container>
    );
}

export default Artist;