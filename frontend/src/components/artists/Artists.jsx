import './Artists.css';

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchArtists } from '../../actions/artist';

import Form from 'react-bootstrap/Form';
import ArtistCard from './fragments/ArtistCard';
import TattooStyles from '../tattooStyles/TattooStyles';

const Artists = ({ artist: { artists }, fetchArtists, history }) => {
	const [selectedIds, setSelectedIds] = useState([]);
	const [filteredArtists, setFilteredArtists] = useState([]);

	useEffect(() => {
		if (artists.length === 0) {
			fetchArtists('cardInfo');
		} else {
			setFilteredArtists([...artists]);
		}
	}, [artists, fetchArtists]);

	const selectTattooStylesHandler = () => {
		if (selectedIds.length > 0) {
			const newArray = artists.filter(artist =>
				artist.tattooStyles.some(
					tattooStyle => selectedIds.indexOf(tattooStyle._id) >= 0
				)
			);
			setFilteredArtists([...newArray]);
		} else {
			setFilteredArtists([...artists]);
		}
	};

	return (
		<div>
			<div className="search-header">
				<h1 className="mt-5">Artists</h1>
				<p className="font-70 secondary-color">
					Find your next tattoo artist.
				</p>
				<Form.Group controlId="formArtistLocation">
					<Form.Control type="text" placeholder="In which city?" />
				</Form.Group>

				<div className="tattoo-styles-header">
					<TattooStyles
						selectedTattooStylesIds={selectedIds}
						onSelect={selectTattooStylesHandler}
					/>
				</div>
				{/* <button onClick={selectTattooStylesHandler}>log</button> */}
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
