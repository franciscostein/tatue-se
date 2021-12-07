import { combineReducers } from 'redux';
import artist from './artist';
import tattooStyles from './tattooStyles';
import user from './user';
import studio from './studio';

export default combineReducers({
    artist,
    tattooStyles,
    user,
    studio
});