import { Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ text = 'Loading...' }) => {
	return (
		<Fragment>
			<h3>{text}</h3>
			<Spinner animation="border" className="ms-3" />
		</Fragment>
	);
};

export default Loading;
