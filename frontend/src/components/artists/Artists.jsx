import './Artists.css';
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchArtists } from '../../actions/artist';
import { findLocation } from '../../utils/location';
import { isEmpty, isNotEmpty, intersect } from '../../utils/arrays';
import ArtistCard from './fragments/ArtistCard';
import TattooStyles from '../tattooStyles/TattooStyles';
import LocationSearcher from '../fragments/LocationSearcher';

const searchTitle = 'Find your next tattoo artist.';

const Artists = ({ artist: { artists }, fetchArtists, history }) => {
	const [location, setLocation] = useState('');
	const [searchedTitle, setSearchedTitle] = useState(searchTitle);
	const [filteredArtists, setFilteredArtists] = useState([]);
	const [filteredByStyles, setFilteredByStyles] = useState([]);
	const [filteredByLocation, setFilteredByLocation] = useState([]);
	const [selectedTattooStyleIds, setSelectedTattooStyleIds] = useState([]);

	useEffect(() => {
		if (artists.length === 0) {
			fetchArtists('card_info');
		} else {
			filter();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [artists, filteredByLocation, filteredByStyles]);

	const filter = () => {
		if (!location && isEmpty(selectedTattooStyleIds)) {
			setFilteredArtists([...artists]);
		} else if (
			location &&
			isNotEmpty(selectedTattooStyleIds) &&
			isNotEmpty(filteredByLocation) &&
			isNotEmpty(filteredByStyles)
		) {
			const locationsAndStyles = intersect(
				filteredByLocation,
				filteredByStyles
			);
			setFilteredArtists([...locationsAndStyles]);
		} else if (
			location &&
			isEmpty(selectedTattooStyleIds) &&
			isNotEmpty(filteredByLocation) &&
			isEmpty(filteredByStyles)
		) {
			setFilteredArtists([...filteredByLocation]);
		} else if (
			!location &&
			isNotEmpty(selectedTattooStyleIds) &&
			isEmpty(filteredByLocation) &&
			isNotEmpty(filteredByStyles)
		) {
			setFilteredArtists([...filteredByStyles]);
		} else {
			setFilteredArtists([]);
		}
	};

	const selectPlaceHandler = place => {
		const { city, region, country } = findLocation(
			place.address_components
		);
		const filteredByLocation = filterByLocation(city, region, country);
		setFilteredByLocation([...filteredByLocation]);
		setSearchedTitle(`Tattoo artists in ${city} - ${region}, ${country}`);
	};

	const cleanSearchHandler = () => {
		setLocation('');
		setFilteredByLocation([]);
		setSearchedTitle(searchTitle);
	};

	const tattooStylesClickedHandler = ids => {
		setSelectedTattooStyleIds(ids);
		filterByTattooStyles(ids);
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

	const filterByTattooStyles = ids => {
		const filteredByTattooStyle = artists.filter(artist =>
			artist.tattooStyles.some(tattooStyle =>
				ids.includes(tattooStyle._id)
			)
		);
		setFilteredByStyles([...filteredByTattooStyle]);
	};

	return (
		<Fragment>
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
						onSelectedIds={tattooStylesClickedHandler}
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
		</Fragment>
	);
};

const mapStateToProps = state => ({
	artist: state.artist,
});

export default connect(mapStateToProps, { fetchArtists })(withRouter(Artists));
