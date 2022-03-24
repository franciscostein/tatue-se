import axios from 'axios';

import {
	FETCH_STUDIOS,
	FETCH_STUDIO,
	FETCH_STUDIO_PROFILE,
	SAVE_STUDIO_SUCCESS,
	SAVE_LOGO_SUCCESS,
	SAVE_COVER_SUCCESS,
	SAVE_PHOTOS_SUCCESS,
	DELETE_STUDIO,
	STUDIO_ERROR,
	LOADING,
} from './types';

import { setAlertTimeout } from './alert';
import { capitalizeFirstLetter } from '../utils/text';

export const fetchStudios = search => async dispatch => {
	try {
		const url = search ? `/api/studios?search=${search}` : '/api/studios';
		const { data } = await axios.get(url);

		dispatch({
			type: FETCH_STUDIOS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: STUDIO_ERROR,
		});
	}
};

export const fetchStudio = studioId => async dispatch => {
	try {
		const url = studioId
			? `/api/studios/${studioId}`
			: 'api/studios/profile/me';
		const { data } = await axios.get(url);

		dispatch({
			type: studioId ? FETCH_STUDIO : FETCH_STUDIO_PROFILE,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: STUDIO_ERROR,
		});
	}
};

export const saveStudio = studio => async dispatch => {
	try {
		const { data } = await axios.post('/api/studios', studio);

		dispatch({
			type: SAVE_STUDIO_SUCCESS,
			payload: data,
		});
		dispatch(setAlertTimeout('Studio profile saved!'));
		dispatch(fetchStudios('card_info'));
	} catch (error) {
		dispatch({
			type: STUDIO_ERROR,
		});
		dispatch(
			setAlertTimeout('There was an error, please try again.', 'danger')
		);
	}
};

export const saveStudioImage = (base64, type) => async dispatch => {
	try {
		const { data } = await axios.patch('/api/studios/image', {
			base64,
			type,
		});

		if (type === 'logo') {
			dispatch({
				type: SAVE_LOGO_SUCCESS,
				payload: data.logo,
			});
		} else if (type === 'cover') {
			dispatch({
				type: SAVE_COVER_SUCCESS,
				payload: data.cover,
			});
		}
		dispatch(setAlertTimeout(`${capitalizeFirstLetter(type)} saved!`));
		dispatch(fetchStudios('card_info'));
	} catch (error) {
		dispatch({
			type: STUDIO_ERROR,
		});
		dispatch(
			setAlertTimeout(
				`Couldn't save ${type}, please try again.`,
				'danger'
			)
		);
	}
};

export const saveStudioImages = images => async dispatch => {
	try {
		dispatch({
			type: LOADING,
		});

		const { data } = await axios.patch('/api/studios/images', images);

		dispatch({
			type: SAVE_PHOTOS_SUCCESS,
			payload: data,
		});
		dispatch(setAlertTimeout('Photos saved!'));
		dispatch(fetchStudios('card_info'));
	} catch (error) {
		dispatch({
			type: STUDIO_ERROR,
		});
		dispatch(
			setAlertTimeout(`Couldn't save photos, please try again.`, 'danger')
		);
	}
};

export const deleteStudio = history => async dispatch => {
	try {
		const { data } = await axios.delete('/api/studios');

		dispatch({
			type: DELETE_STUDIO,
			payload: data,
		});
		dispatch(setAlertTimeout('Studio profile deleted!'));
		dispatch(fetchStudios('card_info'));

		setTimeout(() => {
			history.push('/');
		}, [1500]);
	} catch (error) {
		dispatch({
			type: STUDIO_ERROR,
		});
		dispatch(
			setAlertTimeout('There was an error, please try again.', 'danger')
		);
	}
};
