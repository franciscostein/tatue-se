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
export const saveProfile = (formData, profilePictureBase64, history, edit = false) => async dispatch => {
    try {
        console.log('1');
        console.log('profilePictureBase64', profilePictureBase64);
        if (profilePictureBase64) {
            console.log('2');
            const reader = new FileReader();
            reader.readAsDataURL(profilePictureBase64);
            reader.onloadend = () => {
                const cloudinaryReturn = uploadImage(reader.result);
                formData.profilePicture.publicId = cloudinaryReturn.public_id;
            }
            reader.onerror = () => {
                console.error('something went very wrong indeed!');
            }
        }

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

const uploadImage = async base64EncodedImage => {
    try {
        const res = await axios.post('/api/artists/image/upload', { base: base64EncodedImage });
        
        return res;
    } catch (err) {
        console.error(err);
    }
}