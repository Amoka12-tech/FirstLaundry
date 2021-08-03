import { END_PROCESS, SIGN_IN, SIGN_OUT, SIGN_UP, START_PROCESS, UPDATE_USER } from "./types";

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

        case UPDATE_USER:
            return {
                ...auth,
                user: payload
            };

        case START_PROCESS:
            return {
                ...auth,
                isLoading: true
            };

        case END_PROCESS:
            return {
                ...auth,
                isLoading: false
            };
    
        default:
            return {...auth}
    }
};