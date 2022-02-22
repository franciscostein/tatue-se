import './Artists.css';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlacesAutoComplete from 'react-google-autocomplete';

import { fetchArtists } from '../../actions/artist';
import { findLocation } from '../../utils/location';
import ArtistCard from './fragments/ArtistCard';
import TattooStyles from '../tattooStyles/TattooStyles';

import Form from 'react-bootstrap/Form';

const searchText = 'Find your next tattoo artist.';

const Artists = ({ artist: { artists }, fetchArtists, history }) => {
	const [selectedIds, setSelectedIds] = useState([]);
	const [filteredArtists, setFilteredArtists] = useState([]);
	const [filteredArtistsByRegion, setFilteredArtistsByRegion] = useState([]);
	const [location, setLocation] = useState('');
	const [searchedText, setSearchedLocation] = useState(searchText);

	useEffect(() => {
		if (artists.length === 0) {
			fetchArtists('cardInfo');
		} else if (!location && filteredArtists.length === 0) {
			setFilteredArtists([...artists]);
			setFilteredArtistsByRegion([...artists]);
		}
	}, [artists, fetchArtists, location, filteredArtists.length]);

	const selectTattooStylesHandler = () => {
		console.log('artists', artists);
		console.log('filteredArtists', filteredArtists);
		console.log('filteredArtistsByRegion', filteredArtistsByRegion);

		if (selectedIds.length > 0) {
			const newArray = filteredArtistsByRegion.filter(artist =>
				artist.tattooStyles.some(
					tattooStyle => selectedIds.indexOf(tattooStyle._id) >= 0
				)
			);
			setFilteredArtists([...newArray]);
		} else {
			if (filteredArtistsByRegion) {
				setFilteredArtists([...filteredArtistsByRegion]);
			} else {
				setFilteredArtists([...artists]);
			}
		}
	};

	const selectPlaceHandler = place => {
		const { address_components } = place;
		const { city, region, country } = findLocation(address_components);

		setSearchedLocation(
			`Tattoo artists in ${city}, ${region} - ${country}`
		);
		const filteredByLocation = artists.filter(
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
		setFilteredArtists([...filteredByLocation]);
		setFilteredArtistsByRegion([...filteredByLocation]);
	};

	const cleanSearchHandler = () => {
		setLocation('');
		setSearchedLocation(searchText);
	};

	return (
		<div>
			<div className="search-header">
				<h1 className="mt-5">Artists</h1>
				<p className="font-70 secondary-color">{searchedText}</p>
				<Form.Group controlId="formArtistLocation" className="d-flex">
					<PlacesAutoComplete
						className="places-autocomplete"
						placeholder="In which city?"
						apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
						options={{ types: ['(cities)'] }}
						value={location}
						onChange={e => setLocation(e.target.value)}
						onPlaceSelected={selectPlaceHandler}
					/>
					{location && (
						<span
							className="clickable ps-2"
							onClick={cleanSearchHandler}
						>
							X
						</span>
					)}
				</Form.Group>

				<div className="tattoo-styles-header">
					<TattooStyles
						selectedTattooStylesIds={selectedIds}
						onSelect={selectTattooStylesHandler}
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
