import axios from 'axios';
import { setAlert } from './alert';

import {
    FETCH_ARTISTS,
    FETCH_ARTISTS_ERROR,
    GET_ARTIST_PROFILE,
    SAVE_ARTIST_PROFILE,
    ARTIST_PROFILE_ERROR,
    RESET_ARTISTS,
    SAVE_ARTIST_IMAGE,
    SAVE_ARTIST_IMAGE_ERROR
} from './types';

import { setAlertTimeout } from './alert';

export const fetchArtists = (filter, customHeaders = {}) => async dispatch => {
    try {
        const url = filter ? `/api/artists?filter=${filter}` : '/api/artists';
        const { data } = await axios.get(url, { headers: customHeaders });

        dispatch({
            type: FETCH_ARTISTS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FETCH_ARTISTS_ERROR,
            payload: {
                msg: error.response.statusText
            }
        });
    }
}

export const fetchArtistProfile = artistId => async dispatch => {
    try {
        const url = artistId ? `/api/artists/${artistId}` : '/api/artists/profile/me';
        const res = await axios.get(url);

        dispatch({
            type: GET_ARTIST_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ARTIST_PROFILE_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        });
    }
}

// create or update profile
export const saveProfile = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/artists', formData);

        dispatch({
            type: SAVE_ARTIST_PROFILE,
            payload: res.data
        });

        dispatch(setAlertTimeout('Profile saved!'));
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlertTimeout(err.msg, 'danger')));
        }

        dispatch({
            type: ARTIST_PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const saveProfileImage = image64 => async dispatch => {
    try {
        const { data } = await axios.post('/api/artists/image', { image64 });

        dispatch({
            type: SAVE_ARTIST_IMAGE,
            payload: data
        });
        dispatch(setAlertTimeout('Image saved!'));
    } catch (error) {
        dispatch({
            type: SAVE_ARTIST_IMAGE_ERROR
        });
        dispatch(setAlertTimeout('There was an error saving image, please try again.', 'danger'));
    }
}

export const resetArtists = () => dispatch => {
    dispatch({
        type: RESET_ARTISTS
    });
}