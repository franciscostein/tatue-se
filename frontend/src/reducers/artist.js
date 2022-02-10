/* eslint-disable import/no-anonymous-default-export */
import {
    FETCH_ARTISTS,
    FETCH_ARTISTS_ERROR,
    GET_ARTIST_PROFILE,
    SAVE_ARTIST_PROFILE,
    ARTIST_PROFILE_ERROR,
    RESET_ARTISTS,
    SAVE_ARTIST_IMAGE,
    SAVE_ARTIST_COVER,
    SAVE_ARTIST_IMAGE_ERROR
} from '../actions/types';

const initialState = {
    artists: [],
    profile: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ARTISTS:
            return {
                ...state,
                artists: payload
            }
        case GET_ARTIST_PROFILE:
        case SAVE_ARTIST_PROFILE:
            return {
                ...state,
				profile: payload,
                loading: false
            }
        case SAVE_ARTIST_IMAGE:
            return {
                ...state,
                profile: {
                    profilePicture: payload
                }
            }
        case SAVE_ARTIST_COVER:
            return {
                ...state,
                profile: {
                    cover: payload
                }
            }
        case ARTIST_PROFILE_ERROR:
        case FETCH_ARTISTS_ERROR:
        case SAVE_ARTIST_IMAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case RESET_ARTISTS:
            return {
                ...state,
                artists: []
            }
        default:
            return state;
    }
}