import * as api from '../apis/info';
import { END_PROCESS, GET_APP_INFO, START_PROCESS } from '../reducers/types';

export const getAppInfo = () => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.getAppInfo();
        dispatch({type: GET_APP_INFO, payload: data});
        dispatch({type: END_PROCESS});
        if(data.update === true){
            alert('Update is available and is important you get it');
        };
        if(data.forceUpdate === true){
            alert('We will redirect you to play store or app store');
        };
    } catch (error) {
        dispatch({type: END_PROCESS});
        alert('Failed to fetch app informations.');
    }
};