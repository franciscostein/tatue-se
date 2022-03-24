import axios from 'axios';

import {
	FETCH_ARTISTS,
	FETCH_ARTIST,
	FETCH_ARTIST_PROFILE,
	SAVE_ARTIST_PROFILE,
	SAVE_ARTIST_IMAGE,
	SAVE_ARTIST_COVER,
	SAVE_ARTIST_PORTFOLIO,
	DELETE_ARTIST,
	ARTIST_ERROR,
	LOADING,
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
				type: ARTIST_ERROR,
			});
			dispatch(setAlertTimeout(error.message, 'danger'));
		}
	};

export const fetchArtist = artistId => async dispatch => {
	try {
		const url = artistId
			? `/api/artists/${artistId}`
			: '/api/artists/profile/me';
		const res = await axios.get(url);

		dispatch({
			type: artistId ? FETCH_ARTIST : FETCH_ARTIST_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: ARTIST_ERROR,
		});
	}
};

export const saveProfile = artist => async dispatch => {
	try {
		const { data } = await axios.post('/api/artists', artist);

		dispatch({
			type: SAVE_ARTIST_PROFILE,
			payload: data,
		});
		dispatch(setAlertTimeout('Profile saved!'));
		dispatch(fetchArtists('card_info'));
	} catch (error) {
		dispatch({
			type: ARTIST_ERROR,
		});
		dispatch(
			setAlertTimeout(
				'There was an error saving, please try again.',
				'danger'
			)
		);
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
		const imageType = type === 'cover' ? 'Cover' : 'Profile image';
		dispatch(setAlertTimeout(`${imageType} saved!`));
		dispatch(fetchArtists('card_info'));
	} catch (error) {
		dispatch({
			type: ARTIST_ERROR,
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
		dispatch({
			type: LOADING,
		});

		const { data } = await axios.patch('/api/artists/images', images);

		dispatch({
			type: SAVE_ARTIST_PORTFOLIO,
			payload: data,
		});
		dispatch(setAlertTimeout('Photos saved!'));
		dispatch(fetchArtists('card_info'));
	} catch (error) {
		dispatch({
			type: ARTIST_ERROR,
		});
		dispatch(
			setAlertTimeout(`Couldn't save photos, please try again.`, 'danger')
		);
	}
};

export const deleteArtist = history => async dispatch => {
	try {
		const { data } = await axios.delete('/api/artists');

		dispatch({
			type: DELETE_ARTIST,
			payload: data,
		});
		dispatch(setAlertTimeout('Profile delete!'));
		dispatch(fetchArtists('card_info'));

		setTimeout(() => {
			history.push('/');
		}, [1500]);
	} catch (error) {
		dispatch({
			type: ARTIST_ERROR,
		});
		dispatch(
			setAlertTimeout(
				'There was an error deleting it, please try again.',
				'danger'
			)
		);
	}
};
