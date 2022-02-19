import axios from 'axios';

import {
	FETCH_ARTISTS,
	FETCH_ARTISTS_ERROR,
	GET_ARTIST_PROFILE,
	SAVE_ARTIST_PROFILE,
	ARTIST_PROFILE_ERROR,
	RESET_ARTISTS,
	SAVE_ARTIST_IMAGE,
	SAVE_ARTIST_COVER,
	SAVE_ARTIST_PORTFOLIO,
	SAVE_ARTIST_IMAGE_ERROR,
} from './types';

import { setAlertTimeout } from './alert';

export const fetchArtists =
	(filter, customHeaders = {}) =>
	async dispatch => {
		try {
			const url = filter
				? `/api/artists?filter=${filter}`
				: '/api/artists';
			const { data } = await axios.get(url, { headers: customHeaders });

			dispatch({
				type: FETCH_ARTISTS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_ARTISTS_ERROR,
			});
			dispatch(setAlertTimeout(error.message, 'danger'));
		}
	};

export const fetchArtistProfile = artistId => async dispatch => {
	try {
		const url = artistId
			? `/api/artists/${artistId}`
			: '/api/artists/profile/me';
		const res = await axios.get(url);

		dispatch({
			type: GET_ARTIST_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: ARTIST_PROFILE_ERROR,
		});
	}
};

export const saveProfile = formData => async dispatch => {
	try {
		const { data } = await axios.post('/api/artists', formData);

		dispatch({
			type: SAVE_ARTIST_PROFILE,
			payload: data,
		});
		dispatch(setAlertTimeout('Profile saved!'));
	} catch (error) {
		dispatch({
			type: ARTIST_PROFILE_ERROR,
		});
		dispatch(setAlertTimeout(error.message, 'danger'));
	}
};

export const saveArtistImage = (base64, type) => async dispatch => {
	try {
		const { data } = await axios.patch('/api/artists/image', {
			base64,
			type,
		});

		if (type === 'profilePicture') {
			dispatch({
				type: SAVE_ARTIST_IMAGE,
				payload: data.profilePicture,
			});
		} else if (type === 'cover') {
			dispatch({
				type: SAVE_ARTIST_COVER,
				payload: data.cover,
			});
		}
		dispatch(setAlertTimeout(`Image saved!`));
	} catch (error) {
		dispatch({
			type: SAVE_ARTIST_IMAGE_ERROR,
		});
		dispatch(
			setAlertTimeout(
				'There was an error saving image, please try again.',
				'danger'
			)
		);
	}
};

export const saveArtistPortfolio = images => async dispatch => {
	try {
		const { data } = await axios.patch('/api/artists/images', images);

		dispatch({
			type: SAVE_ARTIST_PORTFOLIO,
			payload: data,
		});
		dispatch(setAlertTimeout('Photos saved!'));
	} catch (error) {
		dispatch({
			type: SAVE_ARTIST_IMAGE_ERROR,
		});
		dispatch(
			setAlertTimeout(`Couldn't save photos, please try again.`, 'danger')
		);
	}
};

export const resetArtists = () => dispatch => {
	dispatch({
		type: RESET_ARTISTS,
	});
};
