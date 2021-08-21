import * as api from '../apis/order';
import { ADD_ORDER, CANCEL_ORDER, END_PROCESS, GET_ALL_ORDER, GET_ORDER, RESET_LOCATION, RESET_PAYMENT, START_PROCESS } from "../reducers/types";

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
        dispatch({type: START_PROCESS});
        const { data } = await api.getAllOrder(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: END_PROCESS});
            dispatch({type: GET_ALL_ORDER, payload: message});
        }else{
            throw(message);
        }
    } catch (error) {
        alert(error);
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

export const cancelOrder = (id, orderId) => async dispatch => {
    const body = {
        userId: id,
        orderId: orderId
    };
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.cancelOrder(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: CANCEL_ORDER, payload: message});
            dispatch({type: END_PROCESS});
            alert('This order is now canceled')
        }else{
            throw(message);
        }
    } catch (error) {
        dispatch({type: END_PROCESS});
        alert(error);
    }
};

export const getDiscount = async (userId) => {
    try {
        const body = {
            userId: userId
        };
        const { data } = await api.getDiscount(body, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        return message;
    } catch (error) {
        return 0;
    }
};

export const getItems = async () => {
    try {
        const { data } = await api.getItemList();
        return data;
    } catch (error) {
        alert(error?.message);
        return null;
    }
};