import axios from 'axios';

import {
    SAVE_USER,
    AUTHENTICATE_USER
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
        console.log(err);
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
        console.log(err);
    }
}