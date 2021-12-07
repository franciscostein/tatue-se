import axios from 'axios';

import {
    FETCH_STUDIOS
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