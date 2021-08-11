import { PAYMENT_NOT_SUCCESSFUL, PAYMENT_SUCCESSFUL, RESET_PAYMENT } from "../reducers/types";

export const successPayment = (data) => dispatch => {
    dispatch({type: PAYMENT_SUCCESSFUL, payload: data});
};

export const notSuccessPayment = (data) => dispatch => {
    dispatch({type: PAYMENT_NOT_SUCCESSFUL, payload: data});
};

export const resetPayment = () => dispatch => {
    dispatch({type: RESET_PAYMENT});
};