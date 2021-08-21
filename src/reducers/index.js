import { combineReducers } from 'redux';
import auth from './auth';
import location from './location';
import payment from './payment';
import orders from './order';
import notifications from './notifications';

export default combineReducers({
    auth,
    location,
    payment,
    orders,
    notifications,
});