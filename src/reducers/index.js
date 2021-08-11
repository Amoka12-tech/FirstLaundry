import { combineReducers } from 'redux';
import auth from './auth';
import location from './location';
import payment from './payment';

export default combineReducers({
    auth,
    location,
    payment,
});