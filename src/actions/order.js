import * as api from '../apis/order';
import { END_PROCESS, START_PROCESS } from "../reducers/types";

let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

};

export const placeOrder = (body, navigation) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = api.placeOrder(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            console.log(message);
        }else{
            throw(message);
        }
    } catch (error) {
        dispatch({type: END_PROCESS});
        console.log(error);
    }
};