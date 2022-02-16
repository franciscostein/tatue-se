import axios from 'axios';

import {
    SAVE_USER_SUCCESS,
    SAVE_USER_FAIL,
    SAVE_PICTURE_SUCCESS,
    FETCH_USER_INFO,
    FETCH_USER_PICTURE,
    USER_ERROR
} from './types';

import { setAuthToken } from '../utils/authToken';
import { setAlertTimeout } from './alert';

export const saveUser = (userData, history) => async dispatch => {
    try {
        const { data } = await axios.post('/api/users', userData);

        dispatch({
            type: SAVE_USER_SUCCESS,
            payload: data
        });

        if (data.token) {
            setAuthToken(data.token);
            history.push('/');
        }
    } catch (error) {
        dispatch({
            type: SAVE_USER_FAIL
        });
        dispatch(setAlertTimeout(error.message, 'danger'));
    }
}

export const savePicture = base64 => async dispatch => {
    try {
        const { data } = await axios.patch('/api/users/profile-picture', { base64 });

        dispatch({
            type: SAVE_PICTURE_SUCCESS,
            payload: data
        });
        dispatch(setAlertTimeout('Picture saved!'));
    } catch (error) {
        dispatch({
            type: USER_ERROR
        });
        dispatch(setAlertTimeout('There was an error saving the picture, please try again.', 'danger'));
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
        dispatch({
            type: USER_ERROR
        });
        dispatch(setAlertTimeout(error.message, 'danger'));
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
        dispatch({
            type: USER_ERROR
        });
        dispatch(setAlertTimeout(error.message, 'danger'));
    }
}