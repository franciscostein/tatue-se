import axios from 'axios';

import {
    SAVE_USER,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    FETCH_USER_INFO
} from './types';

import { setAuthToken } from '../utils/authToken';

export const saveUser = (userData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/users', userData);

        dispatch({
            type: SAVE_USER,
            payload: res.data
        });

        if (res.data.token) {
            setAuthToken(res.data.token);
        }

        history.push('/');
    } catch (err) {
        console.error(err);
    }
}

export const authenticate = login => async dispatch => {
    try {
        const res = await axios.post('/api/auth', login);

        if (res.data.token) {
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: res.data
            });

            setAuthToken(res.data.token);
            
            dispatch(fetchUserInfo());
        } else {
            dispatch({
                type: SIGNIN_FAIL,
                payload: res.data
            });
        }
    } catch (err) {
        console.error('err', err);

        dispatch({
            type: SIGNIN_FAIL,
            payload: err
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