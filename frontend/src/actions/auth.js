import axios from "axios";
import { setAuthToken } from "../utils/authToken"

import {
    RESET_PASSWORD_EMAIL_SUCCESS,
    RESET_PASSWORD_EMAIL_FAIL
} from './types';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    // try {
    //     const res = await axios.post('/api/auth');
    // } catch (err) {
        
    // }
}

export const sendForgotPasswordEmail = email => async dispatch => {
    try {
        const response = await axios.post('api/auth/forgot-password', { email });

        console.log('sendForgotPasswordEmail', response);

        switch (response.status) {
            case 200:
                dispatch({
                    type: RESET_PASSWORD_EMAIL_SUCCESS,
                    payload: response.data
                });
                break;
            case 404:
                dispatch({
                    type: RESET_PASSWORD_EMAIL_FAIL,
                    payload: response.data
                });
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error.message);
        dispatch({
            type: RESET_PASSWORD_EMAIL_FAIL,
            payload: { msg: 'E-mail could not be sent. Please review your e-mail address and try again.' }
        })
    }
}