import * as api from '../apis/order';
import { ADD_ORDER, END_PROCESS, GET_ALL_ORDER, GET_ORDER, RESET_LOCATION, RESET_PAYMENT, START_PROCESS } from "../reducers/types";

let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

};

export const placeOrder = (body, navigation) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.placeOrder(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: ADD_ORDER, payload: message});
            dispatch({type: RESET_PAYMENT});
            dispatch({type: RESET_LOCATION});
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        }else{
            throw(message);
        }
    } catch (error) {
        dispatch({type: END_PROCESS});
        console.log(error);
    }
};

export const getAllOrder = (id) => async dispatch => {
    const body = {
        userId: id
    };
    try {
        const { data } = await api.getAllOrder(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: GET_ALL_ORDER, payload: message});
        }else{
            throw(message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = (id, orderId) => async dispatch => {
    const body = {
        userId: id,
        orderId: orderId
    };
    try {
        const { data } = await api.getOrder(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: GET_ORDER, payload: message});
        }else{
            throw(message);
        }
    } catch (error) {
        alert(error);
    }
};

export const cancelOrder = (id) => async dispatch => {
    const body = {
        userId: id,
        orderId: orderId
    };
    try {
        const { data } = await api.cancelOrder(body, headers);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}