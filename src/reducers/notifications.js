import { GET_NOTIFICATIONS } from "./types";

export default function(notifications = [], action){
    const {type, payload} = action;

    switch (type) {
        case GET_NOTIFICATIONS:
            return payload;
    
        default:
            return notifications;
    }
};