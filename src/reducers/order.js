import { ADD_ORDER, CANCEL_ORDER, GET_ALL_ORDER, GET_ORDER } from "./types";

export default function(orders = [], action){
    const {type, payload} = action;
    switch (type) {
        case GET_ALL_ORDER:
            return payload;

        case GET_ORDER:
        case CANCEL_ORDER:
            const oldOrder = orders.filter(item => item.orderId !== payload.orderId);
            oldOrder.unshift(payload);
            return oldOrder.sort((a, b) => a.orderDate - b.orderDate);

        case ADD_ORDER:
            return [...orders, payload].sort((a, b) => b.orderDate - a.orderDate);
    
        default:
            return orders;
    }
};