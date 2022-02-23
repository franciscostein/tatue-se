import './Studios.css';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchStudios } from '../../actions/studio';
import { resetArtists } from '../../actions/artist';
import { findLocation } from '../../utils/location';
import LocationSearcher from '../fragments/LocationSearcher';
import StudioCard from './fragments/StudioCard';

const searchTitle = 'Find tattoo studios near you.';

const Studios = ({
	studio: { studios },
	fetchStudios,
	resetArtists,
	history,
}) => {
	const [filteredStudios, setFilteredStudios] = useState([]);
	const [location, setLocation] = useState('');
	const [searchedTitle, setSearchedTitle] = useState(searchTitle);

	useEffect(() => {
		if (studios.length === 0) {
			fetchStudios();
		} else if (!location) {
			setFilteredStudios([...studios]);
		}
	}, [studios, fetchStudios, location]);

	const selectPlaceHandler = place => {
		const { city, region, country } = findLocation(
			place.address_components
		);
		const filteredByLocation = studios.filter(
			studio =>
				studio.location.city === city &&
				studio.location.region === region &&
				studio.location.country === country
		);
		setSearchedTitle(
			`Find tattoo studios in ${city} - ${region}, ${country}`
		);
		setFilteredStudios([...filteredByLocation]);
	};

	const cleanSearchHandler = () => {
		setLocation('');
		setFilteredStudios([...studios]);
	};

	const handleStudioCardClick = studioId => {
		resetArtists();
		history.push(`/studios/${studioId}`);
	};

	return (
		<div className="full-content">
			<div className="search-header">
				<h1 className="mt-5">Studios</h1>
				<p className="font-70 secondary-color">{searchedTitle}</p>
				<LocationSearcher
					location={location}
					onChange={e => setLocation(e.target.value)}
					onPlaceSelected={selectPlaceHandler}
					onClean={cleanSearchHandler}
				/>
			</div>
			<hr />
			{filteredStudios && (
				<div className="d-flex flex-wrap justify-content-center mx-5">
					{filteredStudios.map(studio => (
						<StudioCard
							key={studio._id}
							studio={studio}
							onClick={() => handleStudioCardClick(studio._id)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

Studios.propTypes = {
	studio: PropTypes.object.isRequired,
	fetchStudios: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	studio: state.studio,
});

export default connect(mapStateToProps, { fetchStudios, resetArtists })(
	withRouter(Studios)
);
