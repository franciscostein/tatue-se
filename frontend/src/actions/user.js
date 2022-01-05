import axios from 'axios';

import {
    SAVE_USER_SUCCESS,
    SAVE_USER_FAIL,
    SAVE_PICTURE_SUCCESS,
    SAVE_PICTURE_FAIL,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    FETCH_USER_INFO
} from './types';

import { setAuthToken } from '../utils/authToken';

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
    } catch (error) {
        dispatch({
            type: SAVE_PICTURE_FAIL,
            payload: { msg: 'There was an error saving the picture, please try again.' }
        });
    }
}

export const authenticate = login => async dispatch => {
    try {
        const { data } = await axios.post('/api/auth', login);

        if (data.token) {
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: data
            });

            setAuthToken(data.token);
            
            dispatch(fetchUserInfo());
        } else {
            dispatch({
                type: SIGNIN_FAIL,
                payload: data
            });
        }
    } catch (err) {
        dispatch({
            type: SIGNIN_FAIL,
            payload: {
                msg: 'E-mail or password incorrect.'
            }
        });
    }
}

export const fetchUserInfo = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/info');

        dispatch({
            type: FETCH_USER_INFO,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
}