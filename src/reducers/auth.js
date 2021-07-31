import { SIGN_IN, SIGN_OUT, SIGN_UP } from "./types";

const initialState = {
    user: null,
    isLoading: false,
    isLoggedIn: false,
};
export default function(auth = initialState, action){
    const { type, payload } = action;
    
    switch (type) {
        case SIGN_UP:
            return {
                ...auth,
                user: payload   
            };

        case SIGN_IN:
            return {
                ...auth,
                user: payload,
                isLoggedIn: true
            };
        
        case SIGN_OUT:
            return {
                ...auth,
                user: null,
                isLoggedIn: false
            };
    
        default:
            return {...auth}
    }
};