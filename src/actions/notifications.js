import * as api from '../apis/notifications';
import { END_PROCESS, GET_NOTIFICATIONS, START_PROCESS } from '../reducers/types';

let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

};

export const getNotificationsList = (userId) => async dispatch => {
    const body = {
        userId: userId
    }
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.getNotificationList(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: GET_NOTIFICATIONS, payload: message});
            dispatch({type: END_PROCESS});
        }else{
            throw (message);
        }
    } catch (error) {
        dispatch({type: END_PROCESS});
    }
};