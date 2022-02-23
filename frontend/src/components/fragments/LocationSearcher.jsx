import PlacesAutoComplete from 'react-google-autocomplete';

import Form from 'react-bootstrap/Form';
import { FaTimes } from 'react-icons/fa';

const LocationSearcher = ({ location, onChange, onPlaceSelected, onClean }) => {
	return (
		<Form.Group controlId="location-searcher" className="d-flex">
			<PlacesAutoComplete
				className="places-autocomplete"
				placeholder="In which city?"
				apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
				options={{ types: ['(cities)'] }}
				value={location}
				onChange={onChange}
				onPlaceSelected={onPlaceSelected}
			/>
			{location && (
				<span
					className="clickable ps-1 d-flex  align-items-center"
					onClick={onClean}
				>
					<FaTimes />
				</span>
			)}
		</Form.Group>
	);
};

export default LocationSearcher;
