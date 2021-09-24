/* eslint-disable import/no-anonymous-default-export */
import {
    GET_TATTOO_STYLES,
    TATTOO_STYLES_ERROR
} from '../actions/types';

const initialState = {
    tattooStyles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TATTOO_STYLES:
            return {
                ...state,
                tattooStyles: payload,
                loading: false
            }
        case TATTOO_STYLES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                tattooStyles: null
            }
        default:
            return state;
    }
}