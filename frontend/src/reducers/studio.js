/* eslint-disable import/no-anonymous-default-export */
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
} from '../actions/types';

const initialState = {
	studios: [],
	studio: null,
	profile: null,
	error: false,
	loading: false,
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
			return {
				...state,
				studio: payload,
				error: false,
			};
		case FETCH_STUDIO_PROFILE:
		case SAVE_STUDIO_SUCCESS:
		case DELETE_STUDIO:
			return {
				...state,
				profile: payload,
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
				loading: false,
			};
		case STUDIO_ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		case LOADING:
			return {
				...state,
				error: false,
				loading: true,
			};
		default:
			return state;
	}
}
