import { combineReducers } from 'redux';
import artist from './artist';
import tattooStyles from './tattooStyles';

export default combineReducers({
    artist,
    tattooStyles
});