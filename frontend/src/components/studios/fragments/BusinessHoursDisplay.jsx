import { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatTime } from '../../../utils/datetime';

const BusinessHoursDisplay = ({
	businessHours: {
		sunday,
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		saturday,
	},
}) => {
	return (
		<Fragment>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Sunday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{sunday.isOpen
						? `${formatTime(sunday.opens)} - ${formatTime(
								sunday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Monday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{monday.isOpen
						? `${formatTime(monday.opens)} - ${formatTime(
								monday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Tuesday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{tuesday.isOpen
						? `${formatTime(tuesday.opens)} - ${formatTime(
								tuesday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Wednesday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{wednesday.isOpen
						? `${formatTime(wednesday.opens)} - ${formatTime(
								wednesday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Thursday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{thursday.isOpen
						? `${formatTime(thursday.opens)} - ${formatTime(
								thursday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Friday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{friday.isOpen
						? `${formatTime(friday.opens)} - ${formatTime(
								friday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
			<Row className="mb-1">
				<Col className="d-flex justify-content-start font-65">
					Saturday
				</Col>
				<Col md="auto" className="d-flex justify-content-end font-65">
					{saturday.isOpen
						? `${formatTime(saturday.opens)} - ${formatTime(
								saturday.closes
						  )}`
						: 'Closed'}
				</Col>
			</Row>
		</Fragment>
	);
};

export default BusinessHoursDisplay;
