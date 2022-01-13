import axios from 'axios';

import {
    FETCH_STUDIOS,
    FETCH_STUDIO
} from './types';

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
        const res = await axios.get(`/api/studios/${studioId}`);

        dispatch({
            type: FETCH_STUDIO,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
}