/* eslint-disable import/no-anonymous-default-export */
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
} from '../actions/types';

const initialState = {
	studios: [],
	studio: null,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_STUDIOS:
			return {
				...state,
				studios: payload,
				error: false,
			};
		case FETCH_STUDIO:
		case SAVE_STUDIO_SUCCESS:
			return {
				...state,
				studio: payload,
				error: false,
			};
		case SAVE_LOGO_SUCCESS:
			return {
				...state,
				studio: {
					logo: payload,
				},
				error: false,
			};
		case SAVE_COVER_SUCCESS:
			return {
				...state,
				studio: {
					cover: payload,
				},
				error: false,
			};
		case SAVE_PHOTOS_SUCCESS:
			return {
				...state,
				studio: {
					photos: payload,
				},
				error: false,
			};
		case SAVE_STUDIO_FAIL:
		case SAVE_IMAGE_FAIL:
		case SAVE_PHOTOS_FAIL:
		case STUDIO_ERROR:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
}
