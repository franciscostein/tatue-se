import axios from 'axios';

import {
    FETCH_STUDIOS,
    FETCH_STUDIO
} from './types';

export const fetchStudios = () => async dispatch => {
    try {
        const res = await axios.get('/api/studios');
    
        dispatch({
            type: FETCH_STUDIOS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
}

export const fetchStudio = studioId => async dispatch => {
    try {
        const res = await axios.get(`/api/studios/${studioId}`);

        dispatch({
            type: FETCH_STUDIO,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
}