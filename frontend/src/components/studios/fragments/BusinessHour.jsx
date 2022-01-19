import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from 'react-switch';
import Form from 'react-bootstrap/Form';

const BusinessHour = ({ weekday, checked, setChecked, opens, closes, onChangeOpen, onChangeClose }) => {
    return (
        <Row>
            <Col className="d-flex justify-content-start font-75">{weekday}</Col>
            <Col xs lg="2" className="form-check form-switch">
                <Switch checked={checked} onChange={() => setChecked(!checked)} />
            </Col>
            <Col md="auto" className="d-flex justify-content-end font-75">
                { checked ? (
                    <div className="d-flex">
                        <Form.Control 
                            type="time" 
                            className="m-1" 
                            value={opens}
                            onChange={onChangeOpen}
                        />
                        <Form.Control 
                            type="time" 
                            className="m-1" 
                            value={closes}
                            onChange={onChangeClose}
                        />
                    </div>
                ) : <span className="ms-5 ps-5">Closed</span> }
            </Col>
        </Row>
    );
}

export default BusinessHour;