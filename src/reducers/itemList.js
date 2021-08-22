import { GET_ITEM_LIST } from "./types";

export default function(itemList = [], action){
    const {type, payload} = action;

    switch (type) {
        case GET_ITEM_LIST:
            return payload;
    
        default:
            return itemList;
    }
};