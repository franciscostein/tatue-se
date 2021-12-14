import { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatDateToTime } from '../../../utils/datetime';

const BusinessHours = ({ businessHours: { sunday, monday, tuesday, wednesday, thursday, friday, saturday }}) => {
    return (
        <Fragment>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Sunday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { sunday.isOpen ? `${formatDateToTime(sunday.opens)} - ${formatDateToTime(sunday.closes)}` : 'Closed' }
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Monday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { monday.isOpen ? `${formatDateToTime(monday.opens)} - ${formatDateToTime(monday.closes)}` : 'Closed' }
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Tuesday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { tuesday.isOpen ? `${formatDateToTime(tuesday.opens)} - ${formatDateToTime(tuesday.closes)}` : 'Closed' }
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Wednesday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { wednesday.isOpen ? `${formatDateToTime(wednesday.opens)} - ${formatDateToTime(wednesday.closes)}` : 'Closed' }
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Thursday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { thursday.isOpen ? `${formatDateToTime(thursday.opens)} - ${formatDateToTime(thursday.closes)}` : 'Closed' }
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Friday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { friday.isOpen ? `${formatDateToTime(friday.opens)} - ${formatDateToTime(friday.closes)}` : 'Closed' }
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className="d-flex justify-content-start font-65">Saturday</Col>
                <Col md="auto" className="d-flex justify-content-end font-65">
                    { saturday.isOpen ? `${formatDateToTime(saturday.opens)} - ${formatDateToTime(saturday.closes)}` : 'Closed' }
                </Col>
            </Row>
        </Fragment>
    );
}

export default BusinessHours;