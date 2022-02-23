import './Artists.css';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchArtists } from '../../actions/artist';
import { findLocation } from '../../utils/location';
import ArtistCard from './fragments/ArtistCard';
import TattooStyles from '../tattooStyles/TattooStyles';
import LocationSearcher from '../fragments/LocationSearcher';

const searchTitle = 'Find your next tattoo artist.';

const Artists = ({ artist: { artists }, fetchArtists, history }) => {
	const [location, setLocation] = useState('');
	const [searchedTitle, setSearchedTitle] = useState(searchTitle);
	const [filteredArtists, setFilteredArtists] = useState([]);
	const [selectedTattooStyleIds, setSelectedTattooStyleIds] = useState([]);

	useEffect(() => {
		if (artists.length === 0) {
			fetchArtists('card_info');
		} else if (!location && selectedTattooStyleIds.length === 0) {
			setFilteredArtists([...artists]);
		}

		if (selectedTattooStyleIds.length > 0) {
			filterByTattooStyles();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [artists, fetchArtists, location, selectedTattooStyleIds.length]);

	const selectPlaceHandler = place => {
		const { city, region, country } = findLocation(
			place.address_components
		);
		const filteredByLocation = filterByLocation(city, region, country);
		setSearchedTitle(`Tattoo artists in ${city} - ${region}, ${country}`);
		setFilteredArtists([...filteredByLocation]);
	};

	const cleanSearchHandler = () => {
		setLocation('');
		setSearchedTitle(searchTitle);

		if (selectedTattooStyleIds.length === 0) {
			setFilteredArtists([...artists]);
		} else {
			filterByTattooStyles();
		}
	};

	const filterByLocation = (city, region, country) => {
		return artists.filter(
			artist =>
				artist.workplaces.some(
					workplace => workplace.location.city === city
				) &&
				artist.workplaces.some(
					workplace => workplace.location.region === region
				) &&
				artist.workplaces.some(
					workplace => workplace.location.country === country
				)
		);
	};

	const filterByTattooStyles = () => {
		const filteredByTattooStyle = filteredArtists.filter(artist =>
			artist.tattooStyles.some(tattooStyle =>
				selectedTattooStyleIds.includes(tattooStyle._id)
			)
		);
		setFilteredArtists([...filteredByTattooStyle]);
	};

	return (
		<div>
			<div className="search-header">
				<h1 className="mt-5">Artists</h1>
				<p className="font-70 secondary-color">{searchedTitle}</p>
				<LocationSearcher
					location={location}
					onChange={e => setLocation(e.target.value)}
					onClean={cleanSearchHandler}
					onPlaceSelected={selectPlaceHandler}
				/>
				<div className="tattoo-styles-header">
					<TattooStyles
						selectedIds={selectedTattooStyleIds}
						onSelectedIds={setSelectedTattooStyleIds}
					/>
				</div>
			</div>
			<hr className="my-2" />
			{filteredArtists && (
				<div className="d-flex flex-wrap justify-content-center mx-5">
					{filteredArtists.map(artist => (
						<ArtistCard
							key={artist._id}
							artist={artist}
							onClick={() =>
								history.push(`/artists/${artist._id}`)
							}
						/>
					))}
				</div>
			)}
		</div>
	);
};

Artists.propTypes = {
	artist: PropTypes.object.isRequired,
	fetchArtists: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	artist: state.artist,
});

export default connect(mapStateToProps, { fetchArtists })(withRouter(Artists));
