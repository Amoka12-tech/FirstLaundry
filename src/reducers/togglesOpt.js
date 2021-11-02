import { UPDATE_OPTION } from "./types";

const initialState = {
    showFabOption: false,
};
export default function(togglesOpt = initialState, action){
    const { type, payload } = action;
    switch (type) {
        case UPDATE_OPTION:
            return {
                ...initialState,
                showFabOption : payload
            };
    
        default:
            return {...initialState};
    }
};