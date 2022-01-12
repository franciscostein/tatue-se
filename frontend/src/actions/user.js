import axios from 'axios';

import {
    SAVE_USER_SUCCESS,
    SAVE_USER_FAIL,
    SAVE_PICTURE_SUCCESS,
    SAVE_PICTURE_FAIL,
    FETCH_USER_INFO,
    FETCH_USER_PICTURE
} from './types';

import { setAuthToken } from '../utils/authToken';
import { setAlertTimeout } from './alert';

export const saveUser = userData => async dispatch => {
    try {
        const { data } = await axios.post('/api/users', userData);

        dispatch({
            type: SAVE_USER_SUCCESS,
            payload: data
        });

        if (data.token) {
            setAuthToken(data.token);
        }
    } catch (error) {
        dispatch({
            type: SAVE_USER_FAIL,
            payload: error.message
        });
    }
}

export const savePicture = base64 => async dispatch => {
    try {
        const { data } = await axios.patch('/api/users/profile-picture', { base64 });

        dispatch({
            type: SAVE_PICTURE_SUCCESS,
            payload: data
        });
        dispatch(setAlertTimeout('Picture saved!', 'success'));
    } catch (error) {
        dispatch({
            type: SAVE_PICTURE_FAIL,
            payload: { msg: 'There was an error saving the picture, please try again.' }
        });
    }
}

export const fetchUserInfo = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/users/info');

        dispatch({
            type: FETCH_USER_INFO,
            payload: data
        });
    } catch (error) {
        console.error(error);
    }
}

export const fetchUserPicture = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/users/profile-picture');

        dispatch({
            type: FETCH_USER_PICTURE,
            payload: data.profilePicture
        });
    } catch (error) {
        console.error(error);
    }
}