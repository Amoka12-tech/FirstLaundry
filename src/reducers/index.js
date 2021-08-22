import { combineReducers } from 'redux';
import auth from './auth';
import location from './location';
import payment from './payment';
import orders from './order';
import notifications from './notifications';
import info from './info';
import itemList from './itemList';

export default combineReducers({
    auth,
    location,
    payment,
    orders,
    notifications,
    info,
    itemList
});