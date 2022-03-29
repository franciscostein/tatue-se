import './BusinessHour.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from 'react-switch';
import Form from 'react-bootstrap/Form';

const BusinessHour = ({
	weekday,
	day: { isOpen, opens, closes },
	setChecked,
	onChangeOpen,
	onChangeClose,
}) => {
	return (
		<Row>
			<Col className="d-flex justify-content-start font-75">
				{weekday}
			</Col>
			<Col xs lg="2" className="form-check form-switch">
				<Switch checked={isOpen} onChange={() => setChecked(!isOpen)} />
			</Col>
			<Col md="auto" className="d-flex justify-content-end font-75">
				{isOpen ? (
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
				) : (
					<span className="closed">Closed</span>
				)}
			</Col>
		</Row>
	);
};

export default BusinessHour;
