import axios from 'axios';

import {
    SAVE_USER,
    AUTHENTICATE_USER,
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

export const authenticate = (login, history) => async dispatch => {
    try {
        const res = await axios.post('/api/auth', login);

        dispatch({
            type: AUTHENTICATE_USER,
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

export const fetchUserInfo = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/info');

        console.log(res.data);

        dispatch({
            type: FETCH_USER_INFO,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
}