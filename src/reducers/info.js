import { GET_APP_INFO } from "./types";

export default function(info = null, action){
    const {type, payload} = action;

    switch (type) {
        case GET_APP_INFO:
            return payload;
    
        default:
            return info;
    }
};