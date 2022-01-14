import axios from 'axios';
import { setAlert } from './alert';

import {
    FETCH_ARTISTS,
    FETCH_ARTISTS_ERROR,
    GET_ARTIST_PROFILE,
    SAVE_ARTIST_PROFILE,
    ARTIST_PROFILE_ERROR
} from './types';

export const fetchArtists = (filter, customHeaders = {}) => async dispatch => {
    try {
        const url = filter ? `/api/artists?filter=${filter}` : '/api/artists';
        const { data } = await axios.get(url, { headers: customHeaders });

        console.log(customHeaders);

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
export const saveProfile = (formData, profilePictureBase64, history, edit = false) => async dispatch => {
    try {
        if (profilePictureBase64) {
            const cloudinaryResponse = axios.post('/api/artists/image/upload', { base64: profilePictureBase64 });
            formData.profilePicture.publicId = cloudinaryResponse.public_id;
        }

        const res = await axios.post('/api/artists', formData);

        dispatch({
            type: SAVE_ARTIST_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        if (!edit) {
            history.push('/');
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
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