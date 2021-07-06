import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Artists = () => {
    return (
        <div>
            <h1>Artists</h1>
            <p style={{ fontSize: '70%', color: 'gray' }}>Find your next tattoo artist.</p>
            <Row className="justify-content-md-center my-4">
                <Col md={{ span: 6 }}>
                    <Form.Group controlId="formArtistLocation">
                        <Form.Control type="text" placeholder="In which city?" />
                    </Form.Group>
                </Col>
            </Row>
            <hr />
        </div>
    );
}

export default Artists;