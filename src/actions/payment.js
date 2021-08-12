import { BANK_PAYMENT, PAYMENT_NOT_SUCCESSFUL, PAYMENT_SUCCESSFUL, RESET_PAYMENT } from "../reducers/types";

export const successPayment = (data) => dispatch => {
    dispatch({type: PAYMENT_SUCCESSFUL, payload: data});
};

export const notSuccessPayment = (data) => dispatch => {
    dispatch({type: PAYMENT_NOT_SUCCESSFUL, payload: data});
};
export const optBankPayment = () => dispatch => {
    dispatch({type: BANK_PAYMENT});
};

export const resetPayment = () => dispatch => {
    dispatch({type: RESET_PAYMENT});
};