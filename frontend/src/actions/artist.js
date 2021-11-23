import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_ARTIST_PROFILE,
    ARTIST_PROFILE_ERROR
} from './types';

export const fetchArtistProfile = artistId => async dispatch => {
    try {
        const url = artistId ? `/api/artists/${artistId}` : '/api/artists/profile/me';
        const res = await axios.get(url);

        console.log('fetchArtistProfile');

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
export const saveProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const res = await axios.post('/api/artists', formData);

        dispatch({
            type: GET_ARTIST_PROFILE,
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

// const reader = new FileReader();
// reader.readAsDataURL(selectedFile);
// reader.onloadend = () => {
//     const result = reader.result;
//     uploadImage(result);
// }
// reader.onerror = () => {
//     console.error('something went very wrong indeed!');
// }

const uploadImage = async base64EncodedImage => {
    try {
        const res = await axios.post('/api/artists/image/upload', { base: base64EncodedImage });
        
        // setFileInputState('');
        // setPreviewSource(null);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}