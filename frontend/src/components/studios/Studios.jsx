import './Studios.css';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchStudios } from '../../actions/studio';
import { findLocation } from '../../utils/location';
import { isEmpty } from '../../utils/arrays';
import LocationSearcher from '../fragments/LocationSearcher';
import StudioCard from './fragments/StudioCard';

const searchTitle = 'Find tattoo studios near you.';

const Studios = ({ studio: { studios }, fetchStudios, history }) => {
	const [filteredStudios, setFilteredStudios] = useState([]);
	const [location, setLocation] = useState('');
	const [searchedTitle, setSearchedTitle] = useState(searchTitle);

	useEffect(() => {
		if (isEmpty(studios)) {
			fetchStudios('card_info');
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
		setFilteredStudios([...filteredByLocation]);
		setSearchedTitle(
			`Find tattoo studios in ${city} - ${region}, ${country}`
		);
	};

	const cleanSearchHandler = () => {
		setLocation('');
		setFilteredStudios([...studios]);
	};

	const handleStudioCardClick = studioId => {
		history.push(`/studios/${studioId}`);
	};

	return (
		<div className="full-content">
			<div className="search-header solid-bottom-border-secondary pb-4">
				<h1 className="mt-5">Studios</h1>
				<p className="font-70 secondary-color">{searchedTitle}</p>
				<LocationSearcher
					location={location}
					onChange={e => setLocation(e.target.value)}
					onPlaceSelected={selectPlaceHandler}
					onClean={cleanSearchHandler}
				/>
			</div>
			{filteredStudios && (
				<div className="d-flex flex-wrap justify-content-center mx-5 mt-3">
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

const mapStateToProps = state => ({
	studio: state.studio,
});

export default connect(mapStateToProps, { fetchStudios })(withRouter(Studios));
