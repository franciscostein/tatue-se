import axios from 'axios';

import {
	FETCH_STUDIOS,
	FETCH_STUDIO,
	SAVE_STUDIO_SUCCESS,
	SAVE_STUDIO_FAIL,
	SAVE_LOGO_SUCCESS,
	SAVE_COVER_SUCCESS,
	SAVE_IMAGE_FAIL,
	SAVE_PHOTOS_SUCCESS,
	SAVE_PHOTOS_FAIL,
	STUDIO_ERROR,
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
			type: FETCH_STUDIO,
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
	} catch (error) {
		dispatch({
			type: SAVE_STUDIO_FAIL,
		});
		dispatch(
			setAlertTimeout('There was an error, please try again.', 'danger')
		);
	}
};

export const saveStudioImage = (base64, type) => async dispatch => {
	try {
		const { data } = await axios.post('/api/studios/image', {
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
	} catch (error) {
		dispatch({
			type: SAVE_IMAGE_FAIL,
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
		const { data } = await axios.post('/api/studios/images', images);

		dispatch({
			type: SAVE_PHOTOS_SUCCESS,
			payload: data,
		});
		dispatch(setAlertTimeout('Photos saved!'));
	} catch (error) {
		dispatch({
			type: SAVE_PHOTOS_FAIL,
		});
		dispatch(
			setAlertTimeout(`Couldn't save photos, please try again.`, 'danger')
		);
	}
};
