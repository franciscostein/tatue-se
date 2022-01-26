import axios from 'axios';

import {
    FETCH_STUDIOS,
    FETCH_STUDIO,
    SAVE_STUDIO_SUCCESS,
    SAVE_STUDIO_FAIL,
    SAVE_LOGO_SUCCESS,
    SAVE_LOGO_FAIL
} from './types';

import { setAlertTimeout } from './alert';

export const fetchStudios = search => async dispatch => {
    try {
        const url = search ? `/api/studios?search=${search}` : '/api/studios';
        const { data } = await axios.get(url);
    
        dispatch({
            type: FETCH_STUDIOS,
            payload: data
        });
    } catch (error) {
        console.error(error);
    }
}

export const fetchStudio = studioId => async dispatch => {
    try {
        const url = studioId ? `/api/studios/${studioId}` : 'api/studios/profile/me';
        const { data } = await axios.get(url);

        dispatch({
            type: FETCH_STUDIO,
            payload: data
        });
    } catch (error) {
        console.error(error);
    }
}

export const saveStudio = studio => async dispatch => {
    try {
        const { data } = await axios.post('/api/studios', studio);

        dispatch({
            type: SAVE_STUDIO_SUCCESS,
            payload: data
        });
        dispatch(setAlertTimeout('Studio profile saved!'));
    } catch (error) {
        dispatch({
            type: SAVE_STUDIO_FAIL
        });
        dispatch(setAlertTimeout('There was an error, please try again.', 'danger'));
    }
}

export const saveStudioLogo = base64 => async dispatch => {
    try {
        const { data } = await axios.post('/api/studios/logo', { base64 });

        dispatch({
            type: SAVE_LOGO_SUCCESS,
            payload: data.studioLogo
        });
        dispatch(setAlertTimeout('Logo saved!'));
    } catch (error) {
        dispatch({
            type: SAVE_LOGO_FAIL
        });
        dispatch(setAlertTimeout(`Couldn't save logo, please try again.`, 'danger'))
    }
}