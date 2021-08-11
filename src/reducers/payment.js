import { PAYMENT_NOT_SUCCESSFUL, PAYMENT_SUCCESSFUL, RESET_PAYMENT } from "./types";

let initialState = {
    paymentStatus: false,
    paymentData: null
};
export default function(payment = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case PAYMENT_SUCCESSFUL:
            return{
                ...payment,
                paymentStatus: true,
                paymentData: payload
            };

        case PAYMENT_NOT_SUCCESSFUL:
            return{
                ...payment,
                paymentStatus: false,
                paymentData: payload
            };

        case RESET_PAYMENT:
            return{
                ...payment,
                paymentStatus: false,
                paymentData: null
            };
    
        default:
            return {...payment};
    }
};